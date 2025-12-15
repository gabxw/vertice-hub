export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category_id: string;
          price: number;
          original_price: number | null;
          description: string;
          story: string;
          stock: number;
          rating: number;
          reviews_count: number;
          is_new: boolean;
          is_best_seller: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          category_id: string;
          price: number;
          original_price?: number | null;
          description: string;
          story: string;
          stock?: number;
          rating?: number;
          reviews_count?: number;
          is_new?: boolean;
          is_best_seller?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          category_id?: string;
          price?: number;
          original_price?: number | null;
          description?: string;
          story?: string;
          stock?: number;
          rating?: number;
          reviews_count?: number;
          is_new?: boolean;
          is_best_seller?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          url: string;
          order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          url?: string;
          order?: number;
          created_at?: string;
        };
      };
      product_colors: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          hex: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          hex: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          name?: string;
          hex?: string;
          created_at?: string;
        };
      };
      product_sizes: {
        Row: {
          id: string;
          product_id: string;
          size: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          size: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          size?: string;
          created_at?: string;
        };
      };
      product_benefits: {
        Row: {
          id: string;
          product_id: string;
          benefit: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          benefit: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          benefit?: string;
          created_at?: string;
        };
      };
      product_tags: {
        Row: {
          id: string;
          product_id: string;
          tag: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          tag: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          tag?: string;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          rating: number;
          content: string;
          verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id: string;
          rating: number;
          content: string;
          verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          user_id?: string;
          rating?: number;
          content?: string;
          verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          street: string;
          number: string;
          complement: string | null;
          neighborhood: string;
          city: string;
          state: string;
          zip_code: string;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          street: string;
          number: string;
          complement?: string | null;
          neighborhood: string;
          city: string;
          state: string;
          zip_code: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          street?: string;
          number?: string;
          complement?: string | null;
          neighborhood?: string;
          city?: string;
          state?: string;
          zip_code?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      carts: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_id: string;
          quantity: number;
          size: string;
          color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          cart_id: string;
          product_id: string;
          quantity?: number;
          size: string;
          color: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          cart_id?: string;
          product_id?: string;
          quantity?: number;
          size?: string;
          color?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          address_id: string;
          total: number;
          discount: number;
          shipping: number;
          status: string;
          payment_method: string;
          payment_status: string;
          tracking_code: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          address_id: string;
          total: number;
          discount?: number;
          shipping?: number;
          status?: string;
          payment_method: string;
          payment_status?: string;
          tracking_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          address_id?: string;
          total?: number;
          discount?: number;
          shipping?: number;
          status?: string;
          payment_method?: string;
          payment_status?: string;
          tracking_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          size: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          size: string;
          color: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
          size?: string;
          color?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
