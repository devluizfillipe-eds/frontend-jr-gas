// ─── Product ─────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url?: string | null;
  is_featured: boolean;
  is_active: boolean;
  weight_kg?: number;
  created_at: string;
  updated_at: string;
}

// ─── Order ────────────────────────────────────────────────────────────────────
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "delivering"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_neighborhood?: string;
  customer_complement?: string;
  status: OrderStatus;
  total_amount: number;
  payment_method: string;
  payment_status: "pending" | "paid" | "failed";
  notes?: string;
  abacatepay_payment_id?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

// ─── Order Item ───────────────────────────────────────────────────────────────
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: Product;
  created_at: string;
}

// ─── Checkout Form ────────────────────────────────────────────────────────────
export interface CheckoutFormData {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_neighborhood: string;
  customer_complement: string;
  payment_method: "pix" | "cash" | "credit_card";
  notes: string;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

// ─── AbacatePay ───────────────────────────────────────────────────────────────
export interface AbacatePayChargeRequest {
  amount: number; // in cents
  customer: {
    name: string;
    phone: string;
  };
  description: string;
  externalId: string;
}

export interface AbacatePayChargeResponse {
  id: string;
  brCode: string; // PIX copia-e-cola
  qrCodeUrl: string;
  status: string;
}
