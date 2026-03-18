const request = require('supertest');
const api = `http://localhost:${process.env.PORT || 3000}`;

test('POST /livros cria um livro', async () => {
    const res = await request(api)
        .post('/livros/criar')
        .send({titulo: 'Livro de Teste', autor: 'Autor de Teste'});
    expect(res.status).toBe(201);
    expect(res.body.titulo).toBe('Livro de Teste');
});

test('GET /livro/:id busca livro por id', async () => {
    const res = await request(api)
        .get('/livros/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
});