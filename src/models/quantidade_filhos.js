module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('QuantidadeFilhos', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'quantidade_filhos',
  });
  model.associate = (models) => {
    model.hasMany(models.Pessoa, { foreignKey: { name: 'id_qtd_filhos', allowNull: false } });
  };
  return model;
};
