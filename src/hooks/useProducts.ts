"use client";

import { useState, useEffect } from "react";
import { getActiveProducts, getMockProducts } from "@/services/products";
import type { Product } from "@/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getActiveProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar produtos");
        setProducts(getMockProducts());
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const featuredProduct = products.find((p) => p.is_featured) ?? products[0];
  const otherProducts = products.filter((p) => !p.is_featured);

  return { products, featuredProduct, otherProducts, loading, error };
}
