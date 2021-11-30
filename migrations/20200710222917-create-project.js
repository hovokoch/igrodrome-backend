'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      p_code: {
        type: Sequelize.INTEGER(6),
        unique: true,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: ''
      },
      status: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      cover_image: {
        type: Sequelize.STRING(250),
        allowNull: true,
        // defaultValue: ''
      },
      images: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: '[]'
        // get: function () {
        //   return JSON.parse(this.getDataValue('images'));
        // },
        // set: function (value) {
        //   this.setDataValue('images', JSON.stringify(value));
        // }
      },
      contact_email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        // defaultValue: ''
      },
      contact_phone: {
        type: Sequelize.STRING(30),
        allowNull: true,
        // defaultValue: ''
      },
      address: {
        type: Sequelize.STRING(250),
        allowNull: true,
        // defaultValue: ''
      },
      website: {
        type: Sequelize.STRING(100),
        allowNull: true,
        // defaultValue: ''
      },
      created_at: {
        allowNull: false,
        // defaultValue: now,
        type: Sequelize.DATE
      },
      lat: {
        type: Sequelize.DECIMAL(11, 6),
        allowNull: false
      },
      lng: {
        type: Sequelize.DECIMAL(11, 6),
        allowNull: false
      },
      updated_at: {
        allowNull: false,
        // defaultValue: now,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projects');
  }
};
