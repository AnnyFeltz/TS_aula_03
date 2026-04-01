const Emprestimo = require('../models/Emprestimo');

class EmprestimoController {
  async criar(req, res) {
    try {
      const { livro_id, usuario_id, data_devolucao_prevista } = req.body;

      // Validação para os testes que esperam erro 400
      if (!livro_id || !usuario_id || !data_devolucao_prevista) {
        return res.status(400).json({ error: "Dados obrigatórios ausentes" });
      }

      // Verificar se o livro já está emprestado (status ATIVO)
      const jaEmprestado = await Emprestimo.findOne({ 
        where: { livro_id, status: 'ATIVO' } 
      });

      if (jaEmprestado) {
        return res.status(400).json({ error: "Livro já está emprestado" });
      }

      const novoEmprestimo = await Emprestimo.create({
        livro_id,
        usuario_id,
        data_devolucao_prevista,
        data_emprestimo: new Date()
      });

      return res.status(201).json(novoEmprestimo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET 
  async listar(req, res) {
    const lista = await Emprestimo.findAll();
    return res.status(200).json(lista);
  }

  // GET /emprestimos/:id
  async buscarPorId(req, res) {
    const { id } = req.params;
    const emprestimo = await Emprestimo.findByPk(id);

    if (!emprestimo) {
      return res.status(404).json({ error: "Empréstimo não encontrado" });
    }

    return res.status(200).json(emprestimo);
  }

  // PUT /emprestimos/:id/devolver
  async devolver(req, res) {
    const { id } = req.params;
    const emprestimo = await Emprestimo.findByPk(id);

    if (!emprestimo) {
      return res.status(404).json({ error: "Empréstimo não encontrado" });
    }

    emprestimo.status = 'DEVOLVIDO';
    emprestimo.data_devolucao_real = new Date();
    await emprestimo.save();

    return res.status(200).json(emprestimo);
  }

  // DELETE /emprestimos/:id
  async excluir(req, res) {
    const { id } = req.params;
    const emprestimo = await Emprestimo.findByPk(id);

    if (!emprestimo) {
      return res.status(404).json({ error: "Empréstimo não encontrado" });
    }

    await emprestimo.destroy();
    return res.status(200).send(); 
  }

  // GET /emprestimos/usuario/:usuario_id
  async listarPorUsuario(req, res) {
    const { usuario_id } = req.params;
    const lista = await Emprestimo.findAll({ where: { usuario_id } });
    return res.status(200).json(lista);
  }
}

module.exports = new EmprestimoController();