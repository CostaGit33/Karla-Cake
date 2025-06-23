import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cake, MessageCircle, Image as ImageIcon, Loader2 } from 'lucide-react';

// --- DEFINIÇÃO DAS OPÇÕES DE PRODUTO E PREÇOS ---
const tamanhoOptions = [
  { label: "10cm - R$75,00 (8 fatias)", value: "10cm", price: 75 },
  { label: "12cm - R$100,00 (10 fatias)", value: "12cm", price: 100 },
  { label: "15cm - R$120,00 (12 fatias)", value: "15cm", price: 120 },
  { label: "18cm - R$150,00 (15 fatias)", value: "18cm", price: 150 },
  { label: "20cm - R$185,00 (20 fatias)", value: "20cm", price: 185 },
  { label: "25cm - R$210,00 (25 fatias)", value: "25cm", price: 210 }
];

const saborOptions = [
  { label: "Chocolate", value: "chocolate" },
  { label: "Baunilha", value: "baunilha" },
  { label: "Morango", value: "morango" },
  { label: "Red Velvet", value: "red-velvet" },
  { label: "Cenoura", value: "cenoura" },
  { label: "Limão", value: "limao" },
  { label: "Coco", value: "coco" },
  { label: "Outro (especificar nas observações)", value: "outro" }
];

const recheioOptions = [
  { label: "Brigadeiro", value: "brigadeiro" },
  { label: "Doce de Leite", value: "doce-leite" },
  { label: "Nutella", value: "nutella" },
  { label: "Morango com Chantilly", value: "morango-chantilly" },
  { label: "Beijinho", value: "beijinho" },
  { label: "Frutas Vermelhas", value: "frutas-vermelhas" },
  { label: "Outro (especificar nas observações)", value: "outro" }
];

const coberturaOptions = [
  { label: "Chantilly", value: "chantilly" },
  { label: "Ganache", value: "ganache" },
  { label: "Buttercream", value: "buttercream" },
  { label: "Fondant", value: "fondant" },
  { label: "Glacê", value: "glace" },
  { label: "Outro (especificar nas observações)", value: "outro" }
];

const adicionalOptions = [
  { label: "Nenhum", value: "", price: 0 },
  { label: "Morango in Natura", value: "morango-in-natura", price: 10 },
  { label: "Geleia de Morango", value: "geleia-morango", price: 10 },
  { label: "Abacaxi", value: "abacaxi", price: 10 },
  { label: "Ameixa", value: "ameixa", price: 10 },
  { label: "Nutella", value: "nutella-adicional", price: 10 }
];

// --- ESQUEMA DE VALIDAÇÃO COM ZOD ---
const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório."),
  telefone: z.string().min(10, "Telefone é obrigatório e deve ter pelo menos 10 dígitos.").max(15, "Telefone muito longo."),
  email: z.string().email("E-mail inválido.").optional().or(z.literal('')),
  dataEntrega: z.string().min(1, "Data de entrega é obrigatória.").refine(
    (date) => new Date(date) >= new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    "Pedidos devem ser feitos com antecedência mínima de 48h."
  ),
  sabor: z.string().min(1, "Sabor é obrigatório."),
  recheio: z.string().min(1, "Recheio é obrigatório."),
  cobertura: z.string().min(1, "Cobertura é obrigatória."),
  tamanho: z.string().min(1, "Tamanho é obrigatório."),
  adicional: z.string().optional().or(z.literal('')), // Adicional agora é um campo do formulário
  decoracao: z.string().optional().or(z.literal('')),
  observacoes: z.string().optional().or(z.literal('')),
});

// --- FUNÇÃO DE FORMATAÇÃO DE MOEDA ---
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const OrderCakes = () => {
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      telefone: '',
      email: '',
      dataEntrega: '',
      sabor: '',
      recheio: '',
      cobertura: '',
      tamanho: '',
      adicional: '', // Adicional agora faz parte dos defaultValues
      decoracao: '',
      observacoes: ''
    }
  });

  // Observa as mudanças nos campos de tamanho e adicional para recalcular o preço
  const watchedTamanho = watch('tamanho');
  const watchedAdicional = watch('adicional');

  const [valorBolo, setValorBolo] = useState(0);
  const [valorAdicional, setValorAdicional] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  // --- NOVOS ESTADOS PARA A IA ---
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [imageError, setImageError] = useState(null);
  // --- FIM NOVOS ESTADOS ---

  // Efeito para recalcular preços sempre que tamanho ou adicional mudarem
  useEffect(() => {
    const selectedTamanho = tamanhoOptions.find(opt => opt.value === watchedTamanho);
    const selectedAdicional = adicionalOptions.find(opt => opt.value === watchedAdicional);

    const precoTamanho = selectedTamanho ? selectedTamanho.price : 0;
    const precoAdicional = selectedAdicional ? selectedAdicional.price : 0;
    const precoTotal = precoTamanho + precoAdicional;

    setValorBolo(precoTamanho);
    setValorAdicional(precoAdicional);
    setValorTotal(precoTotal);
  }, [watchedTamanho, watchedAdicional]);


  // --- FUNÇÃO: CONSTRÓI O PROMPT PARA A IA ---
  const buildPrompt = (data) => {
    let prompt = `Um bolo de aniversário realista e de alta qualidade.`;

    if (data.sabor) prompt += ` Sabor: ${data.sabor}.`;
    if (data.recheio) prompt += ` Recheio: ${data.recheio}.`;
    if (data.cobertura) prompt += ` Cobertura: ${data.cobertura}.`;

    // Mapear tamanho para andares ou descrição mais detalhada para a IA
    let andares = '';
    switch (data.tamanho) {
      case '10cm': andares = '1 andar, pequeno'; break;
      case '12cm': andares = '1 andar, pequeno'; break;
      case '15cm': andares = '1 andar, médio'; break;
      case '18cm': andares = '1 andar, médio'; break;
      case '20cm': andares = '1 ou 2 andares, grande'; break;
      case '25cm': andares = '2 ou 3 andares, grande'; break;
      default: andares = '1 andar'; // Padrão
    }
    if (andares) prompt += ` Tamanho: ${andares}.`;

    if (data.decoracao) prompt += ` Decoração: ${data.decoracao}.`;
    if (data.adicional) prompt += ` Adicional: ${adicionalOptions.find(opt => opt.value === data.adicional)?.label}.`;
    if (data.observacoes) prompt += ` Observações: ${data.observacoes}.`;

    // Termos para melhorar a qualidade da imagem gerada
    prompt += ` Renderização fotorrealista, iluminação de estúdio, fundo branco simples, sem texto na imagem.`;

    return prompt;
  };
  // --- FIM NOVA FUNÇÃO ---

  // --- NOVA FUNÇÃO: CHAMA A API DA IA ---
  const generateCakeImage = async () => {
    setIsLoadingImage(true);
    setImageError(null);
    setGeneratedImageUrl(null); // Limpa a imagem anterior

    const currentFormData = watch(); // Pega os dados atuais do formulário
    const prompt = buildPrompt(currentFormData);
    console.log("Prompt gerado para IA:", prompt);

    try {
      // ATENÇÃO: ESTE É UM EXEMPLO DE CHAMADA À API DA OPENAI (DALL-E).
      // VOCÊ DEVE SUBSTITUIR PELA API DA IA QUE ESCOLHER.
      // E, MAIS IMPORTANTE, NUNCA EXPOR SUA CHAVE API DIRETAMENTE NO FRONTEND.
      // O IDEAL É FAZER ESSA CHAMADA ATRAVÉS DE UM BACKEND SEU.

      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Substitua 'SUA_CHAVE_API_OPENAI' pela sua chave real.
          // Lembre-se: ISSO É INSEGURO PARA PRODUÇÃO. Use um backend!
          'Authorization': `Bearer SUA_CHAVE_API_OPENAI`,
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1, // Gerar 1 imagem
          size: "1024x1024", // Tamanho da imagem
        } ),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro da API da IA:", errorData);
        throw new Error(errorData.error.message || 'Falha ao gerar imagem. Verifique os detalhes do bolo.');
      }

      const data = await response.json();
      setGeneratedImageUrl(data.data[0].url); // A URL da imagem gerada
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
      setImageError("Não foi possível gerar o pré-molde. Tente novamente ou ajuste os detalhes.");
    } finally {
      setIsLoadingImage(false);
    }
  };
  // --- FIM NOVA FUNÇÃO ---


  // Função chamada ao submeter o formulário (após validação bem-sucedida)
  const onSubmit = (data) => {
    const message = `🧁 *PEDIDO DE BOLO - KARLA CAKE*

👤 *Cliente:* ${data.nome}
📱 *Telefone:* ${data.telefone}
📧 *E-mail:* ${data.email || 'Não informado'}
📅 *Data de Entrega:* ${data.dataEntrega}

🎂 *Detalhes do Bolo:*
• Sabor: ${saborOptions.find(opt => opt.value === data.sabor)?.label}
• Recheio: ${recheioOptions.find(opt => opt.value === data.recheio)?.label}
• Cobertura: ${coberturaOptions.find(opt => opt.value === data.cobertura)?.label}
• Tamanho: ${tamanhoOptions.find(opt => opt.value === data.tamanho)?.label}
• Adicional: ${data.adicional ? adicionalOptions.find(opt => opt.value === data.adicional)?.label : 'Nenhum'}
• Decoração: ${data.decoracao || 'Não especificada'}

💰 *Resumo do Pedido:*
• Valor do Bolo: ${formatCurrency(valorBolo)}
• Valor Adicional: ${formatCurrency(valorAdicional)}
• *Valor Total Estimado:* ${formatCurrency(valorTotal)}

📝 *Observações:* ${data.observacoes || 'Nenhuma'}

${generatedImageUrl ? `🖼️ *Pré-molde gerado por IA:* ${generatedImageUrl}` : ''}

Aguardo retorno para confirmar o pedido e valor. Obrigado!`;

    const whatsappUrl = `https://wa.me/5524998747229?text=${encodeURIComponent(message )}`;
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Dados do Cliente */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Dados do Cliente</h3>
                
                <div>
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    type="text"
                    {...register('nome')}
                    placeholder="Seu nome completo"
                  />
                  {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone">WhatsApp *</Label>
                    <Input
                      id="telefone"
                      type="tel"
                      {...register('telefone')}
                      placeholder="(24) 99874-7229"
                    />
                    {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="seu@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="dataEntrega">Data de Entrega *</Label>
                  <Input
                    id="dataEntrega"
                    type="date"
                    {...register('dataEntrega')}
                    min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Pedidos devem ser feitos com antecedência mínima de 48h
                  </p>
                  {errors.dataEntrega && <p className="text-red-500 text-sm mt-1">{errors.dataEntrega.message}</p>}
                </div>
              </div>

              {/* Detalhes do Bolo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Detalhes do Bolo</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sabor">Sabor *</Label>
                    <Controller
                      name="sabor"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha o sabor" />
                          </SelectTrigger>
                          <SelectContent>
                            {saborOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.sabor && <p className="text-red-500 text-sm mt-1">{errors.sabor.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="recheio">Recheio *</Label>
                    <Controller
                      name="recheio"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha o recheio" />
                          </SelectTrigger>
                          <SelectContent>
                            {recheioOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.recheio && <p className="text-red-500 text-sm mt-1">{errors.recheio.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cobertura">Cobertura *</Label>
                    <Controller
                      name="cobertura"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha a cobertura" />
                          </SelectTrigger>
                          <SelectContent>
                            {coberturaOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.cobertura && <p className="text-red-500 text-sm mt-1">{errors.cobertura.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="tamanho">Tamanho *</Label>
                    <Controller
                      name="tamanho"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha o tamanho" />
                          </SelectTrigger>
                          <SelectContent>
                            {tamanhoOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.tamanho && <p className="text-red-500 text-sm mt-1">{errors.tamanho.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="adicional">Adicional (Opcional)</Label>
                  <Controller
                      name="adicional"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um adicional" />
                          </SelectTrigger>
                          <SelectContent>
                            {adicionalOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                </div>

                <div>
                  <Label htmlFor="decoracao">Decoração</Label>
                  <Input
                    id="decoracao"
                    type="text"
                    {...register('decoracao')}
                    placeholder="Ex: Flores de açúcar, tema infantil, cores específicas..."
                  />
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações Adicionais</Label>
                  <Textarea
                    id="observacoes"
                    {...register('observacoes')}
                    placeholder="Alguma informação adicional, alergia alimentar, preferências especiais..."
                    rows={4}
                  />
                </div>
              </div>

              {/* --- SEÇÃO DE RESUMO DE PREÇOS --- */}
              <div className="space-y-4 border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Resumo do Pedido</h3>
                <div className="grid grid-cols-2 gap-2 text-lg">
                  <p className="font-medium">Valor do Bolo:</p>
                  <p className="text-right">{formatCurrency(valorBolo)}</p>
                  <p className="font-medium">Valor Adicional:</p>
                  <p className="text-right">{formatCurrency(valorAdicional)}</p>
                  <p className="font-bold text-xl border-t pt-2">Valor Total Estimado:</p>
                  <p className="font-bold text-xl text-right border-t pt-2">{formatCurrency(valorTotal)}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Este é um valor estimado. O valor final será confirmado após análise do pedido.
                </p>
              </div>
              {/* --- FIM SEÇÃO DE RESUMO DE PREÇOS --- */}

              {/* --- SEÇÃO: PRÉ-MOLDE COM IA --- */}
              <div className="space-y-4 border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Pré-Molde do Bolo (IA)</h3>
                <p className="text-sm text-gray-600">
                  Gere uma pré-visualização do seu bolo com base nas características escolhidas.
                </p>
                <Button 
                  type="button" // Importante: type="button" para não submeter o formulário
                  onClick={generateCakeImage} 
                  disabled={isLoadingImage} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {isLoadingImage ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Gerando Imagem...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5 mr-2" />
                      Gerar Pré-Molde
                    </>
                  )}
                </Button>

                {imageError && (
                  <p className="text-red-500 text-center mt-4">{imageError}</p>
                )}

                {generatedImageUrl && (
                  <div className="mt-6 text-center">
                    <h4 className="text-md font-semibold mb-2">Seu Pré-Molde:</h4>
                    <img 
                      src={generatedImageUrl} 
                      alt="Pré-molde do bolo gerado por IA" 
                      className="max-w-full h-auto mx-auto rounded-lg shadow-lg border border-gray-200" 
                      style={{ maxWidth: '400px' }} // Limita o tamanho da imagem na tela
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Esta é uma sugestão visual gerada por IA. O bolo final pode ter variações.
                    </p>
                  </div>
                )}
              </div>
              {/* --- FIM SEÇÃO --- */}

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
