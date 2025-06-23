import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cake, Cookie, Heart, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="confeitaria-gradient min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Bem-vindos à <span className="confeitaria-text-gradient">Karla Cake</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Confeitaria artesanal especializada em bolos, doces e bolos de andar personalizados. 
            Transformamos seus momentos especiais em doces memórias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 hover-lift">
              <Link to="/catalogo">Ver Catálogo</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover-lift">
              <Link to="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Nossos Produtos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow hover-lift bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <Cake className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bolos Personalizados</h3>
              <p className="text-gray-600 mb-4">
                Bolos únicos e deliciosos para todas as ocasiões especiais.
              </p>
              <Button asChild variant="outline" className="hover-lift">
                <Link to="/pedido/bolos">Fazer Pedido</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow hover-lift bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <Cookie className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Doces Artesanais</h3>
              <p className="text-gray-600 mb-4">
                Docinhos e sobremesas feitos com muito carinho e ingredientes selecionados.
              </p>
              <Button asChild variant="outline" className="hover-lift">
                <Link to="/pedido/doces">Fazer Pedido</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow hover-lift bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bolos de Andar</h3>
              <p className="text-gray-600 mb-4">
                Bolos de múltiplos andares para casamentos e eventos especiais.
              </p>
              <Button asChild variant="outline" className="hover-lift">
                <Link to="/pedido/bolos-andar">Fazer Pedido</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white/60 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            O que nossos clientes dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-lift bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "O bolo do meu casamento ficou perfeito! Superou todas as expectativas."
                </p>
                <p className="font-semibold">- Maria Silva</p>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Doces deliciosos e atendimento excepcional. Recomendo muito!"
                </p>
                <p className="font-semibold">- João Santos</p>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Qualidade impecável e sabor incrível. Karla é uma artista!"
                </p>
                <p className="font-semibold">- Ana Costa</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

