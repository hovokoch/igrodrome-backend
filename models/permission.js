'use strict';

module.exports = (sequelize, DataTypes) => {
  const now = new Date();
  const Permission = sequelize.define('Permission', {
    user_id: {
      type: DataTypes.INTEGER, // (11),
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER, // (11),
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false
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

  Permission.associate = function (models) {
    Permission.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Permission;
};
