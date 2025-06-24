import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cake, MessageCircle } from 'lucide-react';

const tamanhoOptions = [
  { label: "10cm - R$75,00", value: "10cm", price: 75 },
  { label: "12cm - R$100,00", value: "12cm", price: 100 },
  { label: "15cm - R$120,00", value: "15cm", price: 120 },
  { label: "18cm - R$150,00", value: "18cm", price: 150 },
  { label: "20cm - R$185,00", value: "20cm", price: 185 },
  { label: "25cm - R$210,00", value: "25cm", price: 210 }
];

const adicionalOptions = [
  { label: "Nenhum", value: "", price: 0 },
  { label: "Morango in Natura", value: "Morango in Natura", price: 10 },
  { label: "Geleia Morango", value: "Geleia Morango", price: 10 },
  { label: "Abacaxi", value: "Abacaxi", price: 10 },
  { label: "Ameixa", value: "Ameixa", price: 10 },
  { label: "Nutella", value: "Nutella", price: 10 }
];

const recheioOptions = [
  { label: "Brigadeiro", value: "Brigadeiro" },
  { label: "Doce de Leite", value: "Doce de Leite" },
  { label: "Nutella", value: "Nutella" },
  { label: "Morango com Chantilly", value: "Morango com Chantilly" },
  { label: "Beijinho", value: "Beijinho" },
  { label: "Frutas Vermelhas", value: "Frutas Vermelhas" },
  { label: "Outro", value: "Outro" }
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const OrderCakes = () => {
  const [formData, setFormData] = useState({
    nomeCliente: '',
    telefone: '',
    entrada: '',
    dataEntrega: '',
    arte: '',
    tamanho: '',
    recheio1: '',
    recheio2: '',
    adicional: '',
    observacoes: ''
  });

  const [valorBolo, setValorBolo] = useState(0);
  const [valorAdicional, setValorAdicional] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setFormErrors(prev => ({
      ...prev,
      [field]: undefined
    }));
  };

  useEffect(() => {
    const selectedTamanho = tamanhoOptions.find(opt => opt.value === formData.tamanho);
    const selectedAdicional = adicionalOptions.find(opt => opt.value === formData.adicional);

    const precoTamanho = selectedTamanho ? selectedTamanho.price : 0;
    const precoAdicional = selectedAdicional ? selectedAdicional.price : 0;
    const precoTotal = precoTamanho + precoAdicional;

    setValorBolo(precoTamanho);
    setValorAdicional(precoAdicional);
    setValorTotal(precoTotal);
  }, [formData.tamanho, formData.adicional]);

  const validateForm = () => {
    const errors = {};

    if (!formData.nomeCliente) errors.nomeCliente = "Nome é obrigatório.";
    if (!formData.telefone || formData.telefone.length < 10) errors.telefone = "Telefone inválido.";
    if (!formData.dataEntrega) errors.dataEntrega = "Data de entrega obrigatória.";
    if (!formData.arte) errors.arte = "Arte/Tema obrigatório.";
    if (!formData.tamanho) errors.tamanho = "Tamanho obrigatório.";
    if (!formData.recheio1) errors.recheio1 = "Recheio 1 obrigatório.";
    if (!formData.recheio2) errors.recheio2 = "Recheio 2 obrigatório.";

    const entradaNumber = parseFloat(formData.entrada);
    if (isNaN(entradaNumber) || entradaNumber < 0) errors.entrada = "Entrada deve ser um número válido.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = `🧁 *PEDIDO DE BOLO - KARLA CAKE*

👤 *Cliente:* ${formData.nomeCliente}
📱 *Telefone:* ${formData.telefone}
📅 *Data de Entrega:* ${formData.dataEntrega}

🎨 *Arte/Tema:* ${formData.arte}
🎂 *Tamanho:* ${formData.tamanho}
🍫 *Recheio 1:* ${formData.recheio1}
🍫 *Recheio 2:* ${formData.recheio2}
✨ *Adicional:* ${formData.adicional || 'Nenhum'}

💵 *Valor do Bolo:* ${formatCurrency(valorBolo)}
💵 *Valor Adicional:* ${formatCurrency(valorAdicional)}
💵 *Valor Total:* ${formatCurrency(valorTotal)}
💰 *Entrada:* ${formData.entrada}

📝 *Observações:* ${formData.observacoes || 'Nenhuma'}

Aguardo confirmação.`;

    const whatsappUrl = `https://wa.me/5524998747229?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Pedido de Bolo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nome do Cliente *</Label>
              <Input value={formData.nomeCliente} onChange={(e) => handleInputChange('nomeCliente', e.target.value)} />
              {formErrors.nomeCliente && <p className="text-red-500">{formErrors.nomeCliente}</p>}
            </div>

            <div>
              <Label>Telefone *</Label>
              <Input value={formData.telefone} onChange={(e) => handleInputChange('telefone', e.target.value)} />
              {formErrors.telefone && <p className="text-red-500">{formErrors.telefone}</p>}
            </div>

            <div>
              <Label>Entrada (R$) *</Label>
              <Input type="number" value={formData.entrada} onChange={(e) => handleInputChange('entrada', e.target.value)} />
              {formErrors.entrada && <p className="text-red-500">{formErrors.entrada}</p>}
            </div>

            <div>
              <Label>Data de Entrega *</Label>
              <Input type="date" value={formData.dataEntrega} onChange={(e) => handleInputChange('dataEntrega', e.target.value)} />
              {formErrors.dataEntrega && <p className="text-red-500">{formErrors.dataEntrega}</p>}
            </div>

            <div>
              <Label>Arte/Tema *</Label>
              <Input value={formData.arte} onChange={(e) => handleInputChange('arte', e.target.value)} />
              {formErrors.arte && <p className="text-red-500">{formErrors.arte}</p>}
            </div>

            <div>
              <Label>Tamanho *</Label>
              <Select onValueChange={(value) => handleInputChange('tamanho', value)} value={formData.tamanho}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  {tamanhoOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.tamanho && <p className="text-red-500">{formErrors.tamanho}</p>}
            </div>

            <div>
              <Label>Recheio 1 *</Label>
              <Select onValueChange={(value) => handleInputChange('recheio1', value)} value={formData.recheio1}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o recheio 1" />
                </SelectTrigger>
                <SelectContent>
                  {recheioOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.recheio1 && <p className="text-red-500">{formErrors.recheio1}</p>}
            </div>

            <div>
              <Label>Recheio 2 *</Label>
              <Select onValueChange={(value) => handleInputChange('recheio2', value)} value={formData.recheio2}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o recheio 2" />
                </SelectTrigger>
                <SelectContent>
                  {recheioOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.recheio2 && <p className="text-red-500">{formErrors.recheio2}</p>}
            </div>

            <div>
              <Label>Adicional</Label>
              <Select onValueChange={(value) => handleInputChange('adicional', value)} value={formData.adicional}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione adicional" />
                </SelectTrigger>
                <SelectContent>
                  {adicionalOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Observações</Label>
              <Textarea rows={3} value={formData.observacoes} onChange={(e) => handleInputChange('observacoes', e.target.value)} />
            </div>

            <div className="border-t pt-4">
              <p><strong>Valor Bolo:</strong> {formatCurrency(valorBolo)}</p>
              <p><strong>Adicional:</strong> {formatCurrency(valorAdicional)}</p>
              <p><strong>Total Estimado:</strong> {formatCurrency(valorTotal)}</p>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <MessageCircle className="w-5 h-5 mr-2" /> Enviar Pedido por WhatsApp
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderCakes;
