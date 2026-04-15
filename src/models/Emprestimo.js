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
    data_emprestimo: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    data_devolucao_prevista: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
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

Emprestimo.associate = (models) => {
    Emprestimo.belongsTo(models.Livro, { foreignKey: 'livro_id' });
    Emprestimo.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    Emprestimo.hasOne(models.Multa, { foreignKey: 'emprestimo_id' });
}

module.exports = Emprestimo;