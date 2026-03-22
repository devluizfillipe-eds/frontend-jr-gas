"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProblemaSection from "@/components/sections/ProblemaSection";
import SolucaoSection from "@/components/sections/SolucaoSection";
import ProdutosSection from "@/components/sections/ProdutosSection";
import DiferenciaisSection from "@/components/sections/DiferenciaisSection";
import ProvasSociaisSection from "@/components/sections/ProvasSociaisSection";
import GarantiaSection from "@/components/sections/GarantiaSection";
import OfertaSection from "@/components/sections/OfertaSection";
import FAQSection from "@/components/sections/FAQSection";
import CheckoutModal from "@/components/CheckoutModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import type { Product } from "@/types";

export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    setCheckoutOpen(true);
  }

  return (
    <>
      <Toaster richColors position="top-center" />
      <Navbar />

      <main>
        <HeroSection />
        <ProblemaSection />
        <SolucaoSection />
        <ProdutosSection onSelectProduct={handleSelectProduct} />
        <DiferenciaisSection />
        <ProvasSociaisSection />
        <GarantiaSection />
        <OfertaSection onSelectProduct={handleSelectProduct} />
        <FAQSection />
      </main>

      <Footer />
      <WhatsAppButton />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        selectedProduct={selectedProduct}
      />
    </>
  );
}
