module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Acao', {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      alias: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, {
      tableName: 'acao',
    });
    model.associate = (models) => {
      model.hasMany(models.PerfilAcao, { foreignKey: { name: 'id_acao', allowNull: false } });
    };
    return model;
  };
  