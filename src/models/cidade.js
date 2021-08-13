module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Cidade', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id_uf: {
      type: DataTypes.CHAR(36),
      allowNull: false
    }
  }, {
    tableName: 'cidade',
  });
  model.associate = (models) => {
    model.belongsTo(models.Uf, { foreignKey: { name: 'id_uf', allowNull: false } });
    model.hasMany(models.Pessoa, { foreignKey: { name: 'id_cidade', allowNull: false } });
    model.hasMany(models.Servico, { foreignKey: { name: 'id_cidade', allowNull: true } });
  };
  return model;
};
