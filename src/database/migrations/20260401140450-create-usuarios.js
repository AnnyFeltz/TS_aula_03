'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('livros', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },
      tipo: {
        type: Sequelize.ENUM('aluno', 'professor', 'admin', 'funcionario', 'bibliotecario', 'visitante', 'outro', 'desconecido', 'voluntario', 'pesquisador', 'colaborador', 'membro', 'associado', 'participante', 'convidado', 'externo', 'interno', 'temporario', 'permanente'), //kkkkkkk a IA chegou no limite dela, parou de me recomendar 'tipos'
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('usuarios');
  }
};
