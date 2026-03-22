"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Copy,
  Loader2,
  QrCode,
  ShoppingCart,
  X,
} from "lucide-react";
import type { CartItem, CheckoutFormData, Order, AbacatePayChargeResponse, Product } from "@/types";
import { toast } from "sonner";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

type Step = "cart" | "form" | "payment" | "success";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function CheckoutModal({
  open,
  onClose,
  selectedProduct,
}: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("cart");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [pixData, setPixData] = useState<AbacatePayChargeResponse | null>(null);
  const [formData, setFormData] = useState<CheckoutFormData>({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    customer_neighborhood: "",
    customer_complement: "",
    payment_method: "pix",
    notes: "",
  });

  const cartItem: CartItem | null = selectedProduct
    ? { product: selectedProduct, quantity }
    : null;

  const totalAmount = cartItem
    ? cartItem.product.price * cartItem.quantity
    : 0;

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cartItem) return;

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, cartItems: [cartItem] }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || "Erro ao realizar pedido.");
        return;
      }

      setOrder(data.order);
      setPixData(data.pix);
      setStep(formData.payment_method === "pix" ? "payment" : "success");
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function copyPixCode() {
    if (pixData?.brCode) {
      navigator.clipboard.writeText(pixData.brCode);
      toast.success("Código PIX copiado!");
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStep("cart");
      setQuantity(1);
      setOrder(null);
      setPixData(null);
      setFormData({
        customer_name: "",
        customer_phone: "",
        customer_address: "",
        customer_neighborhood: "",
        customer_complement: "",
        payment_method: "pix",
        notes: "",
      });
    }, 300);
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg bg-slate-950 border-slate-800 text-white overflow-y-auto"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-orange-400" />
            {step === "cart" && "Seu Pedido"}
            {step === "form" && "Dados da Entrega"}
            {step === "payment" && "Pagamento PIX"}
            {step === "success" && "Pedido Confirmado!"}
          </SheetTitle>
        </SheetHeader>

        <AnimatePresence mode="wait">
          {/* STEP: Cart */}
          {step === "cart" && cartItem && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {cartItem.product.name}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {cartItem.product.description}
                    </p>
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    {formatCurrency(cartItem.product.price)}
                  </Badge>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 text-sm">Quantidade:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 bg-slate-800 rounded-lg text-white hover:bg-slate-700 transition-colors font-bold"
                    >
                      −
                    </button>
                    <span className="text-white font-bold w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 bg-slate-800 rounded-lg text-white hover:bg-slate-700 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-slate-300">Total:</span>
                <span className="text-orange-400 text-2xl">
                  {formatCurrency(totalAmount)}
                </span>
              </div>

              <Button
                onClick={() => setStep("form")}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-orange-500/30"
              >
                Continuar
              </Button>
            </motion.div>
          )}

          {/* STEP: Form */}
          {step === "form" && (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="customer_name" className="text-slate-300 mb-1.5 block">
                    Nome completo *
                  </Label>
                  <Input
                    id="customer_name"
                    name="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={handleFormChange}
                    placeholder="Seu nome"
                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="customer_phone" className="text-slate-300 mb-1.5 block">
                    Telefone / WhatsApp *
                  </Label>
                  <Input
                    id="customer_phone"
                    name="customer_phone"
                    required
                    value={formData.customer_phone}
                    onChange={handleFormChange}
                    placeholder="(11) 99999-9999"
                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="customer_address" className="text-slate-300 mb-1.5 block">
                    Endereço completo *
                  </Label>
                  <Input
                    id="customer_address"
                    name="customer_address"
                    required
                    value={formData.customer_address}
                    onChange={handleFormChange}
                    placeholder="Rua, número"
                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="customer_neighborhood" className="text-slate-300 mb-1.5 block">
                      Bairro
                    </Label>
                    <Input
                      id="customer_neighborhood"
                      name="customer_neighborhood"
                      value={formData.customer_neighborhood}
                      onChange={handleFormChange}
                      placeholder="Bairro"
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer_complement" className="text-slate-300 mb-1.5 block">
                      Complemento
                    </Label>
                    <Input
                      id="customer_complement"
                      name="customer_complement"
                      value={formData.customer_complement}
                      onChange={handleFormChange}
                      placeholder="Apto, casa..."
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300 mb-2 block">
                    Forma de pagamento *
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["pix", "cash", "credit_card"] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({ ...p, payment_method: method }))
                        }
                        className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                          formData.payment_method === method
                            ? "border-orange-500 bg-orange-500/20 text-orange-400"
                            : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        {method === "pix" && "🔵 PIX"}
                        {method === "cash" && "💵 Dinheiro"}
                        {method === "credit_card" && "💳 Cartão"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-slate-300 mb-1.5 block">
                    Observações
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    placeholder="Alguma observação para a entrega?"
                    rows={3}
                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-slate-800">
                <span className="text-slate-400">Total</span>
                <span className="text-orange-400 font-extrabold text-xl">
                  {formatCurrency(totalAmount)}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("cart")}
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-5"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Confirmar Pedido"
                  )}
                </Button>
              </div>
            </motion.form>
          )}

          {/* STEP: PIX Payment */}
          {step === "payment" && pixData && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5">
                <p className="text-green-400 font-semibold mb-2">
                  Pedido criado! Agora pague via PIX 📱
                </p>
                <p className="text-slate-400 text-sm">
                  Escaneie o QR Code ou copie o código abaixo para pagar.
                </p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                {pixData.qrCodeUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={pixData.qrCodeUrl}
                    alt="QR Code PIX"
                    className="w-48 h-48 rounded-xl border border-slate-700"
                  />
                ) : (
                  <div className="w-48 h-48 bg-slate-800 rounded-xl flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-slate-500" />
                  </div>
                )}
              </div>

              {/* Copy code */}
              <div>
                <p className="text-slate-400 text-xs mb-2">Código PIX (Copia e Cola)</p>
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-300 font-mono break-all text-left mb-3 max-h-20 overflow-y-auto">
                  {pixData.brCode}
                </div>
                <Button
                  onClick={copyPixCode}
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Código
                </Button>
              </div>

              <Button
                onClick={() => setStep("success")}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5"
              >
                Já paguei ✓
              </Button>
            </motion.div>
          )}

          {/* STEP: Success */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-2xl mb-2">
                  Pedido Confirmado! 🎉
                </h3>
                <p className="text-slate-400">
                  Seu pedido foi recebido. Nossa equipe vai entrar em contato
                  pelo WhatsApp para confirmar a entrega.
                </p>
                {order && (
                  <p className="text-slate-500 text-xs mt-3">
                    Pedido #{order.id.slice(-8).toUpperCase()}
                  </p>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total pago:</span>
                  <span className="text-white font-bold">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Previsão:</span>
                  <span className="text-orange-400 font-semibold">30 minutos</span>
                </div>
              </div>

              <Button
                onClick={handleClose}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5"
              >
                Concluir
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
