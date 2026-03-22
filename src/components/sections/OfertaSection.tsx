"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Clock, Shield } from "lucide-react";
import type { Product } from "@/types";
import { useProducts } from "@/hooks/useProducts";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

interface OfertaSectionProps {
  onSelectProduct: (p: Product) => void;
}

export default function OfertaSection({ onSelectProduct }: OfertaSectionProps) {
  const { featuredProduct, loading } = useProducts();

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá%2C+gostaria+de+comprar+o+gás.`;

  return (
    <section
      id="oferta"
      className="py-20 bg-gradient-to-br from-orange-600/20 via-slate-900 to-red-900/10 relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/40 text-sm px-4 py-1.5 mb-6">
            ⚡ Oferta especial hoje
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Peça seu gás{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              agora mesmo!
            </span>
          </h2>
          <p className="text-slate-400 text-xl mb-10 leading-relaxed">
            Entrega expressa na sua porta. Rápido, seguro e confiável.
          </p>

          {!loading && featuredProduct && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/80 border border-orange-500/40 rounded-3xl p-8 mb-8 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <p className="text-slate-400 text-sm mb-1">Produto destaque</p>
                  <h3 className="text-white font-extrabold text-2xl">
                    {featuredProduct.name}
                  </h3>
                  {featuredProduct.original_price && (
                    <p className="text-slate-500 line-through mt-1">
                      {formatCurrency(featuredProduct.original_price)}
                    </p>
                  )}
                  <p className="text-4xl font-extrabold text-orange-400 mt-1">
                    {formatCurrency(featuredProduct.price)}
                  </p>
                </div>
                <Button
                  onClick={() => onSelectProduct(featuredProduct)}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-10 py-6 text-xl rounded-2xl shadow-xl shadow-orange-500/40 transition-all hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Comprar Agora
                </Button>
              </div>
            </motion.div>
          )}

          {/* Trust icons */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm mb-8">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              Entrega em 30 min
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              Produto garantido
            </span>
          </div>

          <p className="text-slate-500 text-sm mb-4">
            Prefere pelo WhatsApp?{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 underline"
            >
              Clique aqui para falar conosco
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
