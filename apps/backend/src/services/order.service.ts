import { prisma } from '@/config/database';
import { logger } from '@/config/logger';
import { generateOrderNumber, calculatePagination, createPaginatedResponse } from '@/utils/helpers';
import type { CreateOrderInput } from '@/validators/cart.validator';

export class OrderService {
  /**
   * Create order from cart
   */
  async createOrder(userId: string, data: CreateOrderInput) {
    // Get user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error('Carrinho vazio');
    }

    // Verify address belongs to user
    const address = await prisma.address.findFirst({
      where: {
        id: data.shippingAddressId,
        userId,
      },
    });

    if (!address) {
      throw new Error('Endereço não encontrado');
    }

    // Verify stock availability
    for (const item of cart.items) {
      if (item.variant.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para ${item.variant.product.name}`);
      }
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => {
      return sum + Number(item.variant.product.price) * item.quantity;
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

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        orderNumber: generateOrderNumber(),
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethod: data.paymentMethod,
        subtotal,
        discount,
        shipping,
        total,
        couponId,
        shippingAddressId: data.shippingAddressId,
        items: {
          create: cart.items.map((item) => ({
            productId: item.variant.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: Number(item.variant.product.price),
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

    // Update coupon usage
    if (couponId) {
      await prisma.coupon.update({
        where: { id: couponId },
        data: { usageCount: { increment: 1 } },
      });
    }

    // Decrease stock
    for (const item of cart.items) {
      await prisma.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

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
