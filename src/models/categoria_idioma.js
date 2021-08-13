module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('CategoriaIdioma', {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      id_categoria: {
        type: DataTypes.CHAR(36),
        allowNull: false
      },
      id_idioma: {
        type: DataTypes.CHAR(36),
        allowNull: false
      },
    }, {
      tableName: 'categoria_idioma',
    });
    model.associate = (models) => {
      model.belongsTo(models.Idioma, { foreignKey: { name: 'id_idioma', allowNull: false } });
      model.belongsTo(models.Categoria, { foreignKey: { name: 'id_categoria', allowNull: false } });
    };
    return model;
  };
  