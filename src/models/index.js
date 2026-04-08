const sequelize = require('../database/sequelize');
const Emprestimo = require('./Emprestimo');
const Livro = require('./Livro');
const Usuario = require('./Usuario');
<<<<<<< HEAD
=======
const Emprestimo = require('./Emprestimo');
//const Multa = require('./Multa'); // Futuro modelo para multas
>>>>>>> 3fd66dc69ef605f172e4d0017c688045d3463841

module.exports = {
  sequelize,
  Livro,
  Usuario,
  Emprestimo
<<<<<<< HEAD
=======
  //Multa
>>>>>>> 3fd66dc69ef605f172e4d0017c688045d3463841
};