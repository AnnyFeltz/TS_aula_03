const { Multa } = require('../models');

const calcularValorMulta = (data_devolucao_prevista, data_devolucao_real) => {
    const dataPrevista = new Date(data_devolucao_prevista);
    const dataReal = new Date(data_devolucao_real);
    const diasAtraso = Math.ceil((dataReal - dataPrevista) / (1000 * 60 * 60 * 24));
    return diasAtraso > 0 ? diasAtraso * 2 : 0;
}

const criarMulta = async (emprestimo_id, usuario_id, data_devolucao_prevista, data_devolucao_real, valor_multa) => {
    const multa = await Multa.create({ emprestimo_id, usuario_id, data_devolucao_prevista, data_devolucao_real, valor_multa });
    return {
        id: multa.id,
        emprestimo_id: multa.emprestimo_id,
        usuario_id: multa.usuario_id,
        data_devolucao_prevista: multa.data_devolucao_prevista,
        data_devolucao_real: multa.data_devolucao_real,
        valor_multa: multa.valor_multa
    };
}

const listarMultas = async () => {
    const multas = await Multa.findAll();
    return multas ? multas.map(multa => ({
        id: multa.id,
        emprestimo_id: multa.emprestimo_id,
        usuario_id: multa.usuario_id,
        data_devolucao_prevista: multa.data_devolucao_prevista,
        data_devolucao_real: multa.data_devolucao_real,
    })) : [];
}

const buscarMultaId = async (id) => {
    const multa = await Multa.findByPk(id);
    return multa ? {
        id: multa.id,
        emprestimo_id: multa.emprestimo_id,
        usuario_id: multa.usuario_id,
        data_devolucao_prevista: multa.data_devolucao_prevista,
        data_devolucao_real: multa.data_devolucao_real,
    } : null;
}

const atualizarMulta = async (id, emprestimo_id, usuario_id, data_devolucao_prevista, data_devolucao_real) => {
    const multa = await Multa.findByPk(id);
    if (!multa){
        console.log(`Multa com id ${id} não encontrada.`);
        return null;   
    } else { 
        await multa.update({ emprestimo_id, usuario_id, data_devolucao_prevista, data_devolucao_real });
        return {
            id: multa.id,
            emprestimo_id: multa.emprestimo_id,
            usuario_id: multa.usuario_id,
            data_devolucao_prevista: multa.data_devolucao_prevista,
            data_devolucao_real: multa.data_devolucao_real,
        };
    }   
}

const deletarMulta = async (id) => {
    const multa = await Multa.findByPk(id);
    if (multa) {
        await multa.destroy();
        return true;
    }
    return false;
};

const valorMulta = async (id) => {
    const multa = await Multa.findByPk(id);
    if (!multa) {
        console.log(`Multa com id ${id} não encontrada para calcular o valor.`);
        return null;
    }
    return calcularValorMulta(multa.data_devolucao_prevista, multa.data_devolucao_real);
}

module.exports = { calcularValorMulta, criarMulta, listarMultas, buscarMultaId, atualizarMulta, deletarMulta, valorMulta };