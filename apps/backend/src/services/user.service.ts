import { prisma } from '../config/database';
import { logger } from '../config/logger';
import type { UpdateProfileInput, CreateAddressInput, UpdateAddressInput } from '../validators/user.validator';

export class UserService {
  /**
   * Get user profile
   */
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        cpf: true,
        phone: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: UpdateProfileInput) {
    // Check if CPF is already in use
    if (data.cpf) {
      const existingCPF = await prisma.user.findFirst({
        where: {
          cpf: data.cpf,
          NOT: { id: userId },
        },
      });

      if (existingCPF) {
        throw new Error('CPF já cadastrado');
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        cpf: true,
        phone: true,
        role: true,
        updatedAt: true,
      },
    });

    logger.info(`User profile updated: ${user.email}`);

    return user;
  }

  /**
   * Get user orders
   */
  async getOrders(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
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
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get user addresses
   */
  async getAddresses(userId: string) {
    return prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  }

  /**
   * Create address
   */
  async createAddress(userId: string, data: CreateAddressInput) {
    // If this is the default address, unset other defaults
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    // If this is the first address, make it default
    const addressCount = await prisma.address.count({ where: { userId } });
    const isDefault = data.isDefault ?? addressCount === 0;

    const address = await prisma.address.create({
      data: {
        ...data,
        userId,
        isDefault,
      },
    });

    logger.info(`Address created for user: ${userId}`);

    return address;
  }

  /**
   * Update address
   */
  async updateAddress(userId: string, addressId: string, data: UpdateAddressInput) {
    // Check if address belongs to user
    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, userId },
    });

    if (!existingAddress) {
      throw new Error('Endereço não encontrado');
    }

    // If setting as default, unset other defaults
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId, NOT: { id: addressId } },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.update({
      where: { id: addressId },
      data,
    });

    logger.info(`Address updated: ${addressId}`);

    return address;
  }

  /**
   * Delete address
   */
  async deleteAddress(userId: string, addressId: string) {
    // Check if address belongs to user
    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, userId },
    });

    if (!existingAddress) {
      throw new Error('Endereço não encontrado');
    }

    await prisma.address.delete({
      where: { id: addressId },
    });

    // If deleted address was default, set another as default
    if (existingAddress.isDefault) {
      const firstAddress = await prisma.address.findFirst({
        where: { userId },
        orderBy: { createdAt: 'asc' },
      });

      if (firstAddress) {
        await prisma.address.update({
          where: { id: firstAddress.id },
          data: { isDefault: true },
        });
      }
    }

    logger.info(`Address deleted: ${addressId}`);

    return { message: 'Endereço deletado com sucesso' };
  }
}

export const userService = new UserService();
