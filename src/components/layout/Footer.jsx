import { Instagram, MessageCircle, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🧁</span>
              <span className="text-xl font-bold">Karla Cake</span>
            </div>
            <p className="text-gray-300">
              Confeitaria artesanal especializada em bolos, doces e bolos de andar personalizados.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2">
              <p className="text-gray-300">📱 WhatsApp: (73) 99999-9999</p>
              <p className="text-gray-300">📧 Email: contato@karlacake.com</p>
              <p className="text-gray-300">📍 Eunápolis, BA</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a 
                href="https://wa.me/5573999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </a>
              <a 
                href="https://instagram.com/karlacake" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
              >
                <Instagram size={20} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-1">
            <span>Feito com</span>
            <Heart size={16} className="text-red-500" />
            <span>por Karla Cake © 2025</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

