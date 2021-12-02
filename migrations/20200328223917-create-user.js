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
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(250),
        allowNull: false,
        // defaultValue: ''
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
        // defaultValue: ''
      },
      auth_provider: { // TODO: change the type to enum (in model too)
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
      gender: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        // defaultValue: 0
      },
      avatar: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
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
    return queryInterface.dropTable('users');
  }
};
