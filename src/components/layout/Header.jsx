import { useState } from 'react'; // Importar useState para gerenciar o estado do menu móvel
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react'; // Importar ícones de menu e fechar

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para controlar a abertura/fechamento do menu móvel

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-pink-50 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Nome da Marca */}
          <Link to="/" className="flex items-center space-x-2 group" onClick={closeMobileMenu}>
            <span className="text-3xl font-bold text-pink-600 transition-transform group-hover:rotate-12">🧁</span>
            <span className="text-2xl font-bold text-gray-800 group-hover:text-pink-700 transition-colors">Karla Cake</span>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors text-lg font-medium" onClick={closeMobileMenu}>
              Início
            </Link>
            <Link to="/catalogo" className="text-gray-700 hover:text-pink-600 transition-colors text-lg font-medium" onClick={closeMobileMenu}>
              Catálogo
            </Link>
            <Link to="/contato" className="text-gray-700 hover:text-pink-600 transition-colors text-lg font-medium" onClick={closeMobileMenu}>
              Contato
            </Link>
          </nav>

          {/* Botão "Fazer Pedido" e Botão do Menu Hambúrguer */}
          <div className="flex items-center space-x-4">
            <Button asChild className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hidden md:inline-flex">
              <Link to="/catalogo" onClick={closeMobileMenu}>Fazer Pedido</Link>
            </Button>

            {/* Botão do Menu Hambúrguer (visível apenas em telas pequenas) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700 hover:text-pink-600"
              onClick={toggleMobileMenu}
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Mobile (Overlay) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-opacity duration-300 ease-in-out">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-gray-700 hover:text-pink-600"
            onClick={toggleMobileMenu}
            aria-label="Fechar menu"
          >
            <X className="h-8 w-8" />
          </Button>
          <nav className="flex flex-col space-y-6 text-center">
            <Link to="/" className="text-gray-800 hover:text-pink-600 text-3xl font-bold transition-colors" onClick={closeMobileMenu}>
              Início
            </Link>
            <Link to="/catalogo" className="text-gray-800 hover:text-pink-600 text-3xl font-bold transition-colors" onClick={closeMobileMenu}>
              Catálogo
            </Link>
            <Link to="/contato" className="text-gray-800 hover:text-pink-600 text-3xl font-bold transition-colors" onClick={closeMobileMenu}>
              Contato
            </Link>
            <Button asChild className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-xl mt-8">
              <Link to="/catalogo" onClick={closeMobileMenu}>Fazer Pedido</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
