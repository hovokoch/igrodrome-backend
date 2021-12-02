'use strict';

const bcrypt = require('bcrypt');
// TODO: JWT authenticate app
const faker = require('faker');

const {
    User,
} = require('./../models');



module.exports = {
  up: async (queryInterface, Sequelize) => {
      const now = new Date();

      const user1 = {
          email: process.env.DEV_USER_1_EMAIL ? process.env.DEV_USER_1_EMAIL : 'user1@gmail.com',
          password: process.env.DEV_USER_1_PASS ? process.env.DEV_USER_1_PASS : 'secret',
      };
      await User.create({
          role_id: 1,
          name: "User 1",
          // username: null,
          email: user1.email,
          password: await bcrypt.hash(user1.password, 10),
          avatar: null,
          address: faker.address.streetAddress(),
          gender: 1,
          birth_date: faker.date.between('1970-01-25', '2000-01-25'),
          // auth_provider: 'email-pass',
          // email_token: null,
          // email_token_count: 0,
          status: 1,
          created_at: now,
          updated_at: now,
      });
      try {
          // TODO: await JWT create user with user1.email and user1.password
      } catch (err) {
          console.log(err.message);
      }

      const user2 = {
          email: process.env.DEV_USER_2_EMAIL ? process.env.DEV_USER_2_EMAIL : 'user2@gmail.com',
          password: process.env.DEV_USER_2_PASS ? process.env.DEV_USER_2_PASS : 'secret',
      };
      await User.create({
          role_id: 2,
          name: "User 2",
          // username: null,
          email: user2.email,
          password: await bcrypt.hash(user2.password, 10),
          avatar: null,
          address: faker.address.streetAddress(),
          gender: 1,
          birth_date: faker.date.between('1970-01-25', '2000-01-25'),
          // auth_provider: 'email-pass',
          // email_token: null,
          // email_token_count: 0,
          status: 1,
          created_at: now,
          updated_at: now,
      });
      try {
          // TODO: await JWT create user with user2.email and user2.password
      } catch (err) {
          console.log(err.message);
      }
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
