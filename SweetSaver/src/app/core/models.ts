export interface AuthResponse {
  access: string;
  refresh: string;
  username?: string;
  message?: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Shop {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  image_url: string;
  products?: Product[];
}

export interface Product {
  id: number;
  shop: number;
  shop_name: string;
  category: number;
  category_name: string;
  title: string;
  description: string;
  price: number;
  old_price: number;
  stock: number;
  image_url: string;
  is_available: boolean;
  created_at: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Carts {
  id: number;
  items: CartItem[];
  total: number;
  image_url: string;
}

export interface PurchaseItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface Purchase {
  id: number;
  total: number;
  created_at: string;
  items: PurchaseItem[];
}

export interface Profile {
  username: string;
  email: string;
  full_name: string;
  phone: string;
  city: string;
  bio: string;
  avatar_url: string;
}
export interface AuthToken {
  access: string;
  refresh: string;
}