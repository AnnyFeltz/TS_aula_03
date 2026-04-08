const { Emprestimo } = require('../models'); // Importação padrão do Sequelize (via index)

class EmprestimoController {
  
  // POST /emprestimos
  async criar(req, res) {
    try {
      const { livro_id, usuario_id, data_devolucao_prevista } = req.body;

      // Validação para os testes que esperam erro 400
      if (!livro_id || !usuario_id || !data_devolucao_prevista) {
        return res.status(400).json({ error: "Dados obrigatórios ausentes" });
      }

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
  data_emprestimo: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
  status: 'ATIVO'
});

      return res.status(201).json(novoEmprestimo);
    } catch (error) {
      console.error("Erro ao criar empréstimo:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /emprestimos
  async listar(req, res) {
    try {
      const lista = await Emprestimo.findAll();
      return res.status(200).json(lista);
    } catch (error) {
      console.error("Erro ao listar empréstimos:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /emprestimos/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const emprestimo = await Emprestimo.findByPk(id);

      if (!emprestimo) {
        return res.status(404).json({ error: "Empréstimo não encontrado" });
      }

      return res.status(200).json(emprestimo);
    } catch (error) {
      console.error("Erro ao buscar empréstimo:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // PUT /emprestimos/:id/devolver
  async devolver(req, res) {
    try {
      const { id } = req.params;
      const emprestimo = await Emprestimo.findByPk(id);

      if (!emprestimo) {
        return res.status(404).json({ error: "Empréstimo não encontrado" });
      }

      emprestimo.status = 'DEVOLVIDO';
      emprestimo.data_devolucao_real = new Date();
      await emprestimo.save();

      return res.status(200).json(emprestimo);
    } catch (error) {
      console.error("Erro ao devolver empréstimo:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE /emprestimos/:id
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
  }

  // GET /emprestimos/usuario/:usuario_id
  async listarPorUsuario(req, res) {
    try {
      const { usuario_id } = req.params;
      const lista = await Emprestimo.findAll({ where: { usuario_id } });
      return res.status(200).json(lista);
    } catch (error) {
      console.error("Erro ao listar por usuário:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EmprestimoController();