const Emprestimo = require('../models/');
const Emprestimo = require('../models/Emprestimo');

class EmprestimoService {
  async criar(dados) {
    const { livro_id, usuario_id, data_devolucao_prevista } = dados;
    if (!livro_id || !usuario_id || !data_devolucao_prevista) {
      const error = new Error("Campos obrigatórios ausentes");
      error.status = 400;
      throw error;
    }
    const jaEmprestado = await Emprestimo.findOne({ 
      where: { livro_id, status: 'ATIVO' } 
    });
    if (jaEmprestado) {
      const error = new Error("Este livro já possui um empréstimo ativo");
      error.status = 400;
      throw error;
    }
    return await Emprestimo.create({
      livro_id,
      usuario_id,
      data_devolucao_prevista,
      data_emprestimo: new Date(),
      status: 'ATIVO'
    });
  }
  async listarTodos() {
    return await Emprestimo.findAll();
  }
  async buscarPorId(id) {
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) {
      const error = new Error("Empréstimo não encontrado");
      error.status = 404;
      throw error;
    }
    return emprestimo;
  }
  async registrarDevolucao(id) {
    const emprestimo = await this.buscarPorId(id); 
    emprestimo.status = 'DEVOLVIDO';
    emprestimo.data_devolucao_real = new Date();
    await emprestimo.save();
    return emprestimo;
  }
  async deletar(id) {
    const emprestimo = await this.buscarPorId(id); 
    await emprestimo.destroy();
    return true;
  }
  async listarPorUsuario(usuario_id) {
    return await Emprestimo.findAll({ where: { usuario_id } });
  }
}
module.exports = new EmprestimoService();