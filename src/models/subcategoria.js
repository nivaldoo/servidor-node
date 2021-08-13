module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Subcategoria', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id_categoria: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    destaque: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'subcategoria',
  });
  model.associate = (models) => {
    model.hasMany(models.SubcategoriaIdioma, { foreignKey: { name: 'id_subcategoria', allowNull: false } });
    model.belongsTo(models.Categoria, { foreignKey: { name: 'id_categoria', allowNull: false } });
    model.hasMany(models.Servico, { foreignKey: { name: 'id_subcategoria', allowNull: false } });
  };
  return model;
};
