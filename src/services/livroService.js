const { Livro } = require('../models');

const criarLivro = async (titulo, autor) => {
    const livro = await Livro.create({ titulo, autor });
    return {
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
    };
}

module.exports = { criarLivro};