module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Genero', {
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
    tableName: 'genero',
  });
  model.associate = (models) => {
    model.hasMany(models.Pessoa, { foreignKey: { name: 'id_genero', allowNull: true } });
  };
  return model;
};
