import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/services/orders";
import { createPixCharge } from "@/services/abacatepay";
import type { CheckoutFormData, CartItem } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData, cartItems }: { formData: CheckoutFormData; cartItems: CartItem[] } = body;

    if (!formData || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    // Create order in Supabase
    const order = await createOrder(formData, cartItems);

    if (!order) {
      return NextResponse.json(
        { error: "Erro ao criar pedido" },
        { status: 500 }
      );
    }

    let pixData = null;

    // Only create PIX charge if payment method is PIX
    if (formData.payment_method === "pix") {
      const totalCents = Math.round(order.total_amount * 100);
      pixData = await createPixCharge({
        amount: totalCents,
        customer: {
          name: formData.customer_name,
          phone: formData.customer_phone,
        },
        description: `Pedido #${order.id.slice(-8).toUpperCase()} - Gás`,
        externalId: order.id,
      });
    }

    return NextResponse.json({
      success: true,
      order,
      pix: pixData,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
