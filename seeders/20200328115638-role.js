'use strict';

const {
    Role,
} = require('./../models');



module.exports = {
  up: async (queryInterface, Sequelize) => {
      const now = new Date();

      await Role.create({
          name: "Admin",
          alias: 'admin',
          priority: 10,
          created_at: now,
          updated_at: now,
      });
      await Role.create({
          name: "Creator",
          alias: 'creator',
          priority: 20,
          created_at: now,
          updated_at: now,
      });
      await Role.create({
          name: "Player",
          alias: 'player',
          priority: 30,
          created_at: now,
          updated_at: now,
      });
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('roles', null, {}),
};
