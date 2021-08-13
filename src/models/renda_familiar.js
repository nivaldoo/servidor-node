module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('RendaFamiliar', {
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
    tableName: 'renda_familiar',
  });
  model.associate = (models) => {
    model.hasMany(models.Pessoa, { foreignKey: { name: 'id_renda', allowNull: false } });
  };
  return model;
};
