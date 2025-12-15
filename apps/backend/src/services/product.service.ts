import { prisma } from '@/config/database';
import { cache, CACHE_KEYS, CACHE_TTL } from '@/config/cache';
import { logger } from '@/config/logger';
import { slugify, calculatePagination, createPaginatedResponse } from '@/utils/helpers';
import type { CreateProductInput, UpdateProductInput, ProductQueryInput, CreateReviewInput } from '@/validators/product.validator';

export class ProductService {
  /**
   * Get all products with filters and pagination
   */
  async getProducts(filters: ProductQueryInput) {
    const { page = '1', limit = '12', categoryId, minPrice, maxPrice, isNew, isBestSeller, search, tags } = filters;

    const pagination = calculatePagination(parseInt(page), parseInt(limit));

    // Build where clause
    const where: any = { isActive: true };

    if (categoryId) where.categoryId = categoryId;
    if (isNew === 'true') where.isNew = true;
    if (isBestSeller === 'true') where.isBestSeller = true;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (tags) {
      const tagArray = tags.split(',');
      where.tags = {
        some: {
          name: { in: tagArray },
        },
      };
    }

    // Get products
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
          images: {
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
          tags: {
            select: { name: true },
          },
        },
        orderBy: [{ isBestSeller: 'desc' }, { createdAt: 'desc' }],
        skip: pagination.skip,
        take: pagination.limit,
      }),
      prisma.product.count({ where }),
    ]);

    return createPaginatedResponse(products, total, pagination.page, pagination.limit);
  }

  /**
   * Get product by slug
   */
  async getProductBySlug(slug: string) {
    const cacheKey = CACHE_KEYS.PRODUCT(slug);
    const cached = cache.get(cacheKey);

    if (cached) {
      logger.debug(`Product cache hit: ${slug}`);
      return cached;
    }

    const product = await prisma.product.findUnique({
      where: { slug, isActive: true },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
        images: {
          orderBy: { order: 'asc' },
        },
        variants: {
          select: {
            id: true,
            size: true,
            colorName: true,
            colorHex: true,
            sku: true,
            stock: true,
          },
        },
        benefits: {
          orderBy: { order: 'asc' },
          select: { text: true },
        },
        tags: {
          select: { name: true },
        },
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    cache.set(cacheKey, product, CACHE_TTL.MEDIUM);

    return product;
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 8) {
    const cacheKey = CACHE_KEYS.FEATURED_PRODUCTS;
    const cached = cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    const products = await prisma.product.findMany({
      where: { isActive: true, isBestSeller: true },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
        images: {
          take: 1,
          orderBy: { order: 'asc' },
        },
      },
      take: limit,
      orderBy: { rating: 'desc' },
    });

    cache.set(cacheKey, products, CACHE_TTL.MEDIUM);

    return products;
  }

  /**
   * Get new products
   */
  async getNewProducts(limit: number = 8) {
    const cacheKey = CACHE_KEYS.NEW_PRODUCTS;
    const cached = cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    const products = await prisma.product.findMany({
      where: { isActive: true, isNew: true },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
        images: {
          take: 1,
          orderBy: { order: 'asc' },
        },
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    cache.set(cacheKey, products, CACHE_TTL.MEDIUM);

    return products;
  }

  /**
   * Create product (admin only)
   */
  async createProduct(data: CreateProductInput) {
    const slug = data.slug || slugify(data.name);

    // Check if slug already exists
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      throw new Error('Slug já existe');
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        story: data.story,
        price: data.price,
        originalPrice: data.originalPrice,
        categoryId: data.categoryId,
        supplierId: data.supplierId,
        isNew: data.isNew,
        isBestSeller: data.isBestSeller,
        isActive: data.isActive ?? true,
        images: {
          create: data.images.map((img, index) => ({
            url: img.url,
            alt: img.alt,
            order: img.order ?? index,
          })),
        },
        variants: {
          create: data.variants,
        },
        benefits: data.benefits
          ? {
              create: data.benefits.map((text, index) => ({
                text,
                order: index,
              })),
            }
          : undefined,
        tags: data.tags
          ? {
              create: data.tags.map((name) => ({ name })),
            }
          : undefined,
      },
      include: {
        images: true,
        variants: true,
        benefits: true,
        tags: true,
      },
    });

    // Clear cache
    cache.flushAll();

    logger.info(`Product created: ${product.slug}`);

    return product;
  }

  /**
   * Update product (admin only)
   */
  async updateProduct(id: string, data: UpdateProductInput) {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    const slug = data.slug || (data.name ? slugify(data.name) : undefined);

    // Check if new slug already exists
    if (slug && slug !== product.slug) {
      const existing = await prisma.product.findUnique({ where: { slug } });
      if (existing) {
        throw new Error('Slug já existe');
      }
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug,
        description: data.description,
        story: data.story,
        price: data.price,
        originalPrice: data.originalPrice,
        categoryId: data.categoryId,
        supplierId: data.supplierId,
        isNew: data.isNew,
        isBestSeller: data.isBestSeller,
        isActive: data.isActive,
      },
      include: {
        images: true,
        variants: true,
        benefits: true,
        tags: true,
      },
    });

    // Clear cache
    cache.del(CACHE_KEYS.PRODUCT(product.slug));
    cache.flushAll();

    logger.info(`Product updated: ${updated.slug}`);

    return updated;
  }

  /**
   * Delete product (admin only)
   */
  async deleteProduct(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    await prisma.product.delete({ where: { id } });

    // Clear cache
    cache.del(CACHE_KEYS.PRODUCT(product.slug));
    cache.flushAll();

    logger.info(`Product deleted: ${product.slug}`);

    return { message: 'Produto deletado com sucesso' };
  }

  /**
   * Get product reviews
   */
  async getProductReviews(productId: string, page: number = 1, limit: number = 10) {
    const pagination = calculatePagination(page, limit);

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { productId, isApproved: true },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: pagination.skip,
        take: pagination.limit,
      }),
      prisma.review.count({ where: { productId, isApproved: true } }),
    ]);

    return createPaginatedResponse(reviews, total, pagination.page, pagination.limit);
  }

  /**
   * Create product review
   */
  async createReview(productId: string, userId: string, data: CreateReviewInput) {
    // Check if product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    // Check if user already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: { productId, userId },
    });

    if (existingReview) {
      throw new Error('Você já avaliou este produto');
    }

    // Check if user purchased this product
    const hasPurchased = await prisma.order.findFirst({
      where: {
        userId,
        status: 'DELIVERED',
        items: {
          some: { productId },
        },
      },
    });

    const review = await prisma.review.create({
      data: {
        productId,
        userId,
        rating: data.rating,
        content: data.content,
        verified: !!hasPurchased,
        isApproved: false, // Requires admin approval
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Update product rating
    await this.updateProductRating(productId);

    logger.info(`Review created for product: ${productId}`);

    return review;
  }

  /**
   * Update product rating
   */
  private async updateProductRating(productId: string) {
    const reviews = await prisma.review.findMany({
      where: { productId, isApproved: true },
      select: { rating: true },
    });

    if (reviews.length === 0) return;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: averageRating,
        reviewCount: reviews.length,
      },
    });
  }
}

export const productService = new ProductService();
