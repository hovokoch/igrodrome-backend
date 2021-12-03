'use strict';

const {
  Game,
} = require('./../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();


    for (let i = 1; i < 16; i++) {
      await Game.create({
        creator_id: 2,
        owner_id: 2,
        name: "Game "+i,
        data: {
          counter: 1
        },
        file: 'file.zip',
        status: 1,
        created_at: now,
        updated_at: now,
      });
    }
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('games', null, {}),
};
