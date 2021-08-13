module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Raca', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'raca',
  });
  model.associate = (models) => {
    model.hasMany(models.Pessoa, { foreignKey: { name: 'id_raca', allowNull: true } });
  };
  return model;
};
