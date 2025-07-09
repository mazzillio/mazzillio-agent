# Web App

Aplicação web moderna construída com React, TypeScript e Vite.

## 🛠️ Tecnologias

### Core
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server

### UI & Styling
- **Tailwind CSS 4** - Framework CSS utilitário
- **shadcn/ui** - Componentes React reutilizáveis
- **Radix UI** - Primitivos acessíveis
- **Lucide React** - Ícones

### State Management & Data
- **TanStack Query** - Gerenciamento de estado do servidor
- **React Router DOM** - Roteamento

### Development Tools
- **Biome** - Linter e formatter
- **Ultracite** - Configuração de linting

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
│   └── ui/        # Componentes shadcn/ui
├── pages/         # Páginas da aplicação
├── lib/           # Utilitários e configurações
├── app.tsx        # Componente principal
└── main.tsx       # Ponto de entrada
```

## 🚀 Setup

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone <repository-url>
cd web
```

2. Instale as dependências
```bash
npm install
```

3. Execute o servidor de desenvolvimento
```bash
npm run dev
```

4. Acesse `http://localhost:5173`

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## 🎨 Padrões de Projeto

- **Componentes**: Utiliza shadcn/ui para componentes base
- **Roteamento**: React Router para navegação
- **Estado**: TanStack Query para cache e sincronização
- **Estilização**: Tailwind CSS com variáveis CSS
- **Linting**: Biome com configuração Ultracite
- **Aliases**: `@/` aponta para `src/`

## 🔧 Configuração

O projeto utiliza:
- **Vite** para build e dev server
- **Tailwind CSS 4** com configuração automática
- **shadcn/ui** com tema "new-york" e cor base "zinc"
- **TypeScript** com configuração estrita 