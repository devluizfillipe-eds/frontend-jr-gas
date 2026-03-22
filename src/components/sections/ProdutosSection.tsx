"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Tag, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function ProductCard({
  product,
  featured = false,
  onSelect,
}: {
  product: Product;
  featured?: boolean;
  onSelect: (p: Product) => void;
}) {
  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100
      )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col ${
        featured
          ? "border-orange-500/60 bg-gradient-to-b from-orange-500/10 to-slate-900 shadow-xl shadow-orange-500/20 ring-2 ring-orange-500/30"
          : "border-slate-700/50 bg-slate-900/80 hover:border-slate-600"
      }`}
    >
      {featured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-orange-500 text-white font-bold text-xs px-3 py-1">
            🔥 Mais Vendido
          </Badge>
        </div>
      )}
      {discount && (
        <div className="absolute top-3 right-3 z-10">
          <Badge
            variant="secondary"
            className="bg-green-500/20 text-green-400 border-green-500/30 font-bold"
          >
            -{discount}%
          </Badge>
        </div>
      )}

      {/* Image */}
      <div
        className={`aspect-square flex items-center justify-center ${
          featured ? "bg-orange-500/5" : "bg-slate-800/50"
        }`}
      >
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain p-8"
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-2">🔥</div>
            <p className="text-slate-500 text-xs">Imagem do produto</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className={`font-bold text-lg mb-1 ${
            featured ? "text-white" : "text-slate-200"
          }`}
        >
          {product.name}
        </h3>
        <p className="text-slate-400 text-sm mb-3 flex-1">
          {product.description}
        </p>

        {product.weight_kg && (
          <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
            <Weight className="w-3.5 h-3.5" />
            {product.weight_kg}kg
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          {product.original_price && (
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-slate-500 text-sm line-through">
                {formatCurrency(product.original_price)}
              </span>
              <Tag className="w-3 h-3 text-green-400" />
            </div>
          )}
          <span
            className={`text-2xl font-extrabold ${
              featured ? "text-orange-400" : "text-white"
            }`}
          >
            {formatCurrency(product.price)}
          </span>
        </div>

        <Button
          onClick={() => onSelect(product)}
          className={`w-full rounded-xl font-bold py-5 text-base shadow-lg transition-all ${
            featured
              ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-orange-500/30"
              : "bg-slate-700 hover:bg-slate-600 text-white"
          }`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Pedir Agora
        </Button>
      </div>
    </motion.div>
  );
}

interface ProdutosSectionProps {
  onSelectProduct: (p: Product) => void;
}

export default function ProdutosSection({ onSelectProduct }: ProdutosSectionProps) {
  const { products, featuredProduct, otherProducts, loading } = useProducts();

  return (
    <section id="produtos" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest mb-3 block">
            Nossos Produtos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Escolha o botijão{" "}
            <span className="text-orange-400">ideal para você</span>
          </h2>
          <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
            Trabalhamos com botijões originais de marcas homologadas pela ANP.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-slate-800/50 animate-pulse aspect-[3/4]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProduct && (
              <ProductCard
                product={featuredProduct}
                featured
                onSelect={onSelectProduct}
              />
            )}
            {otherProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
