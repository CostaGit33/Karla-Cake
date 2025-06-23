import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Cookie, MessageCircle } from 'lucide-react';

const OrderSweets = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    dataEntrega: '',
    doces: [],
    quantidade: '',
    observacoes: ''
  });

  const docesDisponiveis = [
    { id: 'brigadeiro', nome: 'Brigadeiro Tradicional', preco: 'R$ 3,00' },
    { id: 'brigadeiro-gourmet', nome: 'Brigadeiro Gourmet', preco: 'R$ 4,00' },
    { id: 'beijinho', nome: 'Beijinho', preco: 'R$ 2,50' },
    { id: 'casadinho', nome: 'Casadinho', preco: 'R$ 3,50' },
    { id: 'olho-sogra', nome: 'Olho de Sogra', preco: 'R$ 3,00' },
    { id: 'quindim', nome: 'Quindim', preco: 'R$ 4,50' },
    { id: 'bem-casado', nome: 'Bem Casado', preco: 'R$ 5,00' },
    { id: 'trufa', nome: 'Trufa', preco: 'R$ 4,50' },
    { id: 'camafeu', nome: 'Camafeu', preco: 'R$ 3,50' },
    { id: 'cajuzinho', nome: 'Cajuzinho', preco: 'R$ 3,00' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDoceChange = (doceId, checked) => {
    setFormData(prev => ({
      ...prev,
      doces: checked 
        ? [...prev.doces, doceId]
        : prev.doces.filter(id => id !== doceId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const docesSelecionados = formData.doces.map(doceId => {
      const doce = docesDisponiveis.find(d => d.id === doceId);
      return `• ${doce.nome} - ${doce.preco}`;
    }).join('\n');

    const message = `🍬 *PEDIDO DE DOCES - KARLA CAKE*

👤 *Cliente:* ${formData.nome}
📱 *Telefone:* ${formData.telefone}
📧 *E-mail:* ${formData.email}
📅 *Data de Entrega:* ${formData.dataEntrega}

🍭 *Doces Selecionados:*
${docesSelecionados}

📦 *Quantidade Total:* ${formData.quantidade} unidades

📝 *Observações:* ${formData.observacoes}

Aguardo retorno para confirmar o pedido e valor total. Obrigado!`;

    const whatsappUrl = `https://wa.me/55998747229?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Cookie className="w-16 h-16 text-pink-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Pedido de Doces</h1>
          <p className="text-xl text-gray-600">
            Escolha seus doces favoritos e faça seu pedido personalizado
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
                    min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Pedidos devem ser feitos com antecedência mínima de 48h
                  </p>
                </div>
              </div>

              {/* Seleção de Doces */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Escolha seus Doces</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {docesDisponiveis.map((doce) => (
                    <div key={doce.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={doce.id}
                        checked={formData.doces.includes(doce.id)}
                        onCheckedChange={(checked) => handleDoceChange(doce.id, checked)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={doce.id} className="cursor-pointer">
                          <div className="font-medium">{doce.nome}</div>
                          <div className="text-sm text-gray-500">{doce.preco} cada</div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <Label htmlFor="quantidade">Quantidade Total Aproximada *</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    value={formData.quantidade}
                    onChange={(e) => handleInputChange('quantidade', e.target.value)}
                    required
                    placeholder="Ex: 50, 100, 200..."
                    min="1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Informe a quantidade total aproximada de doces desejada
                  </p>
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações Adicionais</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    placeholder="Distribuição específica dos doces, embalagem especial, alergia alimentar, etc..."
                    rows={4}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
                disabled={formData.doces.length === 0}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Enviar Pedido pelo WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card className="bg-yellow-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Informações Importantes:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pedido mínimo de 20 unidades</li>
                <li>• Doces são vendidos em múltiplos de 10</li>
                <li>• Embalagens especiais disponíveis (consulte valores)</li>
                <li>• Desconto para pedidos acima de 100 unidades</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Após enviar o pedido, entraremos em contato para confirmar os detalhes e informar o valor total.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSweets;

