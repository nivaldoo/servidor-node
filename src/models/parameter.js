module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Parameters', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    withdrawal_without_invoice: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    default_max_overdue_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
    cnab_layout: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  }, {
    tableName: 'parameters',
  });
  model.associate = (models) => {
  };
  return model;
};
