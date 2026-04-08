const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Multa = sequelize.define('Multa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emprestimo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_devolucao_prevista: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  data_devolucao_real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  valor_multa: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  }
}, {
  tableName: 'multas',
  timestamps: true,
  underscored: false,
});

module.exports = Multa;