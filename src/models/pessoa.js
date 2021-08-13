module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Pessoa', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false
    },
    nome_social: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    },
    id_faixa_etaria: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    nome_fantasia: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_numero_funcionario: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    celular: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    id_estado_civil: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    id_qtd_filhos: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    id_renda: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    id_genero: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    id_raca: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    bairro: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    complemento: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    id_cidade: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    foto: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    autobiografia: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    facebook: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rodada_capacidade_atendimento: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rodada_caracteristica_tecnica: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    importacao: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    afroestima: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'pessoa',
  });
  model.associate = (models) => {
    model.hasMany(models.Servico, { foreignKey: { name: 'id_pessoa', allowNull: false } });
    model.hasMany(models.Favorito, { foreignKey: { name: 'id_pessoa', allowNull: true } });
    model.hasOne(models.Usuario, { foreignKey: { name: 'id_pessoa', allowNull: true } });
    model.belongsTo(models.Cidade, { foreignKey: { name: 'id_cidade', allowNull: false } });
    model.belongsTo(models.EstadoCivil, { foreignKey: { name: 'id_estado_civil', allowNull: false } });
    model.belongsTo(models.QuantidadeFilhos, { foreignKey: { name: 'id_qtd_filhos', allowNull: false } });
    model.belongsTo(models.RendaFamiliar, { foreignKey: { name: 'id_renda', allowNull: false } });
    model.belongsTo(models.Genero, { foreignKey: { name: 'id_genero', allowNull: true } });
    model.belongsTo(models.Raca, { foreignKey: { name: 'id_raca', allowNull: true } });
    model.belongsTo(models.FaixaEtaria, { foreignKey: { name: 'id_faixa_etaria', allowNull: true } });
    model.belongsTo(models.NumeroFuncionario, { foreignKey: { name: 'id_numero_funcionario', allowNull: true } });
  };
  return model;
};
