const { Emprestimo } = require('../models');

class EmprestimoController {
  async criar(req, res) {
    try {
      const { livro_id, usuario_id, data_devolucao_prevista } = req.body;

      if (!livro_id || !usuario_id || !data_devolucao_prevista) {
        return res.status(400).json({ message: "Campos obrigatórios ausentes" });
      }

      const jaEmprestado = await Emprestimo.findOne({
        where: { livro_id, status: 'ATIVO' }
      });

      if (jaEmprestado) {
        return res.status(400).json({ message: "Este livro já possui um empréstimo ativo" });
      }

      const novoEmprestimo = await Emprestimo.create({
        livro_id,
        usuario_id,
        data_devolucao_prevista,
        data_emprestimo: new Date(),
        status: 'ATIVO'
      });

      return res.status(201).json(novoEmprestimo);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async listar(req, res) {
    const lista = await Emprestimo.findAll();
    return res.status(200).json(lista);
  }

  async buscarPorId(req, res) {
    const emprestimo = await Emprestimo.findByPk(req.params.id);
    if (!emprestimo) return res.status(404).json({ message: "Empréstimo não encontrado" });
    return res.status(200).json(emprestimo);
  }

  async devolver(req, res) {
    const emprestimo = await Emprestimo.findByPk(req.params.id);
    if (!emprestimo) return res.status(404).json({ message: "Empréstimo não encontrado" });
    
    emprestimo.status = 'DEVOLVIDO';
    emprestimo.data_devolucao_real = new Date();
    await emprestimo.save();
    return res.status(200).json(emprestimo);
  }

<<<<<<< HEAD
  async excluir(req, res) {
    try {
      const { id } = req.params;
      const emprestimo = await Emprestimo.findByPk(id);

      if (!emprestimo) {
        return res.status(404).json({ error: "Empréstimo não encontrado" });
      }

      await emprestimo.destroy();
      return res.status(200).send();
    } catch (error) {
      console.error("Erro ao excluir empréstimo:", error);
      return res.status(500).json({ error: error.message });
    }
=======
  async deletar(req, res) {
    const emprestimo = await Emprestimo.findByPk(req.params.id);
    if (!emprestimo) return res.status(404).json({ message: "Empréstimo não encontrado" });
    
    await emprestimo.destroy();
    return res.status(200).json({ message: "Excluído com sucesso" });
>>>>>>> cafd03d716a3bea41ce541265b07c4386ca9b159
  }

  async listarPorUsuario(req, res) {
    const lista = await Emprestimo.findAll({ where: { usuario_id: req.params.usuario_id } });
    return res.status(200).json(lista);
  }
}

module.exports = new EmprestimoController();