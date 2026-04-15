const axios = require('axios');
const api = `http://localhost:${process.env.PORT || 3000}`;

let LIVRO_ID;
let USUARIO_ID;

describe("Empréstimos", () => {

    beforeAll(async () => {
        try {
            const resLivros = await axios.get(`${api}/livros`);
            const resUsuarios = await axios.get(`${api}/usuarios`);
            
            LIVRO_ID = resLivros.data[0].id;
            USUARIO_ID = resUsuarios.data[0].id;
        } catch (err) {
            console.error("Erro ao buscar dados iniciais. Verifique se há livros e usuários cadastrados.");
        }
    });

    beforeEach(async () => {
        try {
            const lista = await axios.get(`${api}/emprestimos`);
            const ativos = lista.data.filter(e => e.livro_id === LIVRO_ID && e.status === 'ATIVO');
            
            for (const ativo of ativos) {
                await axios.delete(`${api}/emprestimos/deletar/${ativo.id}`);
            }
        } catch (err) {
        }
    });

    test("/emprestimos/criar deve registrar um novo empréstimo", async () => {
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

        await axios.delete(`${api}/emprestimos/deletar/${res.data.id}`);
    });

    test("/emprestimos/ deve retornar uma lista de empréstimos", async () => {
        const res = await axios.get(`${api}/emprestimos`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("/emprestimos/deletar/:id deve deletar um empréstimo", async () => {
        const temp = await axios.post(`${api}/emprestimos/criar`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01"
        });
        const res = await axios.delete(`${api}/emprestimos/deletar/${temp.data.id}`);
        expect(res.status).toBe(200);
    });

    test("/emprestimos/deletar/:id deve retornar 404 ao deletar empréstimo inexistente", async () => {
        try {
            await axios.delete(`${api}/emprestimos/deletar/9999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("/emprestimos/:id deve retornar um empréstimo pelo id", async () => {
        const temp = await axios.post(`${api}/emprestimos/criar`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01"
        });
        const res = await axios.get(`${api}/emprestimos/${temp.data.id}`);
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(temp.data.id);

        await axios.delete(`${api}/emprestimos/deletar/${temp.data.id}`);
    });

    test("/emprestimos/:id deve retornar 404 para empréstimo inexistente", async () => {
        try {
            await axios.get(`${api}/emprestimos/9999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("/emprestimos/criar deve retornar 400 ao registrar empréstimo sem livro_id", async () => {
        try {
            await axios.post(`${api}/emprestimos/criar`, {
                usuario_id: USUARIO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("/emprestimos/criar deve retornar 400 ao registrar empréstimo sem usuario_id", async () => {
        try {
            await axios.post(`${api}/emprestimos/criar`, {
                livro_id: LIVRO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("/emprestimos/criar deve registrar a devolução de um empréstimo", async () => {
        const temp = await axios.post(`${api}/emprestimos/criar`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01"
        });
        const res = await axios.patch(`${api}/emprestimos/devolver/${temp.data.id}`);
        expect(res.status).toBe(200);
        expect(res.data.status).toBe("DEVOLVIDO");
    });

    test("/emprestimos/usuario/:usuario_id deve listar empréstimos de um usuário específico", async () => {
        const res = await axios.get(`${api}/emprestimos/usuario/${USUARIO_ID}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("/emprestimos/criar deve retornar 400 ao emprestar livro já emprestado", async () => {
        await axios.post(`${api}/emprestimos/criar`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01"
        });

        try {
            await axios.post(`${api}/emprestimos/criar`, {
                livro_id: LIVRO_ID,
                usuario_id: USUARIO_ID,
                data_devolucao_prevista: "2025-05-01"
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
            const msg = err.response.data.message || err.response.data.error;
            expect(msg).toMatch(/já possui um empréstimo ativo|já está emprestado/i);
        }
    });
});