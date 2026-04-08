const axios = require('axios');
const api = `http://localhost:${process.env.PORT || 3000}`;

const LIVRO_ID = 6;
const USUARIO_ID = 1;

describe("Empréstimos", () => {

    test("deve registrar um novo empréstimo", async () => {
        const res = await axios.post(
            `${api}/emprestimos/criar`,
            {
                livro_id: LIVRO_ID,
                usuario_id: USUARIO_ID,
                data_devolucao_prevista: "2025-05-01",
            }
        );
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");

        // Limpeza
        await axios.delete(`${api}/emprestimos/deletar/${res.data.id}`);
    });

    test("deve retornar uma lista de empréstimos", async () => {
        const res = await axios.get(`${api}/emprestimos`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve deletar um empréstimo", async () => {
        const temp = await axios.post(`${api}/emprestimos/criar`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01"
        });
        const res = await axios.delete(`${api}/emprestimos/deletar/${temp.data.id}`);
        expect(res.status).toBe(200);
    });

    test("deve retornar 404 ao deletar empréstimo inexistente", async () => {
        try {
            await axios.delete(`${api}/emprestimos/deletar/9999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve retornar um empréstimo pelo id", async () => {
        const temp = await axios.post(`${api}/emprestimos/criar`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01"
        });
        const res = await axios.get(`${api}/emprestimos/buscar/${temp.data.id}`);
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(temp.data.id);

        await axios.delete(`${api}/emprestimos/deletar/${temp.data.id}`);
    });

    test("deve retornar 404 para empréstimo inexistente", async () => {
        try {
            await axios.get(`${api}/emprestimos/buscar/9999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem livro_id", async () => {
        try {
            await axios.post(`${api}/emprestimos/criar`, {
                usuario_id: USUARIO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem usuario_id", async () => {
        try {
            await axios.post(`${api}/emprestimos/criar`, {
                livro_id: LIVRO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem data de devolução", async () => {
        try {
            await axios.post(`${api}/emprestimos/criar`, {
                livro_id: LIVRO_ID,
                usuario_id: USUARIO_ID,
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve registrar a devolução de um empréstimo", async () => {
        const temp = await axios.post(`${api}/emprestimos/criar`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01"
        });
        const res = await axios.put(`${api}/emprestimos/devolver/${temp.data.id}`);
        expect(res.status).toBe(200);
        expect(res.data.status).toBe("DEVOLVIDO");
    });

    test("deve retornar 404 ao devolver empréstimo inexistente", async () => {
        try {
            await axios.put(`${api}/emprestimos/devolver/9999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve listar empréstimos de um usuário específico", async () => {
        const res = await axios.get(`${api}/emprestimos/usuario/${USUARIO_ID}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve retornar 400 ao emprestar livro já emprestado", async () => {
        const LIVRO_DUPLICADO = 10;

        // Limpeza prévia
        const lista = await axios.get(`${api}/emprestimos`);
        const ativos = lista.data.filter(e => e.livro_id === LIVRO_DUPLICADO && e.status === 'ATIVO');
        for (const ativo of ativos) {
            await axios.delete(`${api}/emprestimos/deletar/${ativo.id}`);
        }

        // Primeiro empréstimo
        await axios.post(`${api}/emprestimos/criar`, {
            livro_id: LIVRO_DUPLICADO,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01"
        });

        try {
            // Segundo empréstimo (deve falhar)
            await axios.post(`${api}/emprestimos/criar`, {
                livro_id: LIVRO_DUPLICADO,
                usuario_id: USUARIO_ID,
                data_devolucao_prevista: "2025-05-01"
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
            // Verifica se a mensagem existe, independente da chave (message ou error)
            const msg = err.response.data.message || err.response.data.error;
            expect(msg).toMatch(/já possui um empréstimo ativo|já está emprestado/i);
        } finally {
            // Limpeza final para o livro 10
            const final = await axios.get(`${api}/emprestimos`);
            const criado = final.data.find(e => e.livro_id === LIVRO_DUPLICADO && e.status === 'ATIVO');
            if (criado) await axios.delete(`${api}/emprestimos/deletar/${criado.id}`);
        }
    });
});