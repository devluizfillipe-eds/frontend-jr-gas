"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Em quanto tempo o gás chega?",
    a: "Nossa entrega padrão é em até 30 minutos após a confirmação do pedido. Em caso de alta demanda, o prazo pode ser de até 1 hora. Você será avisado pelo WhatsApp.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Aceitamos PIX (com desconto), dinheiro na entrega e cartão de crédito/débito. Para PIX, o código será enviado automaticamente após o pedido.",
  },
  {
    q: "Vocês entregam no meu bairro?",
    a: "Temos cobertura em toda Regional Ressaca e bairros adjacentes qualquer duvida entre em contato pelo WhatsApp.",
  },
  {
    q: "O produto é original?",
    a: "Sim! Trabalhamos apenas com botijões originais de fabricantes homologados pela ANP, com lacragem e todos os certificados de segurança.",
  },
  {
    q: "Posso comprar o botijão sem dar o meu em troca?",
    a: "Sim! Oferecemos o botijão completo (com vasilhame) ou apenas a recarga. Confira os preços na seção de produtos.",
  },
  {
    q: "E se o produto chegar com defeito?",
    a: "Garantimos a devolução ou substituição imediata. Basta entrar em contato pelo WhatsApp e resolveremos sem burocracia.",
  },
  {
    q: "Como funciona o pagamento PIX?",
    a: "Ao finalizar o pedido com PIX, você receberá o QR Code e o código copia-e-cola. Após a confirmação do pagamento, iniciamos a entrega.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="py-20 bg-gray-50 relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest mb-3 block">
            Dúvidas frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Perguntas e{" "}
            <span className="text-orange-400">Respostas</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Base-UI Accordion: uses openMultiple, not type="single" */}
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={i}
                className="bg-white border border-gray-200 rounded-xl px-5 hover:border-orange-400/40 transition-colors shadow-sm"
              >
                <AccordionTrigger className="text-gray-900 text-left font-medium hover:text-orange-500 hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
