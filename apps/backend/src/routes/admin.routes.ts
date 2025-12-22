import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { prisma } from '../config/database';
import { logger } from '../config/logger';

const router = Router();

// All admin routes require authentication and ADMIN role
router.use(authenticate, authorize('ADMIN'));

/**
 * @route   GET /api/v1/admin/stats
 * @desc    Get dashboard statistics
 * @access  Private (Admin only)
 */
router.get('/stats', async (req, res) => {
  try {
    const [
      totalProducts,
      totalOrders,
      pendingOrders,
      totalRevenue,
      totalUsers,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: 'APPROVED' },
      }),
      prisma.user.count(),
    ]);

    res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        pendingOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        totalUsers,
      },
    });
  } catch (error) {
    logger.error('Error fetching admin stats', { error });
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas',
    });
  }
});

/**
 * @route   GET /api/v1/admin/orders
 * @desc    Get all orders for admin
 * @access  Private (Admin only)
 */
router.get('/orders', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }

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
                  name: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    logger.error('Error fetching admin orders', { error });
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pedidos',
    });
  }
});

/**
 * @route   PUT /api/v1/admin/orders/:id/status
 * @desc    Update order status
 * @access  Private (Admin only)
 */
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, trackingCode, notes } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        trackingCode: trackingCode || undefined,
        statusHistory: {
          create: {
            status,
            notes,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // TODO: Send email notification to user about status change

    res.json({
      success: true,
      data: order,
      message: 'Status do pedido atualizado com sucesso',
    });
  } catch (error) {
    logger.error('Error updating order status', { error });
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar status do pedido',
    });
  }
});

/**
 * @route   GET /api/v1/admin/users
 * @desc    Get all users
 * @access  Private (Admin only)
 */
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { email: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          _count: {
            select: { orders: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    logger.error('Error fetching users', { error });
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar usuários',
    });
  }
});

/**
 * @route   PUT /api/v1/admin/users/:id/role
 * @desc    Update user role
 * @access  Private (Admin only)
 */
router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['CUSTOMER', 'ADMIN'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role inválido',
      });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    res.json({
      success: true,
      data: user,
      message: 'Role do usuário atualizado com sucesso',
    });
  } catch (error) {
    logger.error('Error updating user role', { error });
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar role do usuário',
    });
  }
});

export default router;
