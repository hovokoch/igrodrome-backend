'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const now = new Date();
  const Project = sequelize.define('Project', {
    p_code: {
      type: DataTypes.INTEGER, // (6)
      unique: true,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: ''
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    cover_image: {
      type: DataTypes.STRING(250),
      allowNull: true,
      // defaultValue: ''
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: '[]'
    },
    contact_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      // defaultValue: ''
    },
    contact_phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
      // defaultValue: ''
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: true,
      // defaultValue: ''
    },
    website: {
      type: DataTypes.STRING(100),
      allowNull: true,
      // defaultValue: ''
    },
    lat: {
      type: DataTypes.DECIMAL, // (11, 6)
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL, // (11, 6)
      allowNull: false
    },
    created_at: {
      allowNull: false,
      defaultValue: now,
      type: DataTypes.DATE,
      get() {
        return moment(this.dataValues.created_at).format('D MMM YYYY'); // 'D MMM YYYY, LT'
      }
    },
    updated_at: {
      allowNull: false,
      defaultValue: now,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'projects',
    freezeTableName: true,
    // underscored: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  Project.associate = (models) => {
    Project.hasMany(models.Game, { as: 'games', foreignKey: 'project_id' });
  };

  return Project;
};
