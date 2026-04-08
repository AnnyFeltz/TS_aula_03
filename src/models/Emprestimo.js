const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Emprestimo = sequelize.define('Emprestimo', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    livro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Data em que o livro foi pego
    data_emprestimo: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    // Data máxima para devolver (esperada pelo teste de POST)
    data_devolucao_prevista: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    // Data em que o usuário realmente devolveu
    data_devolucao_real: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'ATIVO', 
    }
}, {
    tableName: 'emprestimos',
    timestamps: true,
    underscored: true, 
});

module.exports = Emprestimo;