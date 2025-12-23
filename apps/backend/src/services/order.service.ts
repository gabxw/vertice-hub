import { prisma } from '../config/database';
import { logger } from '../config/logger';
import { generateOrderNumber, calculatePagination, createPaginatedResponse } from '../utils/helpers';
import type { CreateOrderInput } from '../validators/cart.validator';

// Helper function to check if a string is a valid UUID
function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export class OrderService {
  /**
   * Create order from items
   */
  async createOrder(userId: string, data: CreateOrderInput, userEmail?: string, userName?: string) {
    console.log('[ORDER SERVICE] Creating order for user:', userId);
    console.log('[ORDER SERVICE] Data:', JSON.stringify(data, null, 2));

    // Ensure user exists in database (sync with Supabase Auth)
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.log('[ORDER SERVICE] User not found in database, creating from Supabase Auth data');
      // Create user from Supabase Auth data
      user = await prisma.user.create({
        data: {
          id: userId,
          email: userEmail || `user-${userId}@temp.com`,
          name: userName || data.shippingAddress.name || 'Usuário',
          password: '', // No password needed for Supabase Auth users
        },
      });
      console.log('[ORDER SERVICE] User created:', user.id);
    }

    // Validate items
    if (!data.items || data.items.length === 0) {
      throw new Error('Nenhum item no pedido');
    }

    // Verify stock availability and get product details
    const itemsWithDetails = await Promise.all(
      data.items.map(async (item) => {
        let variant;
        let productId = item.productId;
        let product = null;

        console.log('[ORDER SERVICE] Processing item:', JSON.stringify(item));

        // PRIORITY 1: Always try to find product by slug first (most reliable)
        if (item.productSlug) {
          product = await prisma.product.findUnique({
            where: { slug: item.productSlug },
          });
          if (product) {
            productId = product.id;
            console.log('[ORDER SERVICE] Found product by slug:', product.name, '- ID:', productId);
          }
        }

        // PRIORITY 2: If productId looks like a valid UUID, try to find product by ID
        if (!product && productId && isValidUUID(productId)) {
          product = await prisma.product.findUnique({
            where: { id: productId },
          });
          if (product) {
            console.log('[ORDER SERVICE] Found product by ID:', product.name);
          }
        }

        // PRIORITY 3: If still no product, try to find by name similarity
        if (!product && item.productSlug) {
          const searchTerm = item.productSlug.replace(/-/g, ' ');
          product = await prisma.product.findFirst({
            where: {
              OR: [
                { name: { contains: searchTerm, mode: 'insensitive' } },
                { slug: { contains: item.productSlug, mode: 'insensitive' } },
              ],
            },
          });
          if (product) {
            productId = product.id;
            console.log('[ORDER SERVICE] Found product by name search:', product.name, '- ID:', productId);
          }
        }

        if (!product) {
          console.error('[ORDER SERVICE] Product not found for item:', JSON.stringify(item));
          throw new Error(`Produto não encontrado: ${item.productSlug || item.productId}`);
        }

        // Now find the variant
        // Strategy 1: Try to find by variantId if provided and looks like UUID
        if (item.variantId && isValidUUID(item.variantId)) {
          variant = await prisma.productVariant.findUnique({
            where: { id: item.variantId },
            include: { product: true },
          });
          if (variant) {
            console.log('[ORDER SERVICE] Found variant by ID:', variant.id);
          }
        }

        // Strategy 2: Find by productId + size + color
        if (!variant && productId && item.size && item.color) {
          variant = await prisma.productVariant.findFirst({
            where: {
              productId: productId,
              size: item.size,
              colorName: item.color,
            },
            include: { product: true },
          });
          if (variant) {
            console.log('[ORDER SERVICE] Found variant by productId+size+color:', variant.id);
          }
        }

        // Strategy 3: Find by productId + size only (color might have different format)
        if (!variant && productId && item.size) {
          variant = await prisma.productVariant.findFirst({
            where: {
              productId: productId,
              size: item.size,
            },
            include: { product: true },
          });
          if (variant) {
            console.log('[ORDER SERVICE] Found variant by productId+size:', variant.id);
          }
        }

        // Strategy 4: Find any variant for the product with enough stock (fallback)
        if (!variant && productId) {
          variant = await prisma.productVariant.findFirst({
            where: {
              productId: productId,
              stock: { gte: item.quantity },
            },
            include: { product: true },
          });
          if (variant) {
            console.log('[ORDER SERVICE] Found variant by productId (fallback):', variant.id);
          }
        }

        // Strategy 5: Find any variant for the product (even with low stock)
        if (!variant && productId) {
          variant = await prisma.productVariant.findFirst({
            where: {
              productId: productId,
            },
            include: { product: true },
          });
          if (variant) {
            console.log('[ORDER SERVICE] Found variant by productId (any variant):', variant.id);
          }
        }

        if (!variant) {
          console.error('[ORDER SERVICE] Variant not found for item:', JSON.stringify(item));
          console.error('[ORDER SERVICE] Product ID used:', productId);
          throw new Error(`Variante não encontrada para produto ${product.name} (size: ${item.size}, color: ${item.color})`);
        }

        if (variant.stock < item.quantity) {
          throw new Error(`Estoque insuficiente para ${variant.product.name}`);
        }

        return {
          ...item,
          variant,
        };
      })
    );

    // Calculate totals
    const subtotal = itemsWithDetails.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    let discount = 0;
    let couponId = null;

    // Apply coupon if provided
    if (data.couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: data.couponCode },
      });

      if (coupon && coupon.isActive && coupon.validFrom <= new Date() && coupon.validUntil >= new Date()) {
        if (coupon.minPurchase && subtotal < Number(coupon.minPurchase)) {
          throw new Error(`Valor mínimo de compra: R$ ${coupon.minPurchase}`);
        }

        if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
          throw new Error('Cupom esgotado');
        }

        if (coupon.type === 'PERCENTAGE') {
          discount = (subtotal * Number(coupon.value)) / 100;
          if (coupon.maxDiscount && discount > Number(coupon.maxDiscount)) {
            discount = Number(coupon.maxDiscount);
          }
        } else {
          discount = Number(coupon.value);
        }

        couponId = coupon.id;
      }
    }

    const shipping = 0; // TODO: Calculate shipping
    const total = subtotal - discount + shipping;

    // Create shipping address
    const shippingAddress = await prisma.address.create({
      data: {
        userId,
        ...data.shippingAddress,
        isDefault: false,
      },
    });

    console.log('[ORDER SERVICE] Shipping address created:', shippingAddress.id);

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        orderNumber: generateOrderNumber(),
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethod: 'PAYPAL', // Default to PayPal for now
        subtotal,
        discount,
        shipping,
        total,
        couponId,
        shippingAddressId: shippingAddress.id,
        items: {
          create: itemsWithDetails.map((item) => ({
            productId: item.variant.productId,
            variantId: item.variant.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        statusHistory: {
          create: {
            status: 'PENDING',
            notes: 'Pedido criado',
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
      },
    });

    console.log('[ORDER SERVICE] Order created:', order.orderNumber);

    // Create payment record for PayPal
    await prisma.payment.create({
      data: {
        orderId: order.id,
        provider: 'PAYPAL',
        status: 'PENDING',
        amount: total,
        paymentMethod: 'PAYPAL',
      },
    });

    console.log('[ORDER SERVICE] Payment record created for order:', order.orderNumber);

    // Update coupon usage
    if (couponId) {
      await prisma.coupon.update({
        where: { id: couponId },
        data: { usageCount: { increment: 1 } },
      });
    }

    // Decrease stock
    for (const item of itemsWithDetails) {
      await prisma.productVariant.update({
        where: { id: item.variant.id },
        data: { stock: { decrement: item.quantity } },
      });
    }

    logger.info(`Order created: ${order.orderNumber}`);

    return order;
  }

  /**
   * Get order by ID
   */
  async getOrder(orderId: string, userId: string) {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                  orderBy: { order: 'asc' },
                },
              },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        payment: true,
        statusHistory: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    return order;
  }

  /**
   * Get order by order number
   */
  async getOrderByNumber(orderNumber: string) {
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                  orderBy: { order: 'asc' },
                },
              },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        payment: true,
        statusHistory: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    return order;
  }

  /**
   * Update order status (admin)
   */
  async updateOrderStatus(orderId: string, status: string, notes?: string) {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: status as any,
        statusHistory: {
          create: {
            status: status as any,
            notes,
          },
        },
      },
      include: {
        items: true,
        shippingAddress: true,
      },
    });

    logger.info(`Order status updated: ${order.orderNumber} -> ${status}`);

    return order;
  }

  /**
   * Add tracking code (admin)
   */
  async addTrackingCode(orderId: string, trackingCode: string) {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        trackingCode,
        status: 'SHIPPED',
        statusHistory: {
          create: {
            status: 'SHIPPED',
            notes: `Código de rastreio: ${trackingCode}`,
          },
        },
      },
    });

    logger.info(`Tracking code added to order: ${order.orderNumber}`);

    return order;
  }

  /**
   * Get all orders (admin)
   */
  async getAllOrders(page: number = 1, limit: number = 20, filters?: any) {
    const pagination = calculatePagination(page, limit);

    const where: any = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.paymentStatus) where.paymentStatus = filters.paymentStatus;
    if (filters?.userId) where.userId = filters.userId;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: pagination.skip,
        take: pagination.limit,
      }),
      prisma.order.count({ where }),
    ]);

    return createPaginatedResponse(orders, total, pagination.page, pagination.limit);
  }
}

export const orderService = new OrderService();
