"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const depoimentos = [
  {
    name: "Maria S.",
    bairro: "Novo Progresso",
    text: "Pedi o gás às 20h e chegou em 25 minutos. Nunca vi serviço tão rápido! Recomendo demais.",
    stars: 5,
    emoji: "👩",
  },
  {
    name: "João P.",
    bairro: "Jardim Laguna",
    text: "Só compro gás com o Junior Gás. Sempre pontual, produto de qualidade e preço justo. Excelente!",
    stars: 5,
    emoji: "👨",
  },
  {
    name: "Ana C.",
    bairro: "Milanez",
    text: "Atendimento pelo WhatsApp super fácil. Em menos de meia hora o gás estava na minha porta.",
    stars: 5,
    emoji: "👩‍💼",
  },
  {
    name: "Carlos M.",
    bairro: "Oitis",
    text: "Uso para o meu restaurante. O GLP sempre chega certinho e a equipe é super profissional.",
    stars: 5,
    emoji: "👨‍🍳",
  },
  {
    name: "Patrícia L.",
    bairro: "Colorado",
    text: "Fiz o pagamento pelo PIX e mandaram a confirmação na hora! Zero burocracia.",
    stars: 5,
    emoji: "👩‍💻",
  },
  {
    name: "Roberto A.",
    bairro: "Serrano",
    text: "3 entregas feitas e 3 perfeitas. Vou indicar para toda a família. Top demais!",
    stars: 4,
    emoji: "👴",
  },
];

export default function ProvasSociaisSection() {
  return (
    <section
      id="depoimentos"
      className="py-20 bg-gray-50 relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest mb-3 block">
            Depoimentos reais
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            O que nossos clientes{" "}
            <span className="text-orange-400">falam de nós</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-gray-500 text-sm ml-2">
              5.0 · 127 avaliações
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {depoimentos.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 relative hover:border-orange-400/40 transition-colors shadow-sm"
            >
              <Quote className="absolute top-4 right-4 w-6 h-6 text-orange-500/20" />
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: d.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                &ldquo;{d.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">
                  {d.emoji}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{d.name}</p>
                  <p className="text-gray-400 text-xs">{d.bairro}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
