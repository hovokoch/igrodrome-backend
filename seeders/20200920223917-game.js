'use strict';

const {
    User,
    Project,
} = require('./../models');
const faker = require('faker');
const moment = require('moment');
const helper = require('./../utilities/helper');
const appConfigs = require('./../config/app');
const fs = require('fs');
const path = require('path');
const multiSharp = require('./../utilities/multi-sharp');



module.exports = {
  up: async (queryInterface, Sequelize) => {
      // const users = await User.findAll({
      //     attributes: ['id'],
      // });
      // const userIds = [];
      // users.map(user => {
      //     userIds.push(user.dataValues.id);
      // });
      // const usersCount = userIds.length;
      //
      // const projects = await Project.findAll({
      //     attributes: [
      //         'id',
      //     ]
      // });
      //
      // const games = [];
      // let date;
      // let gamesCountForUser;
      // let productsCountForGame;
      // let productsJson;
      // let quantity;
      // let randomUserNumber;
      // const datesFolder = moment().format('YYYYMMDD');
      //
      // for (let k in projectsJson) {
      //     productsJson = {};
      //
      //     gamesCountForUser = Math.floor(Math.random() * 5); // games count for user: 0-4
      //     for (let j = 0; j < gamesCountForUser; j++)
      //     {
      //         let imageExtension = '.jpg';
      //         let imageName = helper.random_string(appConfigs.image_name_length) + imageExtension;
      //         let randomNumber = Math.floor(Math.random() * appConfigs.seed.game.random_images_count) + 1;
      //         let imagePath = path.join(__dirname, `./../public/seed-images/games/game-${randomNumber}${imageExtension}`);
      //         let imagesFolder = appConfigs.uploads.game_images;
      //         await fs.copyFileSync(imagePath, path.join(__dirname, `./../uploads/${imagesFolder}/original/${datesFolder}/${imageName}`));
      //         await multiSharp(imagePath, imageName, imagesFolder, datesFolder);
      //
      //         productsCountForGame = Math.floor(Math.random() * projectsJson[k].length) + 1;
      //         let randomProjectProducts = faker.random.arrayElements(projectsJson[k], productsCountForGame); // get random products ids
      //
      //         for (let k = 0; k < randomProjectProducts.length; k++) {
      //             quantity = Math.floor(Math.random() * 20) + 1; // quantity for product: 1-20
      //             productsJson[randomProjectProducts[k].product_id] = quantity;
      //         }
      //
      //         let status = faker.random.arrayElement([0, 1, 2]);
      //         let point = 0;
      //         if (status === 1) {
      //             point = Math.floor(Math.random() * 10) + 1;
      //         }
      //         date = moment().format('YYYY-MM-DD');
      //
      //         randomUserNumber = Math.floor(Math.random() * usersCount);
      //
      //         games.push({
      //             user_id: userIds[randomUserNumber],
      //             project_id: projectsJson[k][0].project_id,
      //             products: JSON.stringify(productsJson),
      //             purchase: null,
      //             text: faker.commerce.productDescription(),
      //             image: datesFolder + '/' + imageName,
      //             status: status,
      //             point: point,
      //             created_at: new Date(date),
      //             updated_at: new Date(date),
      //         });
      //     }
      // }
      //
      // await queryInterface.bulkInsert('games', games, {}, );
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('games', null, {}),
};
