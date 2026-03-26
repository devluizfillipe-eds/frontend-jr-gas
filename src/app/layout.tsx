import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Junior Gás — Entrega de Gás em até 30 minutos",
  description:
    "Peça seu botijão de gás com entrega rápida e segura. Produtos originais, pagamento facilitado e atendimento 24h.",
  keywords: ["gás", "botijão de gás", "entrega de gás", "Junior Gás"],
  openGraph: {
    title: "Junior Gás — Entrega de Gás em até 30 minutos",
    description: "Produto original, entrega expressa e pagamento facilitado.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
