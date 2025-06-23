import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Cake, MessageCircle } from 'lucide-react';

const OrderCakes = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    dataEntrega: '',
    sabor: '',
    recheio: '',
    cobertura: '',
    tamanho: '',
    decoracao: '',
    observacoes: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Criar mensagem para WhatsApp
    const message = `🧁 *PEDIDO DE BOLO - KARLA CAKE*

👤 *Cliente:* ${formData.nome}
📱 *Telefone:* ${formData.telefone}
📧 *E-mail:* ${formData.email}
📅 *Data de Entrega:* ${formData.dataEntrega}

🎂 *Detalhes do Bolo:*
• Sabor: ${formData.sabor}
• Recheio: ${formData.recheio}
• Cobertura: ${formData.cobertura}
• Tamanho: ${formData.tamanho}
• Decoração: ${formData.decoracao}

📝 *Observações:* ${formData.observacoes}

Aguardo retorno para confirmar o pedido e valor. Obrigado!`;

    const whatsappUrl = `https://wa.me/5524998747229?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Cake className="w-16 h-16 text-pink-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Pedido de Bolos</h1>
          <p className="text-xl text-gray-600">
            Preencha o formulário abaixo para fazer seu pedido personalizado
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados do Cliente */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Dados do Cliente</h3>
                
                <div>
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    required
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone">WhatsApp *</Label>
                    <Input
                      id="telefone"
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      required
                      placeholder="(73) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dataEntrega">Data de Entrega *</Label>
                  <Input
                    id="dataEntrega"
                    type="date"
                    value={formData.dataEntrega}
                    onChange={(e) => handleInputChange('dataEntrega', e.target.value)}
                    required
                    min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Pedidos devem ser feitos com antecedência mínima de 48h
                  </p>
                </div>
              </div>

              {/* Detalhes do Bolo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Detalhes do Bolo</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sabor">Sabor *</Label>
                    <Select onValueChange={(value) => handleInputChange('sabor', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha o sabor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chocolate">Chocolate</SelectItem>
                        <SelectItem value="baunilha">Baunilha</SelectItem>
                        <SelectItem value="morango">Morango</SelectItem>
                        <SelectItem value="red-velvet">Red Velvet</SelectItem>
                        <SelectItem value="cenoura">Cenoura</SelectItem>
                        <SelectItem value="limao">Limão</SelectItem>
                        <SelectItem value="coco">Coco</SelectItem>
                        <SelectItem value="outro">Outro (especificar nas observações)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="recheio">Recheio *</Label>
                    <Select onValueChange={(value) => handleInputChange('recheio', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha o recheio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brigadeiro">Brigadeiro</SelectItem>
                        <SelectItem value="doce-leite">Doce de Leite</SelectItem>
                        <SelectItem value="nutella">Nutella</SelectItem>
                        <SelectItem value="morango">Morango com Chantilly</SelectItem>
                        <SelectItem value="beijinho">Beijinho</SelectItem>
                        <SelectItem value="frutas">Frutas Vermelhas</SelectItem>
                        <SelectItem value="outro">Outro (especificar nas observações)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cobertura">Cobertura *</Label>
                    <Select onValueChange={(value) => handleInputChange('cobertura', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha a cobertura" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chantilly">Chantilly</SelectItem>
                        <SelectItem value="ganache">Ganache</SelectItem>
                        <SelectItem value="buttercream">Buttercream</SelectItem>
                        <SelectItem value="fondant">Fondant</SelectItem>
                        <SelectItem value="glacê">Glacê</SelectItem>
                        <SelectItem value="outro">Outro (especificar nas observações)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tamanho">Tamanho *</Label>
                    <Select onValueChange={(value) => handleInputChange('tamanho', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha o tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pequeno">Pequeno (15cm - 8 fatias)</SelectItem>
                        <SelectItem value="medio">Médio (20cm - 12 fatias)</SelectItem>
                        <SelectItem value="grande">Grande (25cm - 16 fatias)</SelectItem>
                        <SelectItem value="extra-grande">Extra Grande (30cm - 20 fatias)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="decoracao">Decoração</Label>
                  <Input
                    id="decoracao"
                    type="text"
                    value={formData.decoracao}
                    onChange={(e) => handleInputChange('decoracao', e.target.value)}
                    placeholder="Ex: Flores de açúcar, tema infantil, cores específicas..."
                  />
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações Adicionais</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    placeholder="Alguma informação adicional, alergia alimentar, preferências especiais..."
                    rows={4}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Enviar Pedido pelo WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Após enviar o pedido, entraremos em contato para confirmar os detalhes e informar o valor total.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCakes;

