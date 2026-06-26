export interface Category {
  slug: string;
  name: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceRwf: number;
  stock: number;
  isFeatured: boolean;
  category?: Category;
  images: ProductImage[];
}

export interface ProductList {
  total: number;
  page: number;
  pageSize: number;
  items: Product[];
}
