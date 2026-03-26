"use client";

import { motion } from "framer-motion";
import { Timer, ShieldCheck, PhoneCall, MapPin, Star, Truck } from "lucide-react";

const diferenciais = [
  {
    icon: Timer,
    title: "30 minutos",
    description: "Da confirmação do pedido à sua porta. Entrega expressa garantida.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: ShieldCheck,
    title: "100% Seguro",
    description: "Produtos certificados pelo INMETRO e homologados pela ANP.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: PhoneCall,
    title: "Suporte 24h",
    description: "Atendimento via WhatsApp a qualquer hora do dia ou da noite.",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: MapPin,
    title: "Cobertura total",
    description: "Atendemos toda a cidade e cidades vizinhas.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Star,
    title: "+500 clientes",
    description: "Centenas de famílias e empresas confiam no nosso serviço.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Truck,
    title: "Frota própria",
    description: "Veículos rastreados e equipe treinada para uma entrega segura.",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
];

export default function DiferenciaisSection() {
  return (
    <section id="diferenciais" className="py-20 bg-white relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest mb-3 block">
            Por que nos escolher?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Nossos{" "}
            <span className="text-orange-400">diferenciais</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diferenciais.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:border-orange-400/40 hover:bg-orange-50/30 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
