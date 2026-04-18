export interface AuthResponse {
  access: string;
  refresh: string;
  username?: string;
  message?: string;
}

// independent
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
  pickup_start?: string;
  pickup_end?: string;
  created_at: string;
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

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  image_url: string;
}

export interface CartItem {
  id: number;
  product: CartProduct;
  quantity: number;
  subtotal: number;
}

export interface CartResponse {
  id: number;
  items: CartItem[];
  total: number;
}

export interface OrderItem {
  id: number;
  title: string;
  price: number | string;
  quantity: number;
  subtotal: number | string;
}

export interface Order {
  id: number;
  status: string;
  total: number | string;
  created_at: string;
  items: OrderItem[];
}

export interface OwnerDashboardStats {
  shops_count: number;
  products_count: number;
  available_products_count: number;
  orders_count: number;
}

export interface OwnerOrderItem {
  id: number;
  order_id: number;
  customer_username: string;
  shop_name: string;
  title: string;
  price: number | string;
  quantity: number;
  subtotal: number | string;
  order_status: string;
  created_at: string;
}

export interface BackendProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  profile_image?: string;
  full_name?: string;
  city?: string;
  bio?: string;
}

export interface OwnerShop {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  image_url: string;
}

export interface OwnerProduct {
  id: number;
  shop: number;
  shop_name: string;
  category: number;
  category_name: string;
  title: string;
  description: string;
  price: number | string;
  old_price: number | string;
  stock: number;
  image_url: string;
  is_available: boolean;
  pickup_start?: string;
  pickup_end?: string;
  created_at: string;
}

export interface OwnerOrderItem {
  id: number;
  title: string;
  price: number | string;
  quantity: number;
  subtotal: number | string;
  shop_name: string;
}

export interface OwnerOrder {
  id: number;
  status: string;
  total: number | string;
  created_at: string;
  items: OwnerOrderItem[];
}