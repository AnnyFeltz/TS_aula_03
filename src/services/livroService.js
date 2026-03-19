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

<<<<<<< HEAD
const atualizarLivro = async (id, titulo, autor) => {
    const livro = await Livro.findByPk(id);
    if (!livro) return null;

    await livro.update({ titulo, autor });
    return {
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
    };
}

module.exports = { criarLivro, buscarLivroId, atualizarLivro };
=======
module.exports = { criarLivro, buscarLivroId};
>>>>>>> 3430c52f9fd3489737cd4c6d2c5850a004b5dd6e
