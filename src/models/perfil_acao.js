module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('PerfilAcao', {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false
      },
      id_perfil: {
        type: DataTypes.CHAR(36),
        allowNull: false
      },
      id_acao: {
        type: DataTypes.CHAR(36),
        allowNull: false
      },
    }, {
      tableName: 'perfil_acao',
    });
    model.associate = (models) => {
      model.belongsTo(models.Perfil, { foreignKey: { name: 'id_perfil', allowNull: false } });
      model.belongsTo(models.Acao, { foreignKey: { name: 'id_acao', allowNull: false } });
    };
    return model;
  };
  