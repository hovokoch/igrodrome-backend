'use strict';

module.exports = (sequelize, DataTypes) => {
  const now = new Date();
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: ''
    },
    alias: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER, // (3),
      allowNull: false
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
    tableName: 'roles',
    freezeTableName: true,
    // underscored: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  Role.associate = function (models) {
    Role.hasMany(models.User, { as: 'users', foreignKey: 'role_id' });
    Role.hasMany(models.Permission, { as: 'permissions', foreignKey: 'role_id' });
  };

  return Role;
};
