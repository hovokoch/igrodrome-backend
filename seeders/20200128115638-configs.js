'use strict';

const appConfigs = require('./../config/app');
const fs = require('fs');
const path = require('path');
const moment = require('moment');



module.exports = {
  up: async () => {
      const folders = appConfigs.uploads;
      const imageSizes = appConfigs.image_sizes;
      const datesFolder = moment().format('YYYYMMDD');

      // Recreate (delete if exists, and create that after that again) uploads folders contents recursively
      for (let alias in folders) {
          if (folders.hasOwnProperty(alias)) {
              let folderPath = path.join(__dirname, './../uploads/' + folders[alias]);
              if (await fs.existsSync(folderPath)) {
                  await fs.rmdirSync(folderPath, { recursive: true });
              }
              await fs.mkdirSync(folderPath);

              for (let imageSize in imageSizes) {
                  if (imageSizes.hasOwnProperty(imageSize)) {
                      let subFolderPath = path.join(folderPath, imageSize);
                      if (!await fs.existsSync(subFolderPath)) {
                          await fs.mkdirSync(subFolderPath);
                      }
                      let subDatesFolderPath = path.join(subFolderPath, datesFolder);
                      if (!await fs.existsSync(subDatesFolderPath)) {
                          await fs.mkdirSync(subDatesFolderPath);
                      }
                  }
              }
          }
      }
  },
  down: async () => {
      // the same as for "up" function
  },
};
