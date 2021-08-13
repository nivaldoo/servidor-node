module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Perfil', {
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
    tableName: 'perfil',
  });
  model.associate = (models) => {
    model.hasMany(models.Usuario, { foreignKey: { name: 'id_perfil', allowNull: false } });
    model.hasMany(models.PerfilAcao, { foreignKey: { name: 'id_perfil', allowNull: false } });
  };
  return model;
};
