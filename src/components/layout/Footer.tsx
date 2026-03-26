import { Flame, Phone, Instagram, Facebook, MapPin } from "lucide-react";

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá%2C+gostaria+de+comprar+o+gás.`;

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900 font-bold text-xl">
                Junior <span className="text-orange-500">Gás</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Entrega rápida e confiável de gás na sua cidade. Qualidade e
              segurança garantidas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["#produtos", "Produtos"],
                ["#diferenciais", "Diferenciais"],
                ["#depoimentos", "Depoimentos"],
                ["#garantia", "Garantia"],
                ["#faq", "FAQ"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-green-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Sua cidade, Estado</span>
              </li>
              <li className="flex gap-3 mt-4">
                <a href="#" className="hover:text-orange-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <p>
            © {new Date().getFullYear()} Junior Gás. Todos os direitos reservados.
          </p>
          <p>
            CNPJ: 00.000.000/0001-00 | Responsável Técnico: Nome Sobrenome
          </p>
        </div>
      </div>
    </footer>
  );
}
