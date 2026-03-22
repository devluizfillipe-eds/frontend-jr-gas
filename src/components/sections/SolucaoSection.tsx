"use client";

import { motion } from "framer-motion";
import { CheckCircle, Flame } from "lucide-react";

const solutions = [
  "Entrega em até 30 minutos na sua porta",
  "Produtos certificados com qualidade garantida",
  "Atendimento 24h via WhatsApp",
  "Rastreamento em tempo real do seu pedido",
  "Pagamento facilitado: PIX, dinheiro ou cartão",
  "Nota fiscal e transparência total",
];

export default function SolucaoSection() {
  return (
    <section
      id="solucao"
      className="py-20 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="w-full aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-600/10 border border-orange-500/20 flex items-center justify-center">
              <div className="text-center py-12">
                <Flame className="w-24 h-24 text-orange-400 mx-auto mb-4" />
                <p className="text-slate-400 text-sm">[Imagem de entrega]</p>
                <p className="text-slate-500 text-xs mt-1">
                  Substitua pela imagem real
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest mb-3 block">
              A solução que você precisava
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
              GásRápido:{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                simples, rápido, confiável
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Criamos um serviço de entrega de gás pensado em você: sem complicações,
              sem espera, sem surpresas. Do pedido à sua porta em minutos.
            </p>

            <ul className="space-y-3">
              {solutions.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-slate-300"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
