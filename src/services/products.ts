import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

export async function getActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    // Return mock data when Supabase is not configured
    return getMockProducts();
  }

  return data as Product[];
}

export async function getFeaturedProduct(): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .single();

  if (error) {
    console.error("Error fetching featured product:", error);
    const mocks = getMockProducts();
    return mocks.find((p) => p.is_featured) ?? null;
  }

  return data as Product;
}

// ─── Mock data for development without Supabase ──────────────────────────────
export function getMockProducts(): Product[] {
  return [
    {
      id: "1",
      name: "Botijão P13 Completo",
      description:
        "Botijão de gás 13kg completo, com válvula e lacre de segurança. Entrega em até 30 minutos.",
      price: 120.0,
      original_price: 140.0,
      image_url: null,
      is_featured: true,
      is_active: true,
      weight_kg: 13,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Botijão P13 Sem Vasilhame",
      description:
        "Recarga de gás 13kg. Traga seu botijão vazio e economize. Entrega expressa.",
      price: 90.0,
      original_price: undefined,
      image_url: null,
      is_featured: false,
      is_active: true,
      weight_kg: 13,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Botijão P45 Industrial",
      description:
        "Botijão industrial 45kg, ideal para restaurantes e empresas. Entrega agendada.",
      price: 350.0,
      original_price: undefined,
      image_url: null,
      is_featured: false,
      is_active: true,
      weight_kg: 45,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}
