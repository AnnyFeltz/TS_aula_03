const { Livro } = require('../models');

const criarLivro = async (titulo, autor) => {
    const livro = await Livro.create({ titulo, autor });
    return {
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
    };
}

//mudar para ser só disponiveis
const listarLivros = async () => {
    const livros = await Livro.findAll();
    return livros ? livros.map(livro => ({
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
    })) : [];
}

const buscarLivroId = async (id) => {
    const livro = await Livro.findByPk(id);
    return livro ? {
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
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
        };
    }   
}

const deletarLivro = async (id) => {
    const livro = await Livro.findByPk(id);
    if (livro) {
        await livro.destroy();
        return true;
    }
    return false;
};

module.exports = { criarLivro, listarLivros, buscarLivroId, atualizarLivro, deletarLivro };