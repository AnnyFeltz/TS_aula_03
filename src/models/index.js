const sequelize = require('../database/sequelize');
const Emprestimo = require('./Emprestimo');
const Livro = require('./Livro');
const Usuario = require('./Usuario');

module.exports = {
  sequelize,
  Livro,
  Usuario,
  Emprestimo
};