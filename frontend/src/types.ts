export interface Category { slug: string; name: string; }
export interface ProductImage { url: string; alt: string; }

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceRwf: number;
  oldPriceRwf?: number | null;
  colors: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured: boolean;
  category?: Category;
  images: ProductImage[];
}

export interface Review { id: string; author: string; rating: number; comment: string; createdAt: string; }
export interface ProductDetail extends Product { reviews: Review[]; similar: Product[]; }
export interface ProductList { total: number; page: number; pageSize: number; items: Product[]; }
