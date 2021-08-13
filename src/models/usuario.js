module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Usuario', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    id_perfil: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    },
    foto: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    id_pessoa: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    senha: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    chave_integracao: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
  }, {
    tableName: 'usuario',
  });
  model.associate = (models) => {
    model.hasMany(models.Favorito, { foreignKey: { name: 'id_usuario', allowNull: false } });
    model.belongsTo(models.Pessoa, { foreignKey: { name: 'id_pessoa', allowNull: true } });
    model.belongsTo(models.Perfil, { foreignKey: { name: 'id_perfil', allowNull: false } });
  };
  return model;
};
