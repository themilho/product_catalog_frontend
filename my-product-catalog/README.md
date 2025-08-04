# 🛍️ Catálogo de Produtos - Frontend

Uma aplicação de catálogo de produtos construída com Next.js, TypeScript e Tailwind CSS. Permite aos usuários navegar, criar, editar e favoritar produtos.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React Context** - Gerenciamento de estado global
- **Fetch API** - Comunicação com backend

## 📋 Pré-requisitos

- Node.js instalado
- npm, yarn, pnpm ou bun
- Backend da aplicação rodando (porta 3002)

## 🛠️ Instalação e Execução

### 1. Instalar dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Executar em modo de desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### 3. Acessar a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura de Pastas

```
src/
├── app/                    # App Router do Next.js
│   ├── edit/              # Pasta de edição
│   │   └── [id]/          # Página de edição de produto dinâmica
│   │       └── page.tsx   # Página de edição
│   ├── new/               # Pasta de criação
│   │   └── page.tsx       # Página de criação de produto
│   ├── products/          # Pasta de produtos
│   │   └── page.tsx       # Listagem de produtos
│   ├── favicon.ico        # Ícone da aplicação
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── Navbar.tsx         # Barra de navegação
│   ├── Notification.tsx   # Sistema de notificações
│   ├── ProductCard.tsx    # Card de produto
│   ├── ProductForm.tsx    # Formulário de produto
│   └── ProductList.tsx    # Lista de produtos
├── context/               # Contextos React
│   └── AppContext.tsx     # Contexto global da aplicação
├── services/              # Serviços de comunicação
│   ├── api.ts             # Configuração base da API
│   └── productService.ts  # Serviços específicos de produtos
└── types/                 # Definições de tipos TypeScript
    └── product.ts         # Tipos relacionados a produtos

public/                    # Arquivos estáticos
├── file.svg
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg
```

## ✨ Funcionalidades Principais

- **Navegação intuitiva** - Interface limpa e responsiva
- **Sistema de notificações** - Feedback visual para ações
- **Gerenciamento de estado** - Context API para estado global

## 📦 Funcionalidades de Produtos

- **Listagem** - Visualização de todos os produtos
- **Criação** - Adicionar novos produtos com formulário
- **Edição** - Modificar produtos existentes
- **Exclusão** - Remover produtos do catálogo
- **Favoritos** - Marcar/desmarcar produtos favoritos
- **Responsividade** - Interface adaptável a diferentes telas

## 🎨 Design System

- **Tema principal**: Rosa (Rose) - paleta de cores elegante
- **Componentes**: Tailwind CSS com classes utilitárias
- **Responsividade**: Mobile-first design
- **Tipografia**: Inter font family
- **Elementos visuais**: Cards com sombras, bordas arredondadas
- **Feedback visual**: Notificações e estados de hover

## 🔗 Integração com Backend

A aplicação se comunica com o backend através de:
- **Base URL**: `http://localhost:3002`
- **Produtos**: `/api/products` (GET, POST, PUT, DELETE)
- **Favoritos**: `/api/products/:id/favorite` (PUT)
- **Saúde**: `/health` (GET)
- **Headers**: Content-Type application/json
- **CORS**: Configurado para comunicação entre portas

## 📱 Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa build de produção
npm run lint     # Executa linting do código