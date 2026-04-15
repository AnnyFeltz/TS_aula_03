const { calcularValorMulta, criarMulta, listarMultas, buscarMultaId, buscarMultaUsuario, buscarMultaEmprestimo, valorMulta, atualizarMulta, quitarMulta, deletarMulta} = require('../services/multaService');

const criar = async (req, res) => {
    try {
        const { emprestimo_id, usuario_id, data_devolucao_prevista, data_devolucao_real } = req.body;

        if (!emprestimo_id || !usuario_id || !data_devolucao_prevista || !data_devolucao_real) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
        }

        const valor_multa = calcularValorMulta(data_devolucao_prevista, data_devolucao_real); 
        const multa = await criarMulta(emprestimo_id, usuario_id, data_devolucao_prevista, data_devolucao_real, valor_multa );
        return res.status(201).json({
            ...multa,
            message: valor_multa === 0 
                ? 'Livro devolvido dentro do prazo'
                : 'Multa aplicada no valor de R$ ' + valor_multa.toFixed(2)
        });
    } catch (error) {
        console.error('Erro ao criar multa:', error);
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

const buscarUsuario = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const multas = await buscarMultaUsuario(usuario_id);

        if (multas.length === 0) return res.status(404).json({ error: 'Nenhuma multa encontrada para este usuário' });

        return res.status(200).json(multas);
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar as multas do usuário' });
    }
}

const buscarEmprestimo = async (req, res) => {
    try {
        const { emprestimo_id } = req.params;
        const multa = await buscarMultaEmprestimo(emprestimo_id);

        if (!multa) return res.status(404).json({ error: 'Nenhuma multa encontrada para este empréstimo' });

        return res.status(200).json(multa);
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar a multa do empréstimo' });
    }
}

const valorDaMulta = async (req, res) => {
    try {
        const { id } = req.params;
        const valor = await valorMulta(id);

        if (valor === null) return res.status(404).json({ error: 'Multa não encontrada' });

        return res.status(200).json({ valor_multa: valor });
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao calcular o valor da multa' });
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

const quitar = async (req, res) => {
    try {
        const { id } = req.params;
        const multa = await quitarMulta(id);

        if (!multa) return res.status(404).json({ error: 'Multa não encontrada para quitar' });

        return res.status(200).json({ message: 'Multa quitada com sucesso', multa });
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao quitar a multa' });
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

module.exports = { criar, listar, buscarId, buscarUsuario, buscarEmprestimo, valorDaMulta, atualizar, quitar, deletar};