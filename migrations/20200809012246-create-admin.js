'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // onDelete: 'CASCADE',
        references: {
          model: 'roles',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: ''
      },
      email: {
        type: Sequelize.STRING(250),
        allowNull: false,
        // defaultValue: ''
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        // defaultValue: ''
      },
      status: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        // defaultValue: now,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        // defaultValue: now,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('admins');
  }
};
