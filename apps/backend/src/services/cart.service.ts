import { prisma } from '../config/database';
import { logger } from '../config/logger';
import type { AddToCartInput, UpdateCartItemInput } from '../validators/cart.validator';

export class CartService {
  /**
   * Get or create cart for user
   */
  async getOrCreateCart(userId: string) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    images: {
                      take: 1,
                      orderBy: { order: 'asc' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: {
                    include: {
                      images: {
                        take: 1,
                        orderBy: { order: 'asc' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    }

    return cart;
  }

  /**
   * Add item to cart
   */
  async addItem(userId: string, data: AddToCartInput) {
    const cart = await this.getOrCreateCart(userId);

    // Check if variant exists and has stock
    const variant = await prisma.productVariant.findUnique({
      where: { id: data.variantId },
      include: { product: true },
    });

    if (!variant) {
      throw new Error('Variante não encontrada');
    }

    if (!variant.product.isActive) {
      throw new Error('Produto não está disponível');
    }

    if (variant.stock < data.quantity) {
      throw new Error('Estoque insuficiente');
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        variantId: data.variantId,
      },
    });

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + data.quantity;

      if (variant.stock < newQuantity) {
        throw new Error('Estoque insuficiente');
      }

      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      // Create new item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: variant.productId,
          variantId: data.variantId,
          quantity: data.quantity,
        },
      });
    }

    logger.info(`Item added to cart for user: ${userId}`);

    return this.getOrCreateCart(userId);
  }

  /**
   * Update cart item quantity
   */
  async updateItem(userId: string, itemId: string, data: UpdateCartItemInput) {
    const cart = await this.getOrCreateCart(userId);

    const item = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cartId: cart.id,
      },
      include: { variant: true },
    });

    if (!item) {
      throw new Error('Item não encontrado no carrinho');
    }

    if (data.quantity === 0) {
      await prisma.cartItem.delete({ where: { id: itemId } });
    } else {
      if (item.variant.stock < data.quantity) {
        throw new Error('Estoque insuficiente');
      }

      await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity: data.quantity },
      });
    }

    logger.info(`Cart item updated for user: ${userId}`);

    return this.getOrCreateCart(userId);
  }

  /**
   * Remove item from cart
   */
  async removeItem(userId: string, itemId: string) {
    const cart = await this.getOrCreateCart(userId);

    const item = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cartId: cart.id,
      },
    });

    if (!item) {
      throw new Error('Item não encontrado no carrinho');
    }

    await prisma.cartItem.delete({ where: { id: itemId } });

    logger.info(`Item removed from cart for user: ${userId}`);

    return this.getOrCreateCart(userId);
  }

  /**
   * Clear cart
   */
  async clearCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    logger.info(`Cart cleared for user: ${userId}`);

    return this.getOrCreateCart(userId);
  }

  /**
   * Get cart summary
   */
  async getCartSummary(userId: string) {
    const cart = await this.getOrCreateCart(userId);

    const subtotal = cart.items.reduce((sum, item) => {
      const price = Number(item.variant.product.price);
      return sum + price * item.quantity;
    }, 0);

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      cart,
      summary: {
        subtotal,
        totalItems,
        shipping: 0, // Calculate based on address
        discount: 0, // Calculate based on coupon
        total: subtotal,
      },
    };
  }
}

export const cartService = new CartService();
