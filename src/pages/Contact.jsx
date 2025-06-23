import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Instagram, MapPin, Clock, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Entre em Contato</h1>
        <p className="text-xl text-gray-600">
          Estamos aqui para tornar seus momentos especiais ainda mais doces
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-pink-600" />
                <span>Telefone e WhatsApp</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Entre em contato conosco pelo WhatsApp para fazer seu pedido ou tirar dúvidas.
              </p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <a 
                  href="https://wa.me/5573999999999?text=Olá! Gostaria de fazer um pedido na Karla Cake." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>(73) 99999-9999</span>
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Instagram className="w-5 h-5 text-pink-600" />
                <span>Instagram</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Siga-nos no Instagram para ver nossos trabalhos mais recentes e novidades.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a 
                  href="https://instagram.com/karlacake" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@karlacake</span>
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-pink-600" />
                <span>E-mail</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Você também pode nos enviar um e-mail com sua solicitação.
              </p>
              <p className="font-semibold">contato@karlacake.com</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-pink-600" />
                <span>Localização</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">Eunápolis, Bahia</p>
              <p className="text-sm text-gray-500">
                Atendemos toda a região de Eunápolis e cidades próximas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-pink-600" />
                <span>Horário de Atendimento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Segunda a Sexta:</span>
                  <span>8h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span>8h às 16h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span>Fechado</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-pink-50">
            <CardHeader>
              <CardTitle>Informações Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Pedidos devem ser feitos com antecedência mínima de 48h</li>
                <li>• Bolos de andar requerem antecedência de 1 semana</li>
                <li>• Aceitamos encomendas para eventos e festas</li>
                <li>• Entrega disponível na região de Eunápolis</li>
                <li>• Orçamentos personalizados sem compromisso</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Pronto para fazer seu pedido?
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
            <a 
              href="https://wa.me/5573999999999?text=Olá! Gostaria de fazer um pedido na Karla Cake." 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Fazer Pedido pelo WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a 
              href="https://instagram.com/karlacake" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Ver no Instagram
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

