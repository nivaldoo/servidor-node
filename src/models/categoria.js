module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Categoria', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    destaque: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'categoria',
  });
  model.associate = (models) => {
    model.hasMany(models.Subcategoria, { foreignKey: { name: 'id_categoria', allowNull: false } });
    model.hasMany(models.CategoriaIdioma, { foreignKey: { name: 'id_categoria', allowNull: false } });
  };
  return model;
};
