# Karla Cake - Confeitaria Online

Uma aplicação web moderna e responsiva desenvolvida em React para a confeitaria "Karla Cake", especializada em bolos, doces e bolos de andar personalizados.

## 🎂 Sobre o Projeto

O projeto Karla Cake é uma plataforma web focada no usuário que permite aos clientes:

- Visualizar um catálogo completo de produtos
- Fazer pedidos personalizados para diferentes tipos de produtos
- Entrar em contato direto com a confeitaria via WhatsApp e Instagram
- Acessar informações detalhadas sobre produtos e serviços

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção da interface
- **React Router DOM** - Roteamento entre páginas
- **Tailwind CSS** - Framework CSS para estilização
- **Shadcn/UI** - Componentes de interface pré-construídos
- **Lucide React** - Ícones modernos
- **Vite** - Ferramenta de build e desenvolvimento

## 📱 Funcionalidades

### Páginas Principais

1. **Página Inicial (Home)**
   - Apresentação da confeitaria
   - Visão geral dos produtos
   - Depoimentos de clientes
   - Call-to-actions para navegação

2. **Catálogo**
   - Produtos organizados por categoria
   - Informações de preços
   - Links diretos para pedidos

3. **Páginas de Pedidos**
   - **Bolos Personalizados**: Formulário completo com opções de sabor, recheio, cobertura e tamanho
   - **Doces Artesanais**: Seleção múltipla de doces com quantidades
   - **Bolos de Andar**: Formulário especializado para eventos especiais

4. **Contato**
   - Informações de contato
   - Links para WhatsApp e Instagram
   - Horários de funcionamento
   - Localização

### Recursos Especiais

- **Integração WhatsApp**: Pedidos são enviados diretamente via WhatsApp com formatação automática
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Validação de Formulários**: Campos obrigatórios e validações de data
- **Interface Intuitiva**: Design moderno com cores temáticas da confeitaria

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou pnpm

### Passos para Execução

1. **Clone ou acesse o diretório do projeto**
   ```bash
   cd karla-cake
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```

4. **Acesse a aplicação**
   - Abra o navegador em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
karla-cake/
├── public/                 # Arquivos públicos
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── layout/        # Componentes de layout (Header, Footer, Layout)
│   │   └── ui/            # Componentes UI do shadcn
│   ├── pages/             # Páginas da aplicação
│   │   ├── Home.jsx       # Página inicial
│   │   ├── Catalog.jsx    # Catálogo de produtos
│   │   ├── Contact.jsx    # Página de contato
│   │   ├── OrderCakes.jsx # Pedidos de bolos
│   │   ├── OrderSweets.jsx # Pedidos de doces
│   │   └── OrderTieredCakes.jsx # Pedidos de bolos de andar
│   ├── App.jsx            # Componente principal com rotas
│   ├── App.css            # Estilos globais
│   └── main.jsx           # Ponto de entrada
├── package.json           # Dependências e scripts
└── README.md             # Documentação
```

## 🎨 Personalização

### Cores e Tema

O projeto utiliza um esquema de cores baseado em tons de rosa para refletir a identidade da confeitaria:

- **Rosa Principal**: `#db2777` (pink-600)
- **Rosa Hover**: `#be185d` (pink-700)
- **Rosa Claro**: `#fdf2f8` (pink-50)

### Contatos e Redes Sociais

Para personalizar os links de contato, edite os seguintes arquivos:

- `src/components/layout/Footer.jsx` - Links no rodapé
- `src/pages/Contact.jsx` - Página de contato
- Formulários de pedido - Links do WhatsApp

### Produtos e Preços

Para atualizar o catálogo de produtos:

- Edite o arquivo `src/pages/Catalog.jsx`
- Modifique o objeto `products` com novos itens, preços e descrições

## 📱 Integração WhatsApp

Os formulários de pedido geram automaticamente mensagens formatadas para WhatsApp. Para personalizar:

1. **Número do WhatsApp**: Altere `5573999999999` nos arquivos de pedido
2. **Formato da Mensagem**: Modifique a variável `message` em cada página de pedido

## 🚀 Deploy

### Opções de Deploy

1. **Vercel** (Recomendado)
   ```bash
   npm run build
   # Faça upload da pasta dist/
   ```

2. **Netlify**
   ```bash
   npm run build
   # Faça upload da pasta dist/
   ```

3. **GitHub Pages**
   ```bash
   npm run build
   # Configure o GitHub Pages para usar a pasta dist/
   ```

## 📞 Suporte

Para dúvidas sobre o projeto ou personalizações:

- **WhatsApp**: (73) 99999-9999
- **E-mail**: contato@karlacake.com
- **Instagram**: @karlacake

## 📄 Licença

Este projeto foi desenvolvido especificamente para a Karla Cake. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a Karla Cake**

