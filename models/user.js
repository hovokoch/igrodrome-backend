'use strict';

module.exports = (sequelize, DataTypes) => {
  const now = new Date();
  const User = sequelize.define('User', {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: ''
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    auth_provider: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'email-pass'
    },
    email_token: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    email_token_count: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      allowNull: false,
      defaultValue: now,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: false,
      defaultValue: now,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'users',
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  User.associate = (models) => {
    User.hasMany(models.Game, { as: 'games', foreignKey: 'user_id' });
    User.belongsTo(models.Role, { as: 'role', foreignKey: 'role_id' });
  };

  return User;
};
