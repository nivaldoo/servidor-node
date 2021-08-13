module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('FaixaEtaria', {
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
    tableName: 'faixa_etaria',
  });
  model.associate = (models) => {
    model.hasMany(models.Pessoa, { foreignKey: { name: 'id_faixa_etaria', allowNull: true } });
  };
  return model;
};
