"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
  const message = encodeURIComponent("Olá, gostaria de comprar o gás.");
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <AnimatePresence>
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 group"
      >
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />

        {/* Button */}
        <div className="relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-xl shadow-green-500/40 flex items-center justify-center transition-colors">
          <MessageCircle className="w-8 h-8 text-white fill-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Falar no WhatsApp 💬
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-t border-slate-700 rotate-45" />
        </div>
      </motion.a>
    </AnimatePresence>
  );
}
