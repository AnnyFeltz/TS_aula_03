const axios = require('axios');
const api = `http://localhost:${process.env.PORT || 3000}`;

console.log("Conectando na API em:", api);

describe("Usuários", () => {
  test("/usuarios deve retornar uma lista de usuários", async () => {
    const res = await axios.get(
      `${api}/usuarios`,
      {headers: { 'Content-Type': 'application/json' }}
    );
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test("/usuarios/:id deve retornar um usuário pelo id", async () => {
    const res = await axios.get(
      `${api}/usuarios/1`,
      {headers: { 'Content-Type': 'application/json' }}
    );
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("id");
    expect(res.data).toHaveProperty("nome");
    expect(res.data).toHaveProperty("email");
  });

  test("/usuarios/:id deve retornar 404 para usuário inexistente", async () => {
    try {
      await axios.get(
        `${api}/usuarios/99999`,
        {headers: { 'Content-Type': 'application/json' }}
      );
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  test("/usuarios deve criar um novo usuário", async () => {
    const res = await axios.post(`${api}/usuarios/criar`, 
      {
        nome: "João Silva",
        email: `joao_${Date.now()}@email.com`,
        senha: "123456",
        tipo: "aluno",
      },
      {headers: { 'Content-Type': 'application/json' }}
    );
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty("id");
    expect(res.data.nome).toBe("João Silva");
    expect(res.data.tipo).toBe("aluno");
  });

  test("/usuarios deve retornar 400 ao criar usuário sem nome", async () => {
    try {
      await axios.post(
       `${api}/usuarios/criar`, 
       {
         email: "joao@email.com",
         senha: "123456",
        tipo: "aluno",
      },
      {headers: { 'Content-Type': 'application/json' }}
    );
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("/usuarios deve retornar 400 ao criar usuário sem email", async () => {
    try {
      await axios.post(
        `${api}/usuarios/criar`, 
        {
          nome: "João Silva",
          senha: "123456",
          tipo: "aluno",
        },
        {headers: { 'Content-Type': 'application/json' }}
      );
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("/usuarios deve retornar 400 ao criar usuário com email já cadastrado", async () => {
    const email = `duplicado_${Date.now()}@email.com`;
    await axios.post(
     `${api}/usuarios/criar`, 
     { 
       nome: "Maria Souza", 
       email, 
       senha: "123456", 
       tipo: "aluno" 
     },
     {headers: { 'Content-Type': 'application/json' }}
    );
  
    try {
      await axios.post(
       `${api}/usuarios/criar`, 
       { 
         nome: "Carlos Lima", 
         email, 
         senha: "abcdef", 
         tipo: "aluno" 
       },
      {headers: { 'Content-Type': 'application/json' }});
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("/usuarios/atualizar/:id deve atualizar os dados de um usuário", async () => {
    const criado = await axios.post(
      `${api}/usuarios/criar`, 
      {
        nome: "Pedro Antigo",
        email: `pedro_${Date.now()}@email.com`,
        senha: "123456",
        tipo: "aluno",
      },
      {headers: { 'Content-Type': 'application/json' }}
    );

    const res = await axios.patch(
      `${api}/usuarios/atualizar/${criado.data.id}`, 
      { nome: "Pedro Novo" }
    );
    expect(res.status).toBe(200);
    expect(res.data.nome).toBe("Pedro Novo");
  });

  test("/usuarios/atualizar/:id deve retornar 404 ao atualizar usuário inexistente", async () => {
    try {
      await axios.patch(
        `${api}/usuarios/atualizar/99999`, 
        { nome: "Ninguém" }
      );
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  test("/usuarios/deletar/:id deve remover um usuário", async () => {
    const criado = await axios.post(
      `${api}/usuarios/criar`, 
      {
        nome: "Para Deletar",
        email: `deletar_${Date.now()}@email.com`,
        senha: "123456",
        tipo: "aluno",
      },
      {headers: { 'Content-Type': 'application/json' }}
    );
    
    const res = await axios.delete(`${api}/usuarios/deletar/${criado.data.id}`);
    expect(res.status).toBe(200);
  });

  test("/usuarios/deletar/:id deve retornar 404 ao deletar usuário inexistente", async () => {
    try {
      await axios.delete(`${api}/usuarios/deletar/99999`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });
});