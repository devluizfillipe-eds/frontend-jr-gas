"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { getOrders, updateOrderStatus } from "@/services/orders";
import type { Order } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  Printer,
  Eye,
  RefreshCw,
  Package,
  Flame,
  Search,
} from "lucide-react";
import { toast } from "sonner";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusColor(status: Order["status"]) {
  const map = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    delivering: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    delivered: "bg-green-500/20 text-green-400 border-green-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return map[status] || "";
}

function statusLabel(status: Order["status"]) {
  const map = {
    pending: "Pendente",
    confirmed: "Confirmado",
    delivering: "Saiu p/ entrega",
    delivered: "Entregue",
    cancelled: "Cancelado",
  };
  return map[status] || status;
}

// ─── Order Detail Modal ───────────────────────────────────────────────────────
function OrderDetail({
  order,
  onClose,
  onStatusChange,
}: {
  order: Order;
  onClose: () => void;
  onStatusChange: (id: string, s: Order["status"]) => void;
}) {
  function printOrder() {
    const printContent = `
      <html><head><title>Pedido #${order.id.slice(-8).toUpperCase()}</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 14px; padding: 20px; }
        h1 { font-size: 20px; }
        .section { margin-bottom: 16px; }
        .label { font-weight: bold; color: #555; font-size: 12px; }
        .item { margin: 4px 0; }
        hr { border: 1px dashed #ccc; margin: 12px 0; }
        .total { font-size: 18px; font-weight: bold; }
      </style></head><body>
        <h1>🔥 Junior Gás — Pedido #${order.id.slice(-8).toUpperCase()}</h1>
        <div class="section">
          <div class="label">Data:</div>
          <div>${formatDate(order.created_at)}</div>
        </div>
        <hr/>
        <div class="section">
          <div class="label">Cliente:</div>
          <div>${order.customer_name}</div>
          <div>${order.customer_phone}</div>
          <div>${order.customer_address}${order.customer_neighborhood ? ", " + order.customer_neighborhood : ""}${order.customer_complement ? " — " + order.customer_complement : ""}</div>
        </div>
        <hr/>
        <div class="section">
          <div class="label">Itens:</div>
          ${order.order_items?.map((i) => `<div class="item">• ${i.product?.name || "Produto"} x${i.quantity} — ${formatCurrency(i.total_price)}</div>`).join("") || ""}
        </div>
        <hr/>
        <div class="total">Total: ${formatCurrency(order.total_amount)}</div>
        <div>Pagamento: ${order.payment_method.toUpperCase()}</div>
        ${order.notes ? `<div>Obs: ${order.notes}</div>` : ""}
      </body></html>
    `;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.print();
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-bold text-xl">
                Pedido #{order.id.slice(-8).toUpperCase()}
              </h2>
              <p className="text-slate-500 text-sm">{formatDate(order.created_at)}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={printOrder}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Printer className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onClose}
                className="border-slate-700 text-slate-400 hover:bg-slate-800"
              >
                ✕
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Client */}
            <div className="bg-slate-800/60 rounded-xl p-4">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Cliente
              </p>
              <p className="text-white font-semibold">{order.customer_name}</p>
              <p className="text-slate-300 text-sm">{order.customer_phone}</p>
              <p className="text-slate-300 text-sm">
                {order.customer_address}
                {order.customer_neighborhood && `, ${order.customer_neighborhood}`}
                {order.customer_complement && ` — ${order.customer_complement}`}
              </p>
            </div>

            {/* Items */}
            <div className="bg-slate-800/60 rounded-xl p-4">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Itens
              </p>
              <div className="space-y-2">
                {order.order_items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-slate-300 text-sm">
                      {item.product?.name || "Produto"} × {item.quantity}
                    </span>
                    <span className="text-white font-semibold text-sm">
                      {formatCurrency(item.total_price)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 mt-3 pt-3 flex justify-between">
                <span className="text-slate-400 font-semibold">Total</span>
                <span className="text-orange-400 font-extrabold text-lg">
                  {formatCurrency(order.total_amount)}
                </span>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-slate-800/60 rounded-xl p-4">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Pagamento
              </p>
              <p className="text-slate-300 text-sm capitalize">
                {order.payment_method === "pix"
                  ? "🔵 PIX"
                  : order.payment_method === "cash"
                  ? "💵 Dinheiro"
                  : "💳 Cartão"}
                {" · "}
                <span
                  className={
                    order.payment_status === "paid"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {order.payment_status === "paid" ? "Pago" : "Pendente"}
                </span>
              </p>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-slate-800/60 rounded-xl p-4">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Observações
                </p>
                <p className="text-slate-300 text-sm">{order.notes}</p>
              </div>
            )}

            {/* Status Update */}
            <div className="bg-slate-800/60 rounded-xl p-4">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Atualizar Status
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    "pending",
                    "confirmed",
                    "delivering",
                    "delivered",
                    "cancelled",
                  ] as Order["status"][]
                ).map((s) => (
                  <button
                    key={s}
                    onClick={() => onStatusChange(order.id, s)}
                    className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                      order.status === s
                        ? statusColor(s) + " font-bold"
                        : "border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400"
                    }`}
                  >
                    {statusLabel(s)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setAuthenticated(true);
    });
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error("Credenciais inválidas.");
    } else {
      setAuthenticated(true);
      fetchOrders();
    }
    setAuthLoading(false);
  }

  async function fetchOrders() {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    if (authenticated) fetchOrders();
  }, [authenticated]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setAuthenticated(false);
    setOrders([]);
  }

  async function handleStatusChange(id: string, status: Order["status"]) {
    const success = await updateOrderStatus(id, status);
    if (success) {
      toast.success("Status atualizado!");
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
      if (selectedOrder?.id === id) {
        setSelectedOrder((prev) => (prev ? { ...prev, status } : prev));
      }
    } else {
      toast.error("Erro ao atualizar status.");
    }
  }

  const filteredOrders = orders.filter(
    (o) =>
      o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_phone.includes(searchQuery) ||
      o.id.slice(-8).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ─── Login Screen ───────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white font-bold text-2xl">Junior Gás Admin</h1>
            <p className="text-slate-400 text-sm mt-1">Painel administrativo</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4"
          >
            <div>
              <Label htmlFor="email" className="text-slate-300 mb-1.5 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="admin@junior-gas.com"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-slate-300 mb-1.5 block">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              disabled={authLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5"
            >
              {authLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ─── Admin Dashboard ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white">Junior Gás Admin</h1>
              <p className="text-slate-400 text-xs">Painel de Pedidos</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={fetchOrders}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-red-400"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Pedidos",
              value: orders.length,
              color: "text-white",
            },
            {
              label: "Pendentes",
              value: orders.filter((o) => o.status === "pending").length,
              color: "text-yellow-400",
            },
            {
              label: "Em Entrega",
              value: orders.filter((o) => o.status === "delivering").length,
              color: "text-purple-400",
            },
            {
              label: "Entregues",
              value: orders.filter((o) => o.status === "delivered").length,
              color: "text-green-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center"
            >
              <p className={`text-2xl font-extrabold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-slate-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, telefone ou pedido..."
            className="bg-slate-900 border-slate-700 text-white pl-10 placeholder:text-slate-500"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-16 bg-slate-800/50 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Nenhum pedido encontrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="text-center hidden sm:block">
                    <p className="text-white font-mono font-bold text-sm">
                      #{order.id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold truncate">
                      {order.customer_name}
                    </p>
                    <p className="text-slate-400 text-sm truncate">
                      {order.customer_phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={`text-xs hidden sm:flex ${statusColor(order.status)}`}
                  >
                    {statusLabel(order.status)}
                  </Badge>
                  <span className="text-orange-400 font-bold whitespace-nowrap text-sm">
                    {formatCurrency(order.total_amount)}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                    className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
