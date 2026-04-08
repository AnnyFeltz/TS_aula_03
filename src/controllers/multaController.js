const { calcularValorMulta, criarMulta, listarMultas, buscarMultaId, atualizarMulta, deletarMulta, valorMulta} = require('../services/multaService');

const criar = async (req, res) => {
    try {
        const { emprestimo_id, usuario_id, data_devolucao_prevista, data_devolucao_real} = req.body;
        
        if(!emprestimo_id || !usuario_id || !data_devolucao_prevista || !data_devolucao_real) return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

        const valor_multa = calcularValorMulta(data_devolucao_prevista, data_devolucao_real);

        if (valor_multa < 0) return res.status(400).json({ error: 'Não há atraso, portanto não há multa a ser calculada' });

        const multa = await criarMulta(emprestimo_id, usuario_id, data_devolucao_prevista, data_devolucao_real, valor_multa);
        return res.status(201).json(multa);
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao criar a multa' });
    }
}

const listar = async (_, res) => {
    try {
        const multas = await listarMultas();

        if (multas.length === 0) return res.status(404).json({ error: 'Nenhuma multa encontrado' });

        return res.status(200).json(multas);
    }catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao listar as multas' });
    }
}

const buscarId = async (req, res) => {
    try {
        const { id } = req.params;
        const multa = await buscarMultaId(id);

        if (!multa) return res.status(404).json({ error: 'Multa não encontrada' });

        return res.status(200).json(multa);
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar a multa' });
    }
}

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { emprestimo_id, usuario_id, data_devolucao_prevista, data_devolucao_real, valor_multa } = req.body;

        const multa = await atualizarMulta(id, emprestimo_id, usuario_id, data_devolucao_prevista, data_devolucao_real, valor_multa);

        if (!multa) return res.status(404).json({ error: 'Multa não encontrada' });
        if (!emprestimo_id && !usuario_id && !data_devolucao_prevista && !data_devolucao_real && !valor_multa) return res.status(400).json({ error: 'Pelo menos um campo deve ser fornecido para atualização' });

        return res.status(200).json({ id, emprestimo_id, usuario_id, data_devolucao_prevista, data_devolucao_real, valor_multa });
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao atualizar a multa' });
    }
}

const deletar = async (req, res) => {
    try {
        const { id } = req.params;         
        const multa = await deletarMulta(id);

        if (!multa) return res.status(404).json({ error: 'Multa não encontrada' });

        return res.status(200).json({ message: 'Multa deletada com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao deletar a multa' });
    }

}

module.exports = { criar, listar, buscarId, atualizar, deletar};