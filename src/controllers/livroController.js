const { criarLivro } = require('../services/livroService');
const { buscarLivroId } = require('../services/livroService');

const criar = async (req, res) => {
    try {
        const { titulo, autor} = req.body;

        if(!titulo || !autor) return res.status(400).json({ error: 'Título e autor são obrigatórios' });

        const livro = await criarLivro(titulo, autor);
        return res.status(201).json(livro);
    }catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao criar o livro' });
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

module.exports = { criar, buscarId };