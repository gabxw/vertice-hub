import { useQuery } from '@tanstack/react-query';
import { productsApi, ProductsFilters } from '@/api/products';

export const useProducts = (filters?: ProductsFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsApi.list(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productsApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productsApi.getFeatured(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const useNewProducts = () => {
  return useQuery({
    queryKey: ['products', 'new'],
    queryFn: () => productsApi.getNew(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useProductReviews = (productId: string, page = 1) => {
  return useQuery({
    queryKey: ['reviews', productId, page],
    queryFn: () => productsApi.getReviews(productId, page),
    enabled: !!productId,
  });
};
