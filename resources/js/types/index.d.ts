import type { Config } from 'ziggy-js';

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
  flash: {
    success?: string;
    error?: string;
  };
  cart?: CartItem[];
  menus?: MenuItem[];
  ziggy: Config & { location: string };
};

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

export interface ProductType {
  id: number;
  category_id?: number;
  description?: string;
  stock?: number;
  title: string;
  price: number;
  platforms?: string[];
  release_date?: string;
  is_pre_order?: boolean;
  media?: any;
  specs?: { label: string; value: string }[];
  image?: string[];
  rating: number;
  category?: CategoryType;
  reviews?: ReviewType[];
}

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
}

export interface FiltersType {
  category: string | null;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface MenuItemType {
  id: number;
  title: string;
  route?: string;
  url?: string;
  children?: MenuItemType[];
}

type ReviewType = {
  id: number;
  user_id: number;
  product_id: number;
  content: number;
  rating: number;
  is_approved: boolean;
  comment: string;
  created_at: string;
  updated_at: string;
  user: UserType;
  replies: ReviewReplyType[];
};

type ReviewReplyType = {
  id: number;
  review_id: number;
  user_id: number;
  content: string;
  is_approved: boolean;
  user: UserType;
};
