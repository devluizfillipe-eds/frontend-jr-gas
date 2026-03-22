"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, XCircle, ThumbsDown } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Espera longa",
    description: "Outras entregas demoram horas ou até o dia seguinte.",
  },
  {
    icon: XCircle,
    title: "Gás acabou na hora errada",
    description: "Geralmente acontece quando você mais precisa — na hora do almoço ou jantar.",
  },
  {
    icon: ThumbsDown,
    title: "Atendimento ruim",
    description: "Difícil de contatar, sem confirmação de entrega e sem previsão de chegada.",
  },
  {
    icon: AlertTriangle,
    title: "Falta de segurança",
    description: "Produtos sem procedência ou com validade vencida são um risco real.",
  },
];

export default function ProblemaSection() {
  return (
    <section
      id="problema"
      className="py-20 bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 to-slate-950" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-red-400 uppercase tracking-widest mb-3 block">
            Você já passou por isso?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Os problemas que deixam você{" "}
            <span className="text-red-400">sem gás</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-red-500/30 transition-colors"
            >
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <p.icon className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
