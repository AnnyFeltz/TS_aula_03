const { criarUsuario, listarUsuarios, buscarUsuarioId, atualizarUsuario, deletarUsuario} = require('../services/usuarioService');

const criar = async (req, res) => {
    try {
        const { nome, email, senha, tipo} = req.body;

        if(!nome || !email || !senha || !tipo) return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

        const usuario = await criarUsuario(nome, email, senha, tipo);
        return res.status(201).json(usuario);
    }catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao criar o usuario' });
    }
}

const listar = async (_, res) => {
    try {
        const usuarios = await listarUsuarios();

        if (usuarios.length === 0) return res.status(404).json({ error: 'Nenhum usuario encontrado' });

        return res.status(200).json(usuarios);
    }catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao listar os usuarios' });
    }
}

const buscarId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await buscarUsuarioId(id);

        if (!usuario) return res.status(404).json({ error: 'usuario não encontrado' });

        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar o usuario' });
    }
}


const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo } = req.body;

        const usuario = await atualizarUsuario(id, nome, email, senha, tipo);

        if (!usuario) return res.status(404).json({ error: 'usuario não encontrado' });
        if (!nome && !email && !senha && !tipo) return res.status(400).json({ error: 'Pelo menos um campo (título, email, senha ou tipo) deve ser fornecido para atualização' });

        return res.status(200).json({ id, nome, email, senha, tipo });
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao atualizar o usuario' });
    }
}

const deletar = async (req, res) => {
    try {
        const { id } = req.params;         
        const usuario = await deletarusuario(id);

        if (!usuario) return res.status(404).json({ error: 'usuario não encontrado' });

        return res.status(200).json({ message: 'usuario deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro ao deletar o usuario' });
    }

}

module.exports = { criar, listar, buscarId, atualizar, deletar};