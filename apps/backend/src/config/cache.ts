import NodeCache from 'node-cache';

/**
 * Cache configuration
 * - stdTTL: default time to live in seconds (5 minutes)
 * - checkperiod: period in seconds to check for expired keys (1 minute)
 * - useClones: clone variables before returning them
 */
export const cache = new NodeCache({
  stdTTL: 300, // 5 minutes
  checkperiod: 60, // 1 minute
  useClones: false,
});

/**
 * Cache keys
 */
export const CACHE_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: (slug: string) => `product:${slug}`,
  CATEGORIES: 'categories',
  CATEGORY: (slug: string) => `category:${slug}`,
  FEATURED_PRODUCTS: 'featured_products',
  NEW_PRODUCTS: 'new_products',
  BESTSELLER_PRODUCTS: 'bestseller_products',
};

/**
 * Cache TTL values (in seconds)
 */
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
};

export default cache;
