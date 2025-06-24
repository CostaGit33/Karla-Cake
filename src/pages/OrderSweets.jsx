import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Cookie } from 'lucide-react';

const quantidadeSaboresOptions = [
  { label: "1 Sabor (100 unidades)", value: "1", divisao: [100] },
  { label: "2 Sabores (50/50)", value: "2", divisao: [50, 50] },
  { label: "3 Sabores (40/30/30)", value: "3", divisao: [40, 30, 30] },
  { label: "4 Sabores (25/25/25/25)", value: "4", divisao: [25, 25, 25, 25] }
];

const saboresDoces = [
  "Brigadeiro Chocolate",
  "Brigadeiro Branco",
  "Ninho com Chocolate",
  "Surpresa de Uva",
  "Coco Queimado",
  "Prestígio",
  "Casadinho",
  "Cajuzinho",
  "Ninho",
  "Nesquik",
  "Ferrero",
  "Beijinho"
];

const OrderSweets = () => {
  const [formData, setFormData] = useState({
    nomeCliente: '',
    dataEntrega: '',
    quantidadeSabores: '',
    saboresSelecionados: [],
    observacoes: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const precoTotal = 150.00;

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
    if (formData.quantidadeSabores) {
      setFormData(prev => ({
        ...prev,
        saboresSelecionados: Array.from({ length: parseInt(formData.quantidadeSabores) }, () => '')
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        saboresSelecionados: []
      }));
    }
  }, [formData.quantidadeSabores]);

  const validateForm = () => {
    const errors = {};
    if (!formData.nomeCliente) errors.nomeCliente = "Nome é obrigatório.";
    if (!formData.dataEntrega) errors.dataEntrega = "Data de entrega obrigatória.";
    if (!formData.quantidadeSabores) errors.quantidadeSabores = "Selecione a quantidade de sabores.";

    formData.saboresSelecionados.forEach((sabor, index) => {
      if (!sabor) errors[`sabor${index}`] = `Selecione o sabor ${index + 1}.`;
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const divisao = quantidadeSaboresOptions.find(opt => opt.value === formData.quantidadeSabores)?.divisao || [];

    let resumoSabores = '';
    formData.saboresSelecionados.forEach((sabor, index) => {
      resumoSabores += `• ${sabor}: ${divisao[index]} unidades\n`;
    });

    const message = `🍬 *PEDIDO DE DOCES - KARLA CAKE*

👤 *Cliente:* ${formData.nomeCliente}
📅 *Data de Entrega:* ${formData.dataEntrega}

🍭 *Sabores Escolhidos:*
${resumoSabores}

💰 *Valor Total:* R$ ${precoTotal.toFixed(2)}

📝 *Observações:* ${formData.observacoes || 'Nenhuma'}

Aguardo confirmação.`;

    const whatsappUrl = `https://wa.me/5573981292670?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Pedido de Doces</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <Label>Nome do Cliente *</Label>
              <Input
                value={formData.nomeCliente}
                onChange={(e) => handleInputChange('nomeCliente', e.target.value)}
              />
              {formErrors.nomeCliente && <p className="text-red-500">{formErrors.nomeCliente}</p>}
            </div>

            {/* Data de Entrega */}
            <div>
              <Label>Data de Entrega *</Label>
              <Input
                type="date"
                value={formData.dataEntrega}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('dataEntrega', e.target.value)}
              />
              {formErrors.dataEntrega && <p className="text-red-500">{formErrors.dataEntrega}</p>}
            </div>

            {/* Quantidade de Sabores */}
            <div>
              <Label>Quantidade de Sabores *</Label>
              <Select
                value={formData.quantidadeSabores}
                onValueChange={(value) => handleInputChange('quantidadeSabores', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a quantidade de sabores" />
                </SelectTrigger>
                <SelectContent>
                  {quantidadeSaboresOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.quantidadeSabores && <p className="text-red-500">{formErrors.quantidadeSabores}</p>}
            </div>

            {/* Seleção de Sabores */}
            {formData.saboresSelecionados.map((_, index) => (
              <div key={index}>
                <Label>Sabor {index + 1} *</Label>
                <Select
                  value={formData.saboresSelecionados[index]}
                  onValueChange={(value) => {
                    const newSabores = [...formData.saboresSelecionados];
                    newSabores[index] = value;
                    handleInputChange('saboresSelecionados', newSabores);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Selecione o sabor ${index + 1}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {saboresDoces.map((sabor) => (
                      <SelectItem key={sabor} value={sabor}>{sabor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors[`sabor${index}`] && <p className="text-red-500">{formErrors[`sabor${index}`]}</p>}
              </div>
            ))}

            {/* Observações */}
            <div>
              <Label>Observações</Label>
              <Textarea
                rows={3}
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
              />
            </div>

            {/* Resumo de Preço */}
            <div className="border-t pt-4">
              <p><strong>Valor Total:</strong> R$ {precoTotal.toFixed(2)}</p>
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

export default OrderSweets;
