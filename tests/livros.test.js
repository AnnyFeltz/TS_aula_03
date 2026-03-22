const request = require('supertest');
const api = `http://localhost:${process.env.PORT || 3000}`;

test('POST /livros cria um livro', async () => {
    const res = await request(api)
        .post('/livros/criar')
        .send({titulo: 'Livro de Teste', autor: 'Autor de Teste'});
    expect(res.status).toBe(201);
    expect(res.body.titulo).toBe('Livro de Teste');
});

test('GET /livros/ lista todos os livros', async () => {
    const res = await request(api)
        .get('/livros/');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
});

test('GET /livro/:id busca livro por id', async () => {
    const res = await request(api)
        .get('/livros/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
});

test('PATCH /livros/atualizar/:id', async () => {
    const response = await request(api)
        .patch('/livros/atualizar/1')
        .send({ titulo: 'Novo Nome' });
    expect(response.status).toBe(200);
    expect(response.body.titulo).toBe('Novo Nome');
});

test('DELETE /livros/deletar/:id', async () => {
    const response = await request(api)
        .delete('/livros/deletar/1');
    expect(response.status).toBe(200);
});