'use strict';

module.exports = (sequelize, DataTypes) => {
  const now = new Date();
  const PermissionTemplate = sequelize.define('PermissionTemplate', {
    role_id: {
      type: DataTypes.INTEGER, // (11),
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    allow: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: 'permissions',
    freezeTableName: true,
    // underscored: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  PermissionTemplate.associate = function (models) {
    PermissionTemplate.belongsTo(models.Role, { as: 'role', foreignKey: 'role_id' });
  };

  return PermissionTemplate;
};
