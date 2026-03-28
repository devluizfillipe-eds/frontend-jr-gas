"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDown, Clock, Shield, Zap } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const badges = [
  { icon: Clock, text: "Entrega Rápida" },
  { icon: Shield, text: "Garantido" },
  { icon: Zap, text: "24h/7dias" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Como o usuário vai rolar a tela, mapeamos 0px até 800px de scroll
  // para deslocar o texto ao longo do path (de 50% centro até 85% direita).
  // Os dois se movem sincronicamente.
  const orbitOffset = useTransform(scrollY, [0, 800], ["50%", "85%"]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-orange-50 to-orange-100"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-400/10 rounded-full blur-3xl" />
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 w-full">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-12 lg:items-center">

          {/* ── Imagem + Anel Orbital (Maior) ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="w-full flex justify-center lg:order-2 lg:flex-1"
          >
            {/* Aumentado o tamanho do container da imagem em 2x (ajustado para proporção 4:3) */}
            <div className="relative w-[760px] h-[570px] sm:w-[960px] sm:h-[720px] max-w-[200vw] lg:-mr-[20%] xl:mr-0 flex-shrink-0 -mt-8">

               {/* ── ARCO TRASEIRO (Z-10, atrás da imagem) ── */}
               <div className="absolute inset-0 z-10 pointer-events-none">
                <svg
                  viewBox="0 0 800 600"
                  width="100%"
                  height="100%"
                  className="overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Caminho curva para cima (trajeto traseiro do botijão) - flui da direita para a esquerda */}
                    <path
                      id="back-arc"
                      d="M 900,320 Q 400,160 -100,320"
                      fill="none"
                    />
                  </defs>
                  <text
                    fill="#000000ff"
                    fillOpacity="0.35"
                    fontSize="64"
                    fontWeight="800"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="8"
                    textAnchor="middle"
                  >
                    <motion.textPath href="#back-arc" startOffset={orbitOffset}>
                      Junior Gás
                    </motion.textPath>
                  </text>
                </svg>
              </div>

              {/* ── IMAGEM DO BOTIJÃO (Z-20, tamanho maior) ── */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <Image
                  src="/botijaosemfundo.png"
                  alt="Botijão de gás Junior Gás"
                  width={640}
                  height={840}
                  className="object-contain"
                  style={{
                    filter:
                      "drop-shadow(0 20px 40px rgba(0,0,0,0.22)) drop-shadow(0 8px 16px rgba(251,146,60,0.25))",
                  }}
                  priority
                />
              </div>

              {/* ── ARCO FRONTAL (Z-30, na frente da imagem) ── */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                <svg
                  viewBox="0 0 800 600"
                  width="100%"
                  height="100%"
                  className="overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Caminho curva para baixo (trajeto frontal) - flui da esquerda para a direita */}
                    <path
                      id="front-arc"
                      d="M -100,320 Q 400,480 900,320"
                      fill="none"
                    />
                  </defs>
                  <text
                    fill="#000000ff"
                    fontSize="64"
                    fontWeight="900"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="8"
                    textAnchor="middle"
                    style={{ textShadow: "0 4px 12px rgba(251,146,60,0.3)" }}
                  >
                    <motion.textPath href="#front-arc" startOffset={orbitOffset}>
                      Junior Gás
                    </motion.textPath>
                  </text>
                </svg>
              </div>

              {/* Sombra no chão sob o botijão */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-orange-900/20 rounded-full blur-xl z-0" />
            </div>
          </motion.div>

          {/* ── Conteúdo de texto ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left lg:order-1 lg:flex-1"
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 text-orange-500 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Entrega em até 30 minutos
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Gás na sua porta,{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                rápido e seguro
              </span>
            </h1>

            <p className="text-gray-500 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Entrega de botijão de gás com qualidade garantida, direto na sua
              residência ou empresa. Peça agora pelo WhatsApp ou pelo site!
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              {badges.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-4 py-2 text-gray-700 text-sm shadow-sm"
                >
                  <Icon className="w-4 h-4 text-orange-500" />
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
                  "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-8 py-6 text-lg rounded-full"
                )}
              >
                Ver Produtos
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#problema"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-orange-500 transition-colors z-40"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.a>
    </section>
  );
}
