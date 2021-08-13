module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('EstadoCivil', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'estado_civil',
  });
  model.associate = (models) => {
    model.hasMany(models.Pessoa, { foreignKey: { name: 'id_estado_civil', allowNull: false } });    
  };
  return model;
};
