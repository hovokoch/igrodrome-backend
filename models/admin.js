'use strict';

module.exports = (sequelize, DataTypes) => {
  const now = new Date();
  const Admin = sequelize.define('Admin', {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // defaultValue: ''
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      // defaultValue: ''
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
    tableName: 'admins',
    freezeTableName: true,
    // underscored: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  Admin.associate = function (models) {
    Admin.hasMany(models.Permission, { as: 'permissions', foreignKey: 'admin_id' });
  };

  return Admin;
};
