module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Servico', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    id_subcategoria: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    website: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    disponibilidade: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    duracao: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    mesmo_endereco: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    endereco: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    numero: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    bairro: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    complemento: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    id_cidade: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    valor: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false
    },
    foto: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    id_pessoa: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    youtube: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tipo: {
      type: DataTypes.CHAR(1),
      allowNull: false
    }
  }, {
    tableName: 'servico',
  });
  model.associate = (models) => {
    model.hasMany(models.Favorito, { foreignKey: { name: 'id_servico', allowNull: true } }, { onDelete: 'cascade' });
    model.hasMany(models.HistoricoVisita, { foreignKey: { name: 'id_servico', allowNull: true } }, { onDelete: 'cascade' });
    model.belongsTo(models.Pessoa, { foreignKey: { name: 'id_pessoa', allowNull: false } });
    model.belongsTo(models.Cidade, { foreignKey: { name: 'id_cidade', allowNull: true } });
    model.belongsTo(models.Subcategoria, { foreignKey: { name: 'id_subcategoria', allowNull: false } });
  };
  return model;
};
