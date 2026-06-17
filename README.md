# Associação Salvação — App

Front-end responsivo em React + TypeScript + React Router + Tailwind CSS, com backend dinâmico Node.js + Express + MongoDB.

## Stack Tecnológico

### Frontend

- React 18
- TypeScript
- Tailwind CSS (responsivo)
- React Router v6
- Vite
- Lucide Icons

### Backend

- Node.js + Express
- MongoDB + Mongoose
- TypeScript
- CORS habilitado

## Estrutura

```
src/
  components/        componentes reutilizáveis (StatusBar, BottomNav, ScreenHeader, ListRow, Field, Emblem, PhoneFrame)
  context/
    MembersContext.tsx   gerencia estado dos membros com integração API
  pages/              um ficheiro por ecrã / rota
    WelcomeScreen.tsx     ->  /
    HomeScreen.tsx        ->  /home (grid responsivo)
    CultosScreen.tsx      ->  /cultos
    RegistroScreen.tsx    ->  /cultos/registro (dinâmico + API)
    ListaScreen.tsx       ->  /cultos/lista (dinâmico + API)
    Placeholder.tsx       ->  /departamentos, /relatorios, /perfil
  App.tsx             definição das rotas (react-router-dom)
  main.tsx            ponto de entrada (BrowserRouter)
  index.css           Tailwind
backend/
  src/
    controllers/      lógica de negócio
    models/          schemas MongoDB
    routes/          endpoints API
    index.ts         servidor Express
```

## Como correr

### Pré-requisitos

- Node.js 16+
- MongoDB rodando localmente ou remota

### Frontend e Backend (2 terminais)

**Terminal 1 - Frontend:**

```bash
npm install
npm run dev
```

Abra http://localhost:5173

**Terminal 2 - Backend:**

```bash
cd backend
npm install
npm run dev
```

API rodará em http://localhost:5000/api

### Build de produção

**Frontend:**

```bash
npm run build
npm run preview
```

**Backend:**

```bash
cd backend
npm run build
npm start
```

## Recursos Principais

### ✅ Responsivo

- **Mobile First**: Otimizado para dispositivos móveis (375px)
- **Tablet**: Layout adaptado para tablets (sm: 640px)
- **Desktop**: Grid de 3 colunas em telas maiores (md: 768px+)
- PhoneFrame adapta-se automaticamente ao tamanho da tela

### ✅ Dinâmico

- **API Integration**: Todos os dados sincronizados com backend
- **Real-time**: Alterações refletem imediatamente na UI
- **Loading States**: Indicadores de carregamento durante requisições
- **Error Handling**: Tratamento de erros com feedback ao usuário

### ✅ Funcionalidades

- ✓ Registar membros (persistência em BD)
- ✓ Listar membros com carregamento dinâmico
- ✓ Validação de dados
- ✓ Interface móvel fluida
- ✓ Navegação entre rotas

## Variáveis de Ambiente

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

### Backend (backend/.env)

```
MONGO_URI=mongodb://localhost:27017/associacao_salvacao
PORT=5000
NODE_ENV=development
```

## API Endpoints

### Members

- `GET /api/members` - Listar membros
- `POST /api/members` - Criar membro
- `GET /api/members/:id` - Obter membro
- `PUT /api/members/:id` - Atualizar membro
- `DELETE /api/members/:id` - Deletar membro

### Cultos

- `GET /api/cultos` - Listar cultos
- `POST /api/cultos` - Criar culto
- `GET /api/cultos/:id` - Obter culto
- `PUT /api/cultos/:id` - Atualizar culto
- `DELETE /api/cultos/:id` - Deletar culto
- `POST /api/cultos/:id/addMember` - Adicionar membro ao culto

## Notas

- O estado dos membros está sincronizado com a API via `MembersContext`
- Os dados persistem na base de dados MongoDB
- A interface é totalmente responsiva com Tailwind CSS
- Há tratamento de erros e estados de carregamento em todas as operações
- CORS está habilitado para desenvolvimento local
- Os botões "Cruzadas" e "Evangelização" no menu principal e os itens
  "Faltas", "Atrasos" e "Visitas" em Cultos ainda não têm rota própria —
  é fácil adicionar seguindo o mesmo padrão das páginas existentes.
