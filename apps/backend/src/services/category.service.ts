import { prisma } from '../config/database';
import { cache, CACHE_KEYS, CACHE_TTL } from '../config/cache';
import { logger } from '../config/logger';
import { slugify } from '../utils/helpers';
import type { CreateCategoryInput, UpdateCategoryInput } from '../validators/category.validator';

// Type for category with id
interface CategoryWithId {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    products: number;
  };
  children?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export class CategoryService {
  /**
   * Get all categories
   */
  async getCategories() {
    const cacheKey = CACHE_KEYS.CATEGORIES;
    const cached = cache.get(cacheKey);

    if (cached) {
      logger.debug('Categories cache hit');
      return cached;
    }

    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    cache.set(cacheKey, categories, CACHE_TTL.LONG);

    return categories;
  }

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug: string): Promise<CategoryWithId> {
    const cacheKey = CACHE_KEYS.CATEGORY(slug);
    const cached = cache.get<CategoryWithId>(cacheKey);

    if (cached) {
      logger.debug(`Category cache hit: ${slug}`);
      return cached;
    }

    const category = await prisma.category.findUnique({
      where: { slug, isActive: true },
      include: {
        _count: {
          select: { products: true },
        },
        children: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    cache.set(cacheKey, category, CACHE_TTL.LONG);

    return category;
  }

  /**
   * Get category products
   */
  async getCategoryProducts(slug: string, page: number = 1, limit: number = 12) {
    const category = await this.getCategoryBySlug(slug);

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: { categoryId: category.id, isActive: true },
        include: {
          images: {
            take: 1,
            orderBy: { order: 'asc' },
          },
          variants: {
            select: {
              id: true,
              size: true,
              colorName: true,
              colorHex: true,
              stock: true,
            },
          },
        },
        orderBy: [{ isBestSeller: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      prisma.product.count({ where: { categoryId: category.id, isActive: true } }),
    ]);

    return {
      category,
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Create category (admin only)
   */
  async createCategory(data: CreateCategoryInput) {
    const slug = data.slug || slugify(data.name);

    // Check if slug already exists
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      throw new Error('Slug já existe');
    }

    // Check if parent exists
    if (data.parentId) {
      const parent = await prisma.category.findUnique({ where: { id: data.parentId } });
      if (!parent) {
        throw new Error('Categoria pai não encontrada');
      }
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        image: data.image,
        parentId: data.parentId,
        isActive: data.isActive ?? true,
      },
    });

    // Clear cache
    cache.del(CACHE_KEYS.CATEGORIES);

    logger.info(`Category created: ${category.slug}`);

    return category;
  }

  /**
   * Update category (admin only)
   */
  async updateCategory(id: string, data: UpdateCategoryInput) {
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    const slug = data.slug || (data.name ? slugify(data.name) : undefined);

    // Check if new slug already exists
    if (slug && slug !== category.slug) {
      const existing = await prisma.category.findUnique({ where: { slug } });
      if (existing) {
        throw new Error('Slug já existe');
      }
    }

    // Check if parent exists
    if (data.parentId) {
      const parent = await prisma.category.findUnique({ where: { id: data.parentId } });
      if (!parent) {
        throw new Error('Categoria pai não encontrada');
      }

      // Prevent circular reference
      if (data.parentId === id) {
        throw new Error('Uma categoria não pode ser pai de si mesma');
      }
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug,
        description: data.description,
        image: data.image,
        parentId: data.parentId,
        isActive: data.isActive,
      },
    });

    // Clear cache
    cache.del(CACHE_KEYS.CATEGORIES);
    cache.del(CACHE_KEYS.CATEGORY(category.slug));

    logger.info(`Category updated: ${updated.slug}`);

    return updated;
  }

  /**
   * Delete category (admin only)
   */
  async deleteCategory(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true, children: true },
        },
      },
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    if (category._count.products > 0) {
      throw new Error('Não é possível deletar uma categoria com produtos');
    }

    if (category._count.children > 0) {
      throw new Error('Não é possível deletar uma categoria com subcategorias');
    }

    await prisma.category.delete({ where: { id } });

    // Clear cache
    cache.del(CACHE_KEYS.CATEGORIES);
    cache.del(CACHE_KEYS.CATEGORY(category.slug));

    logger.info(`Category deleted: ${category.slug}`);

    return { message: 'Categoria deletada com sucesso' };
  }
}

export const categoryService = new CategoryService();
