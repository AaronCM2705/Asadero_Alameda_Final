export interface Category {
  id: string;
  name: string;
  sort_order: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  price: number;
  sort_order: number;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  description: string;
  image_url: string;
  base_price: number;
  is_available: boolean;
  has_variants: boolean;
  allergens: string[];
  variants?: ProductVariant[]; // Relacionado desde la base de datos
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  is_active: boolean;
}

export interface OrderItem {
  product_id: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user_phone: string;
  customer_name: string;
  items: OrderItem[];
  total: number;
  notes: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  created_at: string;
}
