import type { PageProps } from '@/types';

export interface HomeProps extends PageProps {
  featuredProducts: ProductType[];
  categories: { id: number; name: string; slug: string }[];
  newReleases: ProductType[];
  topRated: ProductType[];
  userFavorites: number[];
  filters: FiltersType;
}

export interface ProductItemProps {
  product: ProductType;
  isFavorite: boolean;
}

export interface CategoriesProps {
  categories: CategoryType[];
  filters: FiltersType;
}

export interface CategoryItemProps {
  category: CategoryType;
  filters: FiltersType;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  category?: CategoryType;
}

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
}

export interface FiltersType {
  category: string | null;
}
