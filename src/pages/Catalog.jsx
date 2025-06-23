import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Importar imagens
import boloChocolate from '@/assets/BoloAndar.jpg';
import boloMorango from '@/assets/BoloSimples.jpg';
import boloRedVelvet from '@/assets/BoloSimples2.jpg';
import brigadeiros from '@/assets/Doces.jpg';
import beijinhos from '@/assets/BoloAndar2.jpg';
import casadinhos from '@/assets/casadinhos.jpg';
import bolo2Andares from '@/assets/bolo-2-andares.jpg';
import bolo3Andares from '@/assets/bolo-3-andares.jpg';

const Catalog = () => {
  const products = {
    bolos: [
      {
        id: 1,
        name: "Bolo de Chocolate",
        description: "Bolo de chocolate com recheio de brigadeiro e cobertura de ganache",
        price: "A partir de R$ 45,00",
        image: boloChocolate
      },
      {
        id: 2,
        name: "Bolo de Morango",
        description: "Bolo de baunilha com recheio de morango e chantilly",
        price: "A partir de R$ 50,00",
        image: boloMorango
      },
      {
        id: 3,
        name: "Bolo Red Velvet",
        description: "Clássico bolo red velvet com cream cheese",
        price: "A partir de R$ 55,00",
        image: boloRedVelvet
      }
    ],
    doces: [
      {
        id: 4,
        name: "Brigadeiros Gourmet",
        description: "Brigadeiros artesanais com diversos sabores",
        price: "R$ 3,00 cada",
        image: brigadeiros
      },
      {
        id: 5,
        name: "Beijinhos",
        description: "Beijinhos tradicionais com coco fresco",
        price: "R$ 2,50 cada",
        image: beijinhos
      },
      {
        id: 6,
        name: "Casadinhos",
        description: "Docinhos de amendoim com doce de leite",
        price: "R$ 3,50 cada",
        image: casadinhos
      }
    ],
    bolosAndar: [
      {
        id: 7,
        name: "Bolo 2 Andares",
        description: "Bolo de 2 andares personalizado para casamentos",
        price: "A partir de R$ 200,00",
        image: bolo2Andares
      },
      {
        id: 8,
        name: "Bolo 3 Andares",
        description: "Bolo de 3 andares para grandes celebrações",
        price: "A partir de R$ 350,00",
        image: bolo3Andares
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Nosso Catálogo</h1>
        <p className="text-xl text-gray-600">
          Descubra nossos deliciosos produtos artesanais
        </p>
      </div>

      {/* Bolos Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Bolos Personalizados</h2>
          <Button asChild>
            <Link to="/pedido/bolos">Fazer Pedido</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.bolos.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <CardHeader className="p-0">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <CardTitle className="text-center">{product.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{product.price}</Badge>
                  <Button asChild size="sm">
                    <Link to="/pedido/bolos">Pedir</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Doces Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Doces Artesanais</h2>
          <Button asChild>
            <Link to="/pedido/doces">Fazer Pedido</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.doces.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <CardHeader className="p-0">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <CardTitle className="text-center">{product.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{product.price}</Badge>
                  <Button asChild size="sm">
                    <Link to="/pedido/doces">Pedir</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bolos de Andar Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Bolos de Andar</h2>
          <Button asChild>
            <Link to="/pedido/bolos-andar">Fazer Pedido</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.bolosAndar.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <CardHeader className="p-0">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <CardTitle className="text-center">{product.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{product.price}</Badge>
                  <Button asChild size="sm">
                    <Link to="/pedido/bolos-andar">Pedir</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-pink-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Não encontrou o que procura?
        </h3>
        <p className="text-gray-600 mb-6">
          Entre em contato conosco para criar algo especial e personalizado para você!
        </p>
        <Button asChild size="lg">
          <Link to="/contato">Fale Conosco</Link>
        </Button>
      </section>
    </div>
  );
};

export default Catalog;

