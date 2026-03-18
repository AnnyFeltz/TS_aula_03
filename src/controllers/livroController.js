const { criarLivro } = require('../services/livroService');
const { buscarLivroId } = require('../services/livroService');

const criar = async (req, res) => {
    const { titulo, autor} = req.body;

    if(!titulo || !autor) return res.status(400)
        .json({ error: 'Título e autor são obrigatórios' });

    const livro = await criarLivro(titulo, autor);
    return res.status(201).json(livro);
}

const buscarId = async (req, res) => {
    const { id } = req.params;

    const livro = await buscarLivroId(id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });

    return res.status(200).json(livro);
}

module.exports = { criar, buscarId };