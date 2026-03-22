"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDown, Clock, Shield, Zap } from "lucide-react";

const badges = [
  { icon: Clock, text: "30 min" },
  { icon: Shield, text: "Garantido" },
  { icon: Zap, text: "24h/7dias" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(251,146,60,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(251,146,60,0.3) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 text-orange-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              Entrega em até 30 minutos
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Gás na sua porta,{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                rápido e seguro
              </span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Entrega de botijão de gás com qualidade garantida, direto na sua
              residência ou empresa. Peça agora pelo WhatsApp ou pelo site!
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              {badges.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/50 rounded-full px-4 py-2 text-slate-300 text-sm"
                >
                  <Icon className="w-4 h-4 text-orange-400" />
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#oferta"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-8 py-6 text-lg rounded-full shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all border-0"
                )}
              >
                Pedir Agora 🔥
              </a>
              <a
                href="#produtos"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg rounded-full"
                )}
              >
                Ver Produtos
              </a>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Placeholder - replace with real image */}
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="text-8xl mb-4">🔥</div>
                  <p className="text-slate-400 text-sm">
                    [Imagem do produto]
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    Substitua pela imagem real
                  </p>
                </div>
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl ring-2 ring-orange-500/20 scale-105" />

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-green-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg text-sm"
              >
                ✓ Entrega Garantida
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#problema"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-orange-400 transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.a>
    </section>
  );
}
