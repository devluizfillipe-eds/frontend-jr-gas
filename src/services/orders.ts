import { supabase } from "@/lib/supabase";
import type { Order, CheckoutFormData, CartItem } from "@/types";

export async function createOrder(
  formData: CheckoutFormData,
  cartItems: CartItem[]
): Promise<Order | null> {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // 1. Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: formData.customer_name,
      customer_phone: formData.customer_phone,
      customer_address: formData.customer_address,
      customer_neighborhood: formData.customer_neighborhood,
      customer_complement: formData.customer_complement,
      status: "pending",
      total_amount: totalAmount,
      payment_method: formData.payment_method,
      payment_status: "pending",
      notes: formData.notes,
    })
    .select()
    .single();

  if (orderError || !order) {
    console.error("Error creating order:", orderError);
    return null;
  }

  // 2. Create order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product.id,
    quantity: item.quantity,
    unit_price: item.product.price,
    total_price: item.product.price * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
  }

  return order as Order;
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data as Order[];
}

export async function getOrderById(id: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return null;
  }

  return data as Order;
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<boolean> {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating order status:", error);
    return false;
  }

  return true;
}
