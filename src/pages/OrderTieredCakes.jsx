import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MessageCircle, AlertCircle } from 'lucide-react';

const eventoOptions = [
  "Casamento",
  "Noivado",
  "Aniversário",
  "Batizado",
  "Formatura",
  "Outro"
];

const andaresOptions = [
  "2 Andares",
  "3 Andares",
  "4 Andares",
  "5 ou mais Andares"
];

const OrderTieredCakes = () => {
  const [formData, setFormData] = useState({
    nomeCliente: '',
    telefone: '',
    dataEntrega: '',
    tipoEvento: '',
    numeroConvidados: '',
    numeroAndares: '',
    sabores: '',
    recheios: '',
    coberturas: '',
    decoracao: '',
    cores: '',
    observacoes: ''
  });

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

  const validateForm = () => {
    const errors = {};

    if (!formData.nomeCliente) errors.nomeCliente = "Nome é obrigatório.";
    if (!formData.telefone || formData.telefone.length < 10) errors.telefone = "Telefone inválido.";
    if (!formData.dataEntrega) errors.dataEntrega = "Data de entrega obrigatória.";
    if (!formData.tipoEvento) errors.tipoEvento = "Tipo de evento obrigatório.";
    if (!formData.numeroConvidados) errors.numeroConvidados = "Número de convidados obrigatório.";
    if (!formData.numeroAndares) errors.numeroAndares = "Número de andares obrigatório.";
    if (!formData.sabores) errors.sabores = "Sabores obrigatórios.";
    if (!formData.recheios) errors.recheios = "Recheios obrigatórios.";
    if (!formData.coberturas) errors.coberturas = "Coberturas obrigatórias.";
    if (!formData.decoracao) errors.decoracao = "Decoração obrigatória.";
    if (!formData.cores) errors.cores = "Cores obrigatórias.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = `🎂 *PEDIDO DE BOLO DE ANDAR - KARLA CAKE*

👤 *Cliente:* ${formData.nomeCliente}
📱 *Telefone:* ${formData.telefone}
📅 *Data de Entrega:* ${formData.dataEntrega}

🎉 *Evento:* ${formData.tipoEvento}
👥 *Convidados:* ${formData.numeroConvidados}
🏛️ *Número de Andares:* ${formData.numeroAndares}

🍰 *Sabores por andar:*
${formData.sabores}

🥄 *Recheios por andar:*
${formData.recheios}

🍥 *Coberturas:* ${formData.coberturas}
🌸 *Decoração:* ${formData.decoracao}
🎨 *Cores:* ${formData.cores}

📝 *Observações:* ${formData.observacoes || 'Nenhuma'}

Aguardo confirmação para orçamento detalhado.`;

    const whatsappUrl = `https://wa.me/5524998747229?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    // Define data mínima de entrega (1 semana a partir de hoje)
    const hoje = new Date();
    hoje.setDate(hoje.getDate() + 7);
    document.getElementById('dataEntrega').min = hoje.toISOString().split('T')[0];
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Pedido de Bolo de Andar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nome Cliente */}
            <div>
              <Label>Nome do Cliente *</Label>
              <Input value={formData.nomeCliente} onChange={(e) => handleInputChange('nomeCliente', e.target.value)} />
              {formErrors.nomeCliente && <p className="text-red-500">{formErrors.nomeCliente}</p>}
            </div>

            {/* Telefone */}
            <div>
              <Label>Telefone *</Label>
              <Input value={formData.telefone} onChange={(e) => handleInputChange('telefone', e.target.value)} />
              {formErrors.telefone && <p className="text-red-500">{formErrors.telefone}</p>}
            </div>

            {/* Data de Entrega */}
            <div>
              <Label>Data de Entrega *</Label>
              <Input id="dataEntrega" type="date" value={formData.dataEntrega} onChange={(e) => handleInputChange('dataEntrega', e.target.value)} />
              {formErrors.dataEntrega && <p className="text-red-500">{formErrors.dataEntrega}</p>}
            </div>

            {/* Tipo de Evento */}
            <div>
              <Label>Tipo de Evento *</Label>
              <Select onValueChange={(value) => handleInputChange('tipoEvento', value)} value={formData.tipoEvento}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o tipo de evento" />
                </SelectTrigger>
                <SelectContent>
                  {eventoOptions.map(evento => (
                    <SelectItem key={evento} value={evento}>{evento}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.tipoEvento && <p className="text-red-500">{formErrors.tipoEvento}</p>}
            </div>

            {/* Número de Convidados */}
            <div>
              <Label>Número de Convidados *</Label>
              <Input type="number" value={formData.numeroConvidados} onChange={(e) => handleInputChange('numeroConvidados', e.target.value)} />
              {formErrors.numeroConvidados && <p className="text-red-500">{formErrors.numeroConvidados}</p>}
            </div>

            {/* Número de Andares */}
            <div>
              <Label>Número de Andares *</Label>
              <Select onValueChange={(value) => handleInputChange('numeroAndares', value)} value={formData.numeroAndares}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o número de andares" />
                </SelectTrigger>
                <SelectContent>
                  {andaresOptions.map(op => (
                    <SelectItem key={op} value={op}>{op}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.numeroAndares && <p className="text-red-500">{formErrors.numeroAndares}</p>}
            </div>

            {/* Sabores */}
            <div>
              <Label>Sabores por andar *</Label>
              <Textarea rows={3} value={formData.sabores} onChange={(e) => handleInputChange('sabores', e.target.value)} />
              {formErrors.sabores && <p className="text-red-500">{formErrors.sabores}</p>}
            </div>

            {/* Recheios */}
            <div>
              <Label>Recheios por andar *</Label>
              <Textarea rows={3} value={formData.recheios} onChange={(e) => handleInputChange('recheios', e.target.value)} />
              {formErrors.recheios && <p className="text-red-500">{formErrors.recheios}</p>}
            </div>

            {/* Coberturas */}
            <div>
              <Label>Coberturas *</Label>
              <Input value={formData.coberturas} onChange={(e) => handleInputChange('coberturas', e.target.value)} />
              {formErrors.coberturas && <p className="text-red-500">{formErrors.coberturas}</p>}
            </div>

            {/* Decoração */}
            <div>
              <Label>Decoração *</Label>
              <Textarea rows={3} value={formData.decoracao} onChange={(e) => handleInputChange('decoracao', e.target.value)} />
              {formErrors.decoracao && <p className="text-red-500">{formErrors.decoracao}</p>}
            </div>

            {/* Cores */}
            <div>
              <Label>Cores Principais *</Label>
              <Input value={formData.cores} onChange={(e) => handleInputChange('cores', e.target.value)} />
              {formErrors.cores && <p className="text-red-500">{formErrors.cores}</p>}
            </div>

            {/* Observações */}
            <div>
              <Label>Observações</Label>
              <Textarea rows={3} value={formData.observacoes} onChange={(e) => handleInputChange('observacoes', e.target.value)} />
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

export default OrderTieredCakes;
