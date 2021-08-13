module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Uf', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sigla: {
      type: DataTypes.STRING(2),
      allowNull: false
    }
  }, {
    tableName: 'uf',
  });
  model.associate = (models) => {
    model.hasMany(models.Cidade, { foreignKey: { name: 'id_uf', allowNull: false } });
  };
  return model;
};
