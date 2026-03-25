# Atividade 03 - Teste de Software (Pair Programming)

Este projeto é uma API REST para gerenciamento de livros, desenvolvida como parte da disciplina de **Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)** no IFPR - Campus Paranaguá. O foco da atividade foi a aplicação de **TDD (Test Driven Development)** e a prática de **Pair Programming**.

## 👥 Integrantes
* **Ana Caroline Madera Feltz**
* **Yasmim**

## 🎯 Objetivo da Atividade
Implementar rotas CRUD para um sistema de biblioteca seguindo a metodologia "Teste primeiro, código depois":
1. O **Navigator** define a regra de negócio e o que a rota deve fazer.
2. O **Driver** escreve o teste no **Jest** e verifica a falha.
3. O **Driver** implementa o código mínimo para o teste passar.
4. Ambos refatoram o código e trocam de papéis a cada 15-20 minutos.

## 🛠️ Tecnologias Utilizadas
* **Node.js** com framework **Express**
* **Sequelize ORM** (MySQL/SQLite)
* **Jest** & **Supertest** (Para testes automatizados e de integração)
* **Dotenv** (Gerenciamento de variáveis de ambiente)
* **Nodemon** (Ambiente de desenvolvimento)

## 📂 Estrutura do Projeto
```text
src/
├── controllers/    # Camada de controle (processa requisições)
├── database/       # Configurações do Sequelize e Migrations
├── models/         # Definição dos modelos de dados (Livro.js)
├── routes/         # Rotas da API (livroRoutes.js, Routes.js)
├── services/       # Regras de negócio e comunicação com o DB
├── app.js          # Configuração do servidor Express
└── server.js       # Ponto de entrada (inicialização do servidor)
tests/              # Arquivos de teste (.test.js)

# 🚀 Como Executar o Projeto

## Clone o repositório:

```bash
git clone https://github.com/AnnyFeltz/TS_aula_03.git
cd TS_aula_03
```

## Instale as dependências:

```bash
npm install
```

## Configuração do Banco de Dados:

Crie um arquivo `.env` na raiz do projeto seguindo o modelo do `.env.example`.
Configure suas credenciais (`DB_USER`, `DB_PASSWORD`, etc).

## Execute as Migrations:

```bash
npm run db:migrate
```

## Inicie a aplicação:

```bash
npm run dev
```

---

# 🧪 Rodando os Testes

Para rodar os testes criados durante o Pair Programming e garantir que todas as rotas retornam **PASS**:

```bash
npm test
```

---

# 🛣️ Rotas e Responsabilidades

As rotas foram divididas conforme a prática de revezamento de papéis:

| Método | Rota                  | Descrição                  | Responsável |
| ------ | --------------------- | -------------------------- | ----------- |
| POST   | /livros/criar         | Cria um novo livro         | Anny        |
| GET    | /livros/              | Lista todos os livros      | Anny        |
| GET    | /livros/:id           | Busca um livro por ID      | Anny        |
| PATCH  | /livros/atualizar/:id | Atualiza dados de um livro | Yasmim      |
| DELETE | /livros/deletar/:id   | Remove um livro do sistema | Yasmim      |
