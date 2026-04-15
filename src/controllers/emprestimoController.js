const { criarEmprestimo, listarTodosEmprestimos, buscarEmprestimoPorId, registrarDevolucao, atualizarEmprestimo, deletarEmprestimo, listarPorUsuario } = require('../services/emprestimoService');

const criar = async (req, res) => {
    try {
        const novoEmprestimo = await criarEmprestimo(req.body);
        return res.status(201).json(novoEmprestimo);
    } catch (error) {
        // Se for um erro de validação (status 400), retorna a mensagem específica
        if (error.status === 400) return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: "Ocorreu um erro ao criar o empréstimo" });
    }
};

const listar = async (_, res) => {
    try {
        const lista = await listarTodosEmprestimos();
        return res.status(200).json(lista);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao listar empréstimos" });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimo = await buscarEmprestimoPorId(id);
        return res.status(200).json(emprestimo);
    } catch (error) {
        if (error.status === 404) return res.status(404).json({ message: error.message });
        return res.status(500).json({ message: "Erro ao buscar empréstimo" });
    }
};

const devolver = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimo = await registrarDevolucao(id);
        return res.status(200).json(emprestimo);
    } catch (error) {
        if (error.status === 404) return res.status(404).json({ message: error.message });
        return res.status(500).json({ message: "Erro ao registrar devolução" });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimo = await atualizarEmprestimo(id, req.body);
        return res.status(200).json(emprestimo);
    } catch (error) {
        if (error.status === 404) return res.status(404).json({ message: error.message });
        return res.status(500).json({ message: "Erro ao atualizar empréstimo" });
    }
};

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        await deletarEmprestimo(id);
        return res.status(200).json({ message: "Excluído com sucesso" });
    } catch (error) {
        if (error.status === 404) return res.status(404).json({ message: error.message });
        return res.status(500).json({ message: "Erro ao deletar empréstimo" });
    }
};

const buscarPorUsuario = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const lista = await listarPorUsuario(usuario_id);
        return res.status(200).json(lista);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar empréstimos do usuário" });
    }
};

module.exports = { criar, listar, buscarPorId, devolver, atualizar, deletar, buscarPorUsuario };