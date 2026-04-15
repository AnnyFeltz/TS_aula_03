const { Emprestimo } = require('../models');

const criarEmprestimo = async (dados) => {
    const { livro_id, usuario_id, data_devolucao_prevista } = dados;

    if (!livro_id || !usuario_id || !data_devolucao_prevista) {
        const error = new Error("Campos obrigatórios ausentes");
        error.status = 400;
        throw error;
    }

    const jaEmprestado = await Emprestimo.findOne({ 
        where: { livro_id, status: 'ATIVO' } 
    });

    if (jaEmprestado) {
        const error = new Error("Este livro já possui um empréstimo ativo");
        error.status = 400;
        throw error;
    }

    const emprestimo = await Emprestimo.create({
        livro_id,
        usuario_id,
        data_devolucao_prevista,
        data_emprestimo: new Date(),
        status: 'ATIVO'
    });

    return emprestimo;
};

const listarTodosEmprestimos = async () => {
    return await Emprestimo.findAll();
};

const buscarEmprestimoId = async (id) => {
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) {
        const error = new Error("Empréstimo não encontrado");
        error.status = 404;
        throw error;
    }
    return emprestimo;
};

const registrarDevolucao = async (id) => {
    const emprestimo = await buscarEmprestimoId(id); 
    
    await emprestimo.update({
        status: 'DEVOLVIDO',
        data_devolucao_real: new Date()
    });

    return emprestimo;
};

const atualizarEmprestimo = async (id, dados) => {
    const emprestimo = await buscarEmprestimoId(id); 
    const { data_devolucao_prevista } = dados;

    if (data_devolucao_prevista) {
        await emprestimo.update({ data_devolucao_prevista });
    }

    return emprestimo;
};

const deletarEmprestimo = async (id) => {
    const emprestimo = await buscarEmprestimoId(id); 
    await emprestimo.destroy();
    return true;
};

const buscarUsuarioID = async (usuario_id) => {
    return await Emprestimo.findAll({ where: { usuario_id } });
};

module.exports = { criarEmprestimo, listarTodosEmprestimos, buscarEmprestimoId, registrarDevolucao, atualizarEmprestimo, deletarEmprestimo, buscarUsuarioID };