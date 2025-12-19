import { Request } from 'express';
import { User, Role } from '@prisma/client';
import { ParsedQs } from 'qs';

/**
 * Authenticated request with user information
 * Generic parameters: P = params, ResBody = response body, ReqBody = request body, ReqQuery = query
 */
export interface AuthRequest<
  P = Record<string, string>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * API Response
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * JWT Payload
 */
export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
}

/**
 * Product filter options
 */
export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  search?: string;
}

/**
 * Order filter options
 */
export interface OrderFilters {
  userId?: string;
  status?: string;
  paymentStatus?: string;
  startDate?: Date;
  endDate?: Date;
}

/**
 * Cart item data
 */
export interface CartItemData {
  productId: string;
  variantId: string;
  quantity: number;
}

/**
 * Order creation data
 */
export interface OrderCreationData {
  userId: string;
  items: {
    productId: string;
    variantId: string;
    quantity: number;
    price: number;
  }[];
  shippingAddressId: string;
  couponCode?: string;
  paymentMethod: string;
}

/**
 * Email template data
 */
export interface EmailData {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

/**
 * Dashboard metrics
 */
export interface DashboardMetrics {
  totalSales: number;
  totalOrders: number;
  averageTicket: number;
  totalCustomers: number;
  pendingOrders: number;
  lowStockProducts: number;
}

export type { User, Role };
