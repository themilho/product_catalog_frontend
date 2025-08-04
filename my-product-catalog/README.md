# 🛍️ Catálogo de Produtos - Frontend

Uma aplicação moderna de catálogo de produtos construída com Next.js 14, TypeScript e Tailwind CSS. Permite aos usuários navegar, criar, editar e favoritar produtos com sistema completo de autenticação.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React Context** - Gerenciamento de estado global
- **JWT** - Autenticação via tokens
- **Fetch API** - Comunicação com backend

## 📋 Pré-requisitos

- Node.js 18+ instalado
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
│   ├── edit/[id]/         # Página de edição de produto
│   ├── login/             # Página de login
│   ├── new/               # Página de criação de produto
│   ├── products/          # Listagem de produtos
│   ├── register/          # Página de cadastro
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── Navbar.tsx         # Barra de navegação
│   ├── ProductCard.tsx    # Card de produto
│   └── ProductForm.tsx    # Formulário de produto
├── contexts/              # Contextos React
│   └── AuthContext.tsx    # Contexto de autenticação
└── types/                 # Definições de tipos TypeScript
    └── product.ts         # Tipos relacionados a produtos
```

## 🔐 Funcionalidades de Autenticação

- **Cadastro de usuário** - Criação de nova conta
- **Login** - Autenticação com email e senha
- **Logout** - Encerramento de sessão
- **Proteção de rotas** - Redirecionamento automático
- **Persistência** - Token salvo no localStorage

## 📦 Funcionalidades de Produtos

- **Listagem** - Visualização de todos os produtos
- **Criação** - Adicionar novos produtos
- **Edição** - Modificar produtos existentes
- **Favoritos** - Marcar/desmarcar produtos favoritos
- **Busca** - Filtrar produtos por nome

## 🎨 Design System

- **Tema principal**: Rosa (Rose)
- **Componentes**: Tailwind CSS
- **Responsividade**: Mobile-first
- **Tipografia**: Geist font family

## 🔗 Integração com Backend

A aplicação se comunica com o backend através de:
- **Base URL**: `http://localhost:3002`
- **Autenticação**: `/auth/login`, `/auth/register`, `/auth/me`
- **Produtos**: `/products` (GET, POST, PUT, DELETE)
- **Headers**: Authorization Bearer token

## 📱 Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa build de produção
npm run lint     # Executa linting do código
```

## 🚀 Deploy

Para deploy em produção, recomenda-se usar a [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.
