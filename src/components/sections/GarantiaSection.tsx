"use client";

import { motion } from "framer-motion";
import { ShieldCheck, RefreshCcw, ThumbsUp } from "lucide-react";

const garantias = [
  {
    icon: ShieldCheck,
    title: "Produto Original",
    description:
      "Todos os nossos botijões são originais, homologados pela ANP e com lacre de segurança.",
  },
  {
    icon: RefreshCcw,
    title: "Troca Garantida",
    description:
      "Se o produto chegar com algum problema, trocamos na hora.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfação Total",
    description:
      "Mais de 900 clientes satisfeitos. Não ficou feliz? Resolveremos até você ficar.",
  },
];

export default function GarantiaSection() {
  return (
    <section
      id="garantia"
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background decor */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-green-500/5 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-green-400 uppercase tracking-widest mb-3 block">
            Garantia real
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Compre com{" "}
            <span className="text-green-400">total segurança</span>
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">
            A sua tranquilidade é nossa prioridade. Por isso oferecemos garantias reais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {garantias.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-8 rounded-3xl border border-green-400/30 bg-green-50 hover:border-green-400/60 transition-colors shadow-sm"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <g.icon className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-3">{g.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {g.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Guarantee seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 mx-auto max-w-sm bg-gradient-to-r from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl p-6 text-center"
        >
          <div className="text-4xl mb-2">🛡️</div>
          <p className="text-gray-900 font-bold text-lg">Garantia de satisfação</p>
          <p className="text-gray-500 text-sm mt-1">
            Sua satisfação é nossa prioridade. Se não ficar satisfeito, resolveremos até você ficar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
