const { Livro } = require('../models');

const criarLivro = async (titulo, autor) => {
    const livro = await Livro.create({ titulo, autor });
    return {
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
    };
}

const buscarLivroId = async (id) => {
    const livro = await Livro.findByPk(id);
    return livro ? {
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
    } : null;
}

module.exports = { criarLivro, buscarLivroId};