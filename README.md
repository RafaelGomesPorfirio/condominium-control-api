# 🏢 Condominium Control API

API RESTful para gerenciamento de visitantes, unidades e condomínios com registro de movimentações.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Prisma ORM](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Express.js-404D59?logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)

## 📋 Tabela de Conteúdos

- [Recursos](#-recursos)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Configuração](#-configuração)
- [Execução](#-execução)
- [Testes](#-testes)
- [Documentação API](#-documentação-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Rotas](#-rotas)
- [Licença](#-licença)

## 🚀 Recursos

- **Gestão de Visitantes**
  - Cadastro com documento único
  - Controle completo (CRUD)
  
- **Administração de Condomínios**
  - Cadastro de condomínios
  - Associação com múltiplas unidades

- **Controle de Unidades**
  - Vinculação a condomínios
  - Detalhes como bloco, andar e tipo

- **Registro de Movimentações**
  - Controle de entrada/saída
  - Prevenção de visitantes com movimentação aberta
  - Filtros avançados por data e status

## 💻 Tecnologias

**Backend:**
- Node.js 
- Express
- Prisma (ORM)
- MySQL
- Zod (validação)
- Winston (logs)

**Ferramentas:**
- Swagger UI (documentação)
- Jest (testes)

## ⚙️ Configuração

1. Clone o repositório:
```bash
git clone https://github.com/RafaelGomesPorfirio/condominium-control-api.git
cd condominium-control-api

2. Instale as dependências:
npm install
# ou
yarn install

3. Configure o ambiente:
cp .env.example .env
      Edite o .env com suas credenciais do MySQL.

4. Execute as migrations:
npx prisma migrate dev --name init


5. Execução
npm run dev
      A API estará disponível em: http://localhost:3000

6. Testes
npm test
# ou
yarn test

📚 Documentação da API
A documentação interativa da API está disponível em:

http://localhost:3000/api-docs
