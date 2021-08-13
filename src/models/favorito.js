module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Favorito', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    id_pessoa: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    id_servico: {
      type: DataTypes.CHAR(36),
      allowNull: true
    }
  }, {
    tableName: 'favorito',
  });
  model.associate = (models) => {
    model.belongsTo(models.Usuario, { foreignKey: { name: 'id_usuario', allowNull: false } });
    model.belongsTo(models.Pessoa, { foreignKey: { name: 'id_pessoa', allowNull: true } });
    model.belongsTo(models.Servico, { foreignKey: { name: 'id_servico', allowNull: true } });
  };
  return model;
};
