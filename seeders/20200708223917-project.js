'use strict';

const faker = require('faker');
const appConfigs = require('./../config/app');
const helper = require('./../utilities/helper');
const fs = require('fs');
const path = require('path');
const multiSharp = require('./../utilities/multi-sharp');
const moment = require('moment');



module.exports = {
  up: async (queryInterface, Sequelize) => {
      const projects = [];
      const now = new Date();
      const statuses = [0, 1, 2];
      const randomUniqueCodes = [];

      const imageExtension = '.jpg';
      const datesFolder = moment().format('YYYYMMDD');
      for (let i = 0; i < appConfigs.seed.project.count; i++)
      {
          let images = [];

          // cover image
          let coverImageName = helper.random_string(appConfigs.image_name_length) + imageExtension;
          let randomNumber = Math.floor(Math.random() * appConfigs.seed.project.random_images_count) + 1;
          let imagePath = path.join(__dirname, `./../public/seed-images/projects/project-${randomNumber}${imageExtension}`);
          let imagesFolder = appConfigs.uploads.project_images;
          await fs.copyFileSync(imagePath, path.join(__dirname, `./../uploads/${imagesFolder}/original/${datesFolder}/${coverImageName}`));
          await multiSharp(imagePath, coverImageName, imagesFolder, datesFolder);

          // images
          let projectImagesCount = Math.floor(Math.random() * appConfigs.seed.project.images_max_count) + 1;
          for (let j = 0; j < projectImagesCount; j++)
          {
              let imageName = helper.random_string(appConfigs.image_name_length) + imageExtension;
              randomNumber = Math.floor(Math.random() * appConfigs.seed.project.random_images_count) + 1;
              imagePath = path.join(__dirname, `./../public/seed-images/projects/project-${randomNumber}${imageExtension}`);
              imagesFolder = appConfigs.uploads.project_images;
              await fs.copyFileSync(imagePath, path.join(__dirname, `./../uploads/${imagesFolder}/original/${datesFolder}/${imageName}`));
              await multiSharp(imagePath, imageName, imagesFolder, datesFolder);

              images.push(datesFolder + '/' + imageName);
          }

          let code = 0;
          do {
              code = faker.datatype.number(appConfigs.project.p_code);
          } while (randomUniqueCodes.indexOf(code) !== -1)
          randomUniqueCodes.push(code);

          // Random point (approx. geo center of USA, 1000km radius) retrieved from Google Maps
          const randomLocation = helper.randomGeoPoint({ lat: 38.8005878, lng: -105.7607683 }, 1000 * 1000);
          const lat = randomLocation.lat.toFixed(appConfigs.location_decimal_length_after_dot);
          const lng = randomLocation.lng.toFixed(appConfigs.location_decimal_length_after_dot);

          projects.push({
              p_code: code,
              name: faker.company.companyName(),
              status: faker.random.arrayElement(statuses),
              description: faker.commerce.productDescription(),
              cover_image: datesFolder + '/' + coverImageName,
              images: JSON.stringify(images),
              contact_email: faker.internet.email(),
              contact_phone: faker.phone.phoneNumberFormat(),
              address: faker.address.streetAddress(),
              website: faker.internet.url(),
              lat: lat,
              lng: lng,
              created_at: now,
              updated_at: now,
          });
      }

      await queryInterface.bulkInsert('projects', projects, {}, );
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('projects', null, {}),
};
