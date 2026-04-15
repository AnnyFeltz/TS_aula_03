const sequelize = require('../database/sequelize');
const Emprestimo = require('./Emprestimo');
const Livro = require('./Livro');
const Usuario = require('./Usuario');
const Multa = require('./Multa');

module.exports = {
  sequelize,
  Livro,
  Usuario,
  Emprestimo,
  Multa
};