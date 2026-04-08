const axios = require('axios');
const api = `http://localhost:${process.env.PORT || 3000}`;

const LIVRO_ID = 1;
const USUARIO_ID = 1;

describe("Empréstimos", () => {
    
    test("deve registrar um novo empréstimo", async () => {
        const res = await axios.post(
            `${api}/emprestimos`, 
            {
                livro_id: LIVRO_ID,
                usuario_id: USUARIO_ID,
                data_devolucao_prevista: "2025-05-01",
            }, 
            {headers: { 'Content-Type': 'application/json' }}
        );
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");

        // Limpeza para não travar o livro nos próximos testes
        await axios.delete(`${api}/emprestimos/${res.data.id}`);
    });

    test("deve retornar uma lista de empréstimos", async () => {
        const res = await axios.get(`${api}/emprestimos`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve deletar um empréstimo", async () => {
        const temp = await axios.post(
            `${api}/emprestimos`, 
            {
                livro_id: 2, 
                usuario_id: 1, 
                data_devolucao_prevista: "2025-05-01"
            },
            {headers: { 'Content-Type': 'application/json' }}
        );
        const res = await axios.delete(`${api}/emprestimos/${temp.data.id}`);
        expect(res.status).toBe(200);
    });

    test("deve retornar 404 ao deletar empréstimo inexistente", async () => {
        try {
            await axios.delete(
                `${api}/emprestimos/9999`, 
                {headers: { 'Content-Type': 'application/json' }}
            );
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve retornar um empréstimo pelo id", async () => {
        const temp = await axios.post(
            `${api}/emprestimos`, 
            {
                livro_id: 3, 
                usuario_id: 1, 
                data_devolucao_prevista: "2025-05-01"}
            );
        const res = await axios.get(
            `${api}/emprestimos/${temp.data.id}`,
            {headers: { 'Content-Type': 'application/json' }}
        );
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(temp.data.id);
        
        await axios.delete(`${api}/emprestimos/${temp.data.id}`);
    });

    test("deve retornar 404 para empréstimo inexistente", async () => {
        try {
            await axios.get(`${api}/emprestimos/9999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem livro_id", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                usuario_id: USUARIO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem usuario_id", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                livro_id: LIVRO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem data de devolução", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                livro_id: LIVRO_ID,
                usuario_id: USUARIO_ID,
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve registrar a devolução de um empréstimo", async () => {
        const temp = await axios.post(`${api}/emprestimos`, {
            livro_id: 4, usuario_id: 1, data_devolucao_prevista: "2025-05-01"
        });
        // Rota PUT /emprestimos/:id/devolver definida no Controller anterior
        const res = await axios.put(`${api}/emprestimos/${temp.data.id}/devolver`);
        expect(res.status).toBe(200);
        expect(res.data.status).toBe("DEVOLVIDO");
    });

    test("deve retornar 404 ao devolver empréstimo inexistente", async () => {
        try {
            await axios.put(`${api}/emprestimos/9999/devolver`);
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
        // Cria o primeiro
        await axios.post(`${api}/emprestimos`, {
            livro_id: 10, usuario_id: 1, data_devolucao_prevista: "2025-05-01"
        });

        try {
            // Tenta o segundo com o mesmo livro_id: 10
            await axios.post(`${api}/emprestimos`, {
                livro_id: 10, usuario_id: 2, data_devolucao_prevista: "2025-05-01"
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });
});