const { Usuario } = require('../models');

const criarUsuario = async (nome, email, senha, tipo) => {
    const usuario = await Usuario.create({ nome, email, senha, tipo });
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
    };
}

const listarUsuarios = async () => {
    const usuarios = await Usuario.findAll();
    return usuarios ? usuarios.map(usuario => ({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
    })) : [];
}

const buscarUsuarioId = async (id) => {
    const usuario = await Usuario.findByPk(id);
    return usuario ? {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
    } : null;
}

const atualizarUsuario = async (id, nome, email, senha, tipo) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario){
        console.log(`Usuario com id ${id} não encontrado.`);
        return null;   
    } else { 
        await usuario.update({ nome, email, senha, tipo });
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo,
        };
    }   
}

const deletarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.destroy();
        return true;
    }
    return false;
};

module.exports = { criarUsuario, listarUsuarios, buscarUsuarioId, atualizarUsuario, deletarUsuario };