const { criarEmprestimo, listarTodosEmprestimos, buscarEmprestimoId, registrarDevolucao, atualizarEmprestimo, deletarEmprestimo, buscarUsuarioID } = require('../services/emprestimoService');

const criar = async (req, res) => {
    try {
        const { livro_id, usuario_id, data_devolucao_prevista } = req.body;

        if (!livro_id || !usuario_id || !data_devolucao_prevista) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
        }

        const novoEmprestimo = await criarEmprestimo(req.body);
        return res.status(201).json(novoEmprestimo);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ error: 'Este livro já possui um empréstimo ativo' });
        }
        return res.status(500).json({ error: 'Ocorreu um erro ao criar o empréstimo' });
    }
};

const listar = async (_, res) => {
    try {
        const lista = await listarTodosEmprestimos();

        if (lista.length === 0) {
            return res.status(404).json({ error: 'Nenhum empréstimo encontrado' });
        }

        return res.status(200).json(lista);
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao listar os empréstimos' });
    }
};

const buscarId = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimo = await buscarEmprestimoId(id);

        if (!emprestimo) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }

        return res.status(200).json(emprestimo);
    } catch (error) {
        return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }
};

const devolver = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimo = await registrarDevolucao(id);

        if (!emprestimo) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }

        return res.status(200).json(emprestimo);
    } catch (error) {
        return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { data_devolucao_prevista } = req.body;

        if (!data_devolucao_prevista) {
            return res.status(400).json({ error: 'A nova data de devolução é obrigatória' });
        }

        const emprestimo = await atualizarEmprestimo(id, req.body);
        
        if (!emprestimo) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }

        return res.status(200).json(emprestimo);
    } catch (error) {
        return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }
};

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const excluido = await deletarEmprestimo(id);

        if (!excluido) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }

        return res.status(200).json({ message: 'Empréstimo deletado com sucesso' });
    } catch (error) {
        return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }
};

const buscarPorUsuario = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const lista = await buscarUsuarioID(usuario_id);

        if (lista.length === 0) {
            return res.status(404).json({ error: 'Nenhum empréstimo encontrado para este usuário' });
        }

        return res.status(200).json(lista);
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar os empréstimos do usuário' });
    }
};

module.exports = { criar, listar, buscarId, devolver, atualizar, deletar, buscarPorUsuario };