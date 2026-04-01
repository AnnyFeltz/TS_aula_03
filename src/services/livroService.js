const { Livro } = require('../models');

const criarLivro = async (titulo, autor, disponivel) => {
    const livro = await Livro.create({ titulo, autor, disponivel });
    return {
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
        disponivel: livro.disponivel,
    };
}

const listarLivros = async () => {
    const livros = await Livro.findAll({ where: { disponivel: true } });
    return livros ? livros.map(livro => ({
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
        disponivel: livro.disponivel,
    })) : [];
}

const buscarLivroId = async (id) => {
    const livro = await Livro.findByPk(id);
    return livro ? {
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
        disponivel: livro.disponivel,
    } : null;
}

const atualizarLivro = async (id, titulo, autor) => {
    const livro = await Livro.findByPk(id);
    if (!livro){
        console.log(`Livro com id ${id} não encontrado.`);
        return null;   
    } else { 
        await livro.update({ titulo, autor });
        return {
            id: livro.id,
            titulo: livro.titulo,
            autor: livro.autor,
            disponivel: livro.disponivel,
        };
    }   
}

const deletarLivro = async (id) => {
    const livro = await Livro.findByPk(id);
    if (livro && livro.disponivel) {
        await livro.destroy();
        return true;
    }
    return false;
};

module.exports = { criarLivro, listarLivros, buscarLivroId, atualizarLivro, deletarLivro };