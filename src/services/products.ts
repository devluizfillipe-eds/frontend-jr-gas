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
      name: "GLP 13 kg",
      description:
        "Recarga de gás 13kg. entregue seu botijão vazio e economize. Entrega expressa.",
      price: 110.0,
      original_price: 125.0,
      image_url: "/botijão-produto.png",
      is_featured: true,
      is_active: true,
      weight_kg: 13,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Botijão Completo",
      description:
        "Botijão completo contendo vasilhame + GLP 13kg.",
      price: 350.0,
      original_price: undefined,
      image_url: "/botijão-completo.png",
      is_featured: false,
      is_active: true,
      weight_kg: 13,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Mangueira",
      description:
        "Mangueira aprovada pelo INMETRO para gás de cozinha.",
      price: 30.0,
      original_price: undefined,
      image_url: "/mangueira.png",
      is_featured: false,
      is_active: true,
      weight_kg: undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Registro",
      description:
        "Regulador de gás de alta qualidade e segurança.",
      price: 50.0,
      original_price: undefined,
      image_url: "/registro.png",
      is_featured: false,
      is_active: true,
      weight_kg: undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Mangueira + Registro",
      description:
        "Kit completo de mangueira e registro novos para instalação.",
      price: 70.0,
      original_price: 80.0,
      image_url: "/mangueira+registro.png",
      is_featured: false,
      is_active: true,
      weight_kg: undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}
