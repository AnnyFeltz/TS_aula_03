const { criarLivro } = require('../services/livroService');

const criar = async (req, res) => {
    const { titulo, autor} = req.body;

    if(!titulo || !autor) return res.status(400)
        .json({ error: 'Título e autor são obrigatórios' });

    const livro = await criarLivro(titulo, autor);
    res.status(201).json(livro);
}

module.exports = { criar };