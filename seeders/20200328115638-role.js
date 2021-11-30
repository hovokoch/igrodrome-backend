'use strict';

const {
    Role,
} = require('./../models');



module.exports = {
  up: async (queryInterface, Sequelize) => {
      const now = new Date();

      await Role.create({
          name: "Customer Role 1",
          alias: 'customer_role_1',
          priority: 10,
          created_at: now,
          updated_at: now,
      });
      await Role.create({
          name: "Customer Role 2",
          alias: 'customer_role_2',
          priority: 20,
          created_at: now,
          updated_at: now,
      });
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('roles', null, {}),
};
