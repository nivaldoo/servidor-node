module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Idioma', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    globalizacao: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'idioma',
  });
  model.associate = (models) => {
  };
  return model;
};
