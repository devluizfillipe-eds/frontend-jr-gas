"use client";

import { motion, AnimatePresence } from "framer-motion";

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
          {/* Ícone oficial do WhatsApp em SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-9 h-9"
            fill="white"
          >
            <path d="M24 4C12.95 4 4 12.95 4 24c0 3.74 1.03 7.23 2.81 10.21L4 44l10.07-2.73A19.88 19.88 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36c-3.28 0-6.34-.9-8.97-2.47l-.64-.38-6.64 1.8 1.75-6.47-.41-.66A15.93 15.93 0 0 1 8 24c0-8.84 7.16-16 16-16s16 7.16 16 16-7.16 16-16 16zm8.77-11.87c-.48-.24-2.84-1.4-3.28-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.02-.75-3.85-2.38-1.42-1.27-2.38-2.84-2.66-3.32-.28-.48-.03-.74.21-.98.22-.21.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.39-.93-.78-.8-1.08-.82-.28-.01-.6-.01-.92-.01s-.84.12-1.28.6c-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24.35.15.78.3 1.3.43.79.22 1.5.19 2.07.11.63-.09 1.94-.79 2.21-1.56.28-.76.28-1.42.2-1.56-.08-.16-.32-.24-.68-.4z" />
          </svg>
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Falar no WhatsApp 💬
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-t border-gray-700 rotate-45" />
        </div>
      </motion.a>
    </AnimatePresence>
  );
}
