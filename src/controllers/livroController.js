const { criarLivro, listarLivros, buscarLivroId, atualizarLivro, deletarLivro} = require('../services/livroService');

const criar = async (req, res) => {
    try {
        const { titulo, autor, disponivel } = req.body;

        if(!titulo || !autor) return res.status(400).json({ error: 'Título e autor são obrigatórios' });

        const livro = await criarLivro(titulo, autor, disponivel);
        return res.status(201).json(livro);
    }catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao criar o livro' });
    }
}

const listar = async (_, res) => {
    try {
        const livros = await listarLivros();

        if (livros.length === 0) return res.status(404).json({ error: 'Nenhum livro encontrado' });

        return res.status(200).json(livros);
    }catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao listar os livros' });
    }
}

const buscarId = async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await buscarLivroId(id);

        if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });

        return res.status(200).json(livro);
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar o livro' });
    }
}


const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor } = req.body;

        const livro = await atualizarLivro(id, titulo, autor);

        if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
        if (!titulo && !autor) return res.status(400).json({ error: 'Pelo menos um campo (título ou autor) deve ser fornecido para atualização' });

        return res.status(200).json({ id, titulo, autor });
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao atualizar o livro' });
    }
}

const deletar = async (req, res) => {
    try {
        const { id } = req.params;         
        const livro = await deletarLivro(id);

        if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });

        return res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao deletar o livro' });
    }

}

module.exports = { criar, listar, buscarId, atualizar, deletar};