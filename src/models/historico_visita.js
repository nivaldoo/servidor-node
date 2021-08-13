module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('HistoricoVisita', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    id_servico: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    indice: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'historico_visita',
  });
  model.associate = (models) => {
    model.belongsTo(models.Usuario, { foreignKey: { name: 'id_usuario', allowNull: false } });
    model.belongsTo(models.Servico, { foreignKey: { name: 'id_servico', allowNull: false } });
  };
  return model;
};
