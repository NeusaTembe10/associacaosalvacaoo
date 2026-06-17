# Backend API - Associação Salvação App

API REST para gerenciar membros e cultos da aplicação Associação Salvação.

## Requisitos

- Node.js 16+
- MongoDB

## Instalação

```bash
npm install
```

## Configuração

Edite o arquivo `.env` com suas configurações:

```env
MONGO_URI=mongodb://localhost:27017/associacao_salvacao
PORT=5000
NODE_ENV=development
```

## Desenvolvimento

```bash
npm run dev
```

O servidor iniciará em `http://localhost:5000`

## Build para Produção

```bash
npm run build
npm start
```

## Endpoints da API

### Members (Membros)

- `GET /api/members` - Listar todos os membros
- `POST /api/members` - Criar novo membro
- `GET /api/members/:id` - Obter membro por ID
- `PUT /api/members/:id` - Atualizar membro
- `DELETE /api/members/:id` - Deletar membro

#### Exemplo de criação:

```json
{
  "nome": "João Silva",
  "idade": 30,
  "morada": "Rua Principal, 123",
  "contacto": "911234567",
  "status": "Visitante"
}
```

### Cultos (Eventos)

- `GET /api/cultos` - Listar todos os cultos
- `POST /api/cultos` - Criar novo culto
- `GET /api/cultos/:id` - Obter culto por ID
- `PUT /api/cultos/:id` - Atualizar culto
- `DELETE /api/cultos/:id` - Deletar culto
- `POST /api/cultos/:id/addMember` - Adicionar membro ao culto

#### Exemplo de criação:

```json
{
  "data": "2024-06-20T18:00:00Z",
  "tipo": "Culto",
  "localizacao": "Igreja Central",
  "descricao": "Culto de domingo",
  "membros": []
}
```

## Verificação de Saúde

- `GET /api/health` - Status da API

## Estrutura do Projeto

```
backend/
├── src/
│   ├── index.ts           # Servidor principal
│   ├── controllers/       # Lógica de negócio
│   ├── models/           # Schemas MongoDB
│   └── routes/           # Definição de rotas
├── package.json
├── tsconfig.json
└── .env
```

## Stack Tecnológico

- **Express** - Framework web
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB
- **TypeScript** - Type safety
- **CORS** - Cross-origin requests
- **Express Validator** - Validação de dados
