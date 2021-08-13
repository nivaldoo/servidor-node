module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('NumeroFuncionario', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
  }, {
    tableName: 'numero_funcionario',
  });
  model.associate = (models) => {
    model.hasMany(models.Pessoa, { foreignKey: { name: 'id_numero_funcionario', allowNull: true } });
  };
  return model;
};
