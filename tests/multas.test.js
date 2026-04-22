const axios = require('axios');
const api = `http://localhost:${process.env.PORT || 3000}`;

describe("Multas", () => {
    test('POST /multas/criar cria uma multa', async () => {
        const usuarioTemp = await axios.post(`${api}/usuarios/criar`, {
            nome: "Usuário de Teste",
            email: `usuario_${Date.now()}@email.com`,
            senha: "123456",
            tipo: "aluno",
        });

        const livroTemp = await axios.post(`${api}/livros/criar`, {
            titulo: 'Livro de Teste para Multa',
            autor: 'Autor de Teste',
            disponivel: true
        });

        const emprestimoTemp = await axios.post(`${api}/emprestimos/criar`, {
            livro_id: livroTemp.data.id,
            usuario_id: usuarioTemp.data.id,
            data_devolucao_prevista: "2025-05-01"
        });

        const res = await axios.post(
            `${api}/multas/criar`, 
            {
                usuario_id: usuarioTemp.data.id,
                emprestimo_id: emprestimoTemp.data.id,
                data_devolucao_prevista: "2025-05-01",
                data_devolucao_real: "2025-05-10"
            },
            {headers: { 'Content-Type': 'application/json' }}
        );
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");
        expect(res.data.usuario_id).toBe(usuarioTemp.data.id);
    });

    test('GET /multas/ lista todas as multas', async () => {
        const res = await axios.get(
            `${api}/multas/`, 
            {headers: { 'Content-Type': 'application/json' }}
        );
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test('GET /multas/:id busca multa por id', async () => {
        const res = await axios.get(
            `${api}/multas/1`, 
            { headers: { 'Content-Type': 'application/json' }}
        );
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(1);
    });

     test('GET /multas/usuario/:usuario_id busca multas por usuário', async () => {
        const usuarioTemp = await axios.post(`${api}/usuarios/criar`, {
            nome: "Usuário de Teste para Multa",
            email: `usuario_${Date.now()}@email.com`,
            senha: "123456",
            tipo: "aluno",
        });

        const livroTemp = await axios.post(`${api}/livros/criar`, {
            titulo: 'Livro de Teste para Multa',
            autor: 'Autor de Teste',
            disponivel: true
        });
        
        const emprestimoTemp = await axios.post(`${api}/emprestimos/criar`, {
            livro_id: livroTemp.data.id,
            usuario_id: usuarioTemp.data.id,
            data_devolucao_prevista: "2025-05-01"
        });
        
        await axios.post(
            `${api}/multas/criar`, 
            {
                usuario_id: usuarioTemp.data.id,
                emprestimo_id: emprestimoTemp.data.id,
                data_devolucao_prevista: "2025-05-01",
                data_devolucao_real: "2025-05-10"
            },
            {headers: { 'Content-Type': 'application/json' }}
        );

        const res = await axios.get(
            `${api}/multas/usuario/${usuarioTemp.data.id}`, 
            { headers: { 'Content-Type': 'application/json' }}
        );
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test('GET /multas/emprestimo/:emprestimo_id busca multa por empréstimo', async () => {
        const usuarioTemp = await axios.post(`${api}/usuarios/criar`, {
            nome: "Usuário de Teste para Multa",
            email: `usuario_${Date.now()}@email.com`,
            senha: "123456",
            tipo: "aluno",
        });

        const livroTemp = await axios.post(`${api}/livros/criar`, {
            titulo: 'Livro de Teste para Multa',
            autor: 'Autor de Teste',
            disponivel: true
        });
        
        const emprestimoTemp = await axios.post(`${api}/emprestimos/criar`, {
            livro_id: livroTemp.data.id,
            usuario_id: usuarioTemp.data.id,
            data_devolucao_prevista: "2025-05-01"
        });
        
        await axios.post(
            `${api}/multas/criar`, 
            {
                usuario_id: usuarioTemp.data.id,
                emprestimo_id: emprestimoTemp.data.id,
                data_devolucao_prevista: "2025-05-01",
                data_devolucao_real: "2025-05-10"
            },
            {headers: { 'Content-Type': 'application/json' }}
        );

        const res = await axios.get(
            `${api}/multas/emprestimo/${emprestimoTemp.data.id}`, 
            { headers: { 'Content-Type': 'application/json' }}
        );
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty("id");
    });

    // test('POST /multas/valor calcula o valor da multa', async () => {
    //     const res = await axios.post(
    //         `${api}/multas/valor`,
    //         {
    //             data_devolucao_prevista: "2025-05-01",
    //             data_devolucao_real: "2025-05-10"
    //         },
    //         { headers: { 'Content-Type': 'application/json' }}
    //     );
    //     expect(res.status).toBe(200);
    //     expect(res.data).toHaveProperty("valor");
    // });

    // test('PATCH /multas/atualizar/:id atualiza uma multa', async () => {
    //     const multa = await axios.post(
    //         `${api}/multas/criar`, 
    //         {
    //             usuario_id: 1,
    //             emprestimo_id: 1,
    //             data_devolucao_prevista: "2025-05-01",
    //             data_devolucao_real: "2025-05-10"
    //         },
    //         {headers: { 'Content-Type': 'application/json' }}
    //     );
    // });

    // test('PATCH /multas/quitar/:id quita uma multa', async () => {
    //     const multa = await axios.post(
    //         `${api}/multas/criar`, 
    //         {
    //             usuario_id: 1,
    //             emprestimo_id: 1,
    //             data_devolucao_prevista: "2025-05-01",
    //             data_devolucao_real: "2025-05-10"
    //         },
    //         {headers: { 'Content-Type': 'application/json' }}
    //     );
    // });

    // test('DELETE /multas/deletar/:id deleta uma multa', async () => {
    //     try {
    //         const multa = await axios.post(
    //             `${api}/multas/criar`, 
    //             {
    //                 usuario_id: 1,
    //                 emprestimo_id: 1,
    //                 data_devolucao_prevista: "2025-05-01",
    //                 data_devolucao_real: "2025-05-10"
    //             },
    //             {headers: { 'Content-Type': 'application/json' }}
    //         );
    //         const res = await axios.delete(`${api}/multas/deletar/${multa.data.id}`);
    //         expect(res.status).toBe(200);
    //     } catch (err) {
    //         expect(err.response.status).toBe(404);
    //     }
    // });
});