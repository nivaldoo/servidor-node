module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('SubcategoriaIdioma', {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      id_subcategoria: {
        type: DataTypes.CHAR(36),
        allowNull: false
      },
      id_idioma: {
        type: DataTypes.CHAR(36),
        allowNull: false
      },
    }, {
      tableName: 'subcategoria_idioma',
    });
    model.associate = (models) => {
      model.belongsTo(models.Idioma, { foreignKey: { name: 'id_idioma', allowNull: false } });
      model.belongsTo(models.Subcategoria, { foreignKey: { name: 'id_subcategoria', allowNull: false } });
    };
    return model;
  };
  