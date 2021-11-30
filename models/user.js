'use strict';

module.exports = (sequelize, DataTypes) => {
  const now = new Date();
  const User = sequelize.define('User', {
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
      allowNull: false,
      // defaultValue: ''
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      // defaultValue: ''
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
    gender: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      // defaultValue: 0
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
    // underscored: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  User.associate = (models) => {
    User.hasMany(models.Game, { as: 'games', foreignKey: 'user_id' });
  };

  return User;
};
