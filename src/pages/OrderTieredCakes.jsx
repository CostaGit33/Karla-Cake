import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MessageCircle, AlertCircle } from 'lucide-react';

const OrderTieredCakes = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    dataEntrega: '',
    tipoEvento: '',
    numeroAndares: '',
    sabores: '',
    recheios: '',
    coberturas: '',
    decoracao: '',
    cores: '',
    numeroConvidados: '',
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
    
    const message = `💒 *PEDIDO DE BOLO DE ANDAR - KARLA CAKE*

👤 *Cliente:* ${formData.nome}
📱 *Telefone:* ${formData.telefone}
📧 *E-mail:* ${formData.email}
📅 *Data de Entrega:* ${formData.dataEntrega}

🎉 *Detalhes do Evento:*
• Tipo de Evento: ${formData.tipoEvento}
• Número de Convidados: ${formData.numeroConvidados}

🎂 *Detalhes do Bolo:*
• Número de Andares: ${formData.numeroAndares}
• Sabores: ${formData.sabores}
• Recheios: ${formData.recheios}
• Coberturas: ${formData.coberturas}
• Decoração: ${formData.decoracao}
• Cores: ${formData.cores}

📝 *Observações:* ${formData.observacoes}

Aguardo retorno para confirmar o pedido e valor. Obrigado!`;

    const whatsappUrl = `https://wa.me/5524998747229?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 text-pink-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bolos de Andar</h1>
          <p className="text-xl text-gray-600">
            Bolos especiais para casamentos e grandes celebrações
          </p>
        </div>

        {/* Aviso Importante */}
        <Card className="mb-8 bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Importante!</h4>
                <p className="text-amber-700 text-sm">
                  Bolos de andar requerem antecedência mínima de 1 semana para produção. 
                  Para eventos especiais como casamentos, recomendamos fazer o pedido com 2-3 semanas de antecedência.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                      placeholder="(24) 99874-7229"
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
                    min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Antecedência mínima de 1 semana
                  </p>
                </div>
              </div>

              {/* Detalhes do Evento */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Detalhes do Evento</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tipoEvento">Tipo de Evento *</Label>
                    <Select onValueChange={(value) => handleInputChange('tipoEvento', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casamento">Casamento</SelectItem>
                        <SelectItem value="noivado">Noivado</SelectItem>
                        <SelectItem value="aniversario">Aniversário</SelectItem>
                        <SelectItem value="batizado">Batizado</SelectItem>
                        <SelectItem value="formatura">Formatura</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="numeroConvidados">Número de Convidados *</Label>
                    <Input
                      id="numeroConvidados"
                      type="number"
                      value={formData.numeroConvidados}
                      onChange={(e) => handleInputChange('numeroConvidados', e.target.value)}
                      required
                      placeholder="Ex: 100"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Detalhes do Bolo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Detalhes do Bolo</h3>
                
                <div>
                  <Label htmlFor="numeroAndares">Número de Andares *</Label>
                  <Select onValueChange={(value) => handleInputChange('numeroAndares', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o número de andares" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Andares</SelectItem>
                      <SelectItem value="3">3 Andares</SelectItem>
                      <SelectItem value="4">4 Andares</SelectItem>
                      <SelectItem value="5+">5 ou mais Andares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sabores">Sabores (por andar) *</Label>
                  <Textarea
                    id="sabores"
                    value={formData.sabores}
                    onChange={(e) => handleInputChange('sabores', e.target.value)}
                    required
                    placeholder="Ex: 1º andar - Chocolate, 2º andar - Baunilha, 3º andar - Red Velvet"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="recheios">Recheios (por andar) *</Label>
                  <Textarea
                    id="recheios"
                    value={formData.recheios}
                    onChange={(e) => handleInputChange('recheios', e.target.value)}
                    required
                    placeholder="Ex: 1º andar - Brigadeiro, 2º andar - Doce de leite, 3º andar - Morango"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="coberturas">Coberturas *</Label>
                  <Input
                    id="coberturas"
                    type="text"
                    value={formData.coberturas}
                    onChange={(e) => handleInputChange('coberturas', e.target.value)}
                    required
                    placeholder="Ex: Fondant, Chantilly, Buttercream..."
                  />
                </div>

                <div>
                  <Label htmlFor="decoracao">Decoração Desejada *</Label>
                  <Textarea
                    id="decoracao"
                    value={formData.decoracao}
                    onChange={(e) => handleInputChange('decoracao', e.target.value)}
                    required
                    placeholder="Descreva detalhadamente: flores, tema, estilo, elementos decorativos..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="cores">Cores Principais *</Label>
                  <Input
                    id="cores"
                    type="text"
                    value={formData.cores}
                    onChange={(e) => handleInputChange('cores', e.target.value)}
                    required
                    placeholder="Ex: Branco e rosa, Azul e dourado..."
                  />
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações Adicionais</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    placeholder="Inspirações, referências, alergias, preferências especiais..."
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

        <div className="mt-8">
          <Card className="bg-pink-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Informações sobre Bolos de Andar:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Preços variam conforme tamanho, decoração e complexidade</li>
                <li>• Estrutura interna profissional para garantir estabilidade</li>
                <li>• Possibilidade de degustação prévia (agendamento necessário)</li>
                <li>• Entrega e montagem no local do evento disponível</li>
                <li>• Orçamento detalhado será enviado após análise do pedido</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Após enviar o pedido, entraremos em contato para agendar uma reunião e definir todos os detalhes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderTieredCakes;

