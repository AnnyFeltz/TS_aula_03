const axios = require('axios');
const api = `http://localhost:${process.env.PORT || 3000}`;

describe("Livros", () => {
    test('POST /livros cria um livro', async () => {
        const res = await axios.post(
            `${api}/livros/criar`, 
            {
                titulo: 'Livro de Teste', 
                autor: 'Autor de Teste', 
                disponivel: true
            }, 
            {headers: { 'Content-Type': 'application/json' }}
        );
        expect(res.status).toBe(201);
        expect(res.data.titulo).toBe('Livro de Teste');
    });

    test('GET /livros/ lista todos os livros', async () => {
        const res = await axios.get(
            `${api}/livros/`, 
            {headers: { 'Content-Type': 'application/json' }}
        );
        expect(res.status).toBe(200);
        expect(res.data.length).toBeGreaterThan(0);
    });

    test('GET /livro/:id busca livro por id', async () => {
        const res = await axios.get(
            `${api}/livros/1`, 
            { headers: { 'Content-Type': 'application/json' }}
        );
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(1);
    });

    test('PATCH /livros/atualizar/:id', async () => {
        const livro = await axios.post(
            `${api}/livros/criar`, 
            {
                titulo: 'Livro de Teste', 
                autor: 'Autor de Teste', 
                disponivel: true
            }, 
            {headers: { 'Content-Type': 'application/json' }}
        );

        const response = await axios.patch(
            `${api}/livros/atualizar/${livro.data.id}`, 
            { titulo: 'Novo Nome' }, 
            { headers: { 'Content-Type': 'application/json' }}
        );
        expect(response.status).toBe(200);
        expect(response.data.titulo).toBe('Novo Nome');
    });

    test('DELETE /livros/deletar/:id', async () => {
        const livro = await axios.post(
            `${api}/livros/criar`, 
            {
                titulo: 'Livro de Teste', 
                autor: 'Autor de Teste', 
                disponivel: true
            }, 
            {headers: { 'Content-Type': 'application/json' }}
        );

        const response = await axios.delete(
            `${api}/livros/deletar/${livro.data.id}`, 
            { headers: { 'Content-Type': 'application/json' }}
        );
        expect(response.status).toBe(200);
    });
});