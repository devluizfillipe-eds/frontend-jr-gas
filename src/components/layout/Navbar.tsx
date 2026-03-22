"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const navLinks = [
  { href: "#produtos", label: "Produtos" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
  { href: "#oferta", label: "Pedir Agora" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-orange-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Gás<span className="text-orange-400">Rápido</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.slice(0, -1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-orange-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#oferta"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 rounded-full shadow-lg shadow-orange-500/30 border-0"
              )}
            >
              Pedir Agora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-700/50 py-4">
            <div className="flex flex-col gap-3 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium py-2 transition-colors ${
                    link.href === "#oferta"
                      ? "text-orange-400 font-bold"
                      : "text-slate-300 hover:text-orange-400"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
