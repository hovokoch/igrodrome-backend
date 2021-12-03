'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      auth_provider: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'email-pass'
      },
      email_token: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      email_token_count: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
