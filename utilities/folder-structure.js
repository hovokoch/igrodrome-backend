
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const appConfigs = require('./../config/app');

module.exports = {
    user: async (req, res, next) => {
        const datesFolder = moment().format('YYYYMMDD');
        let filePath = path.join(__dirname, `./../uploads/${appConfigs.uploads.user_images}/original`);
        if (!await fs.existsSync(filePath)) {
            await fs.mkdirSync(filePath);
        }
        filePath += '/' + datesFolder;
        if (!await fs.existsSync(filePath)) {
            await fs.mkdirSync(filePath);
        }

        req.custom_dates_folder = datesFolder;

        next();
    },
    game: async (req, res, next) => {
        const datesFolder = moment().format('YYYYMMDD');
        let filePath = path.join(__dirname, `./../uploads/${appConfigs.uploads.game_images}/original`);
        if (!await fs.existsSync(filePath)) {
            await fs.mkdirSync(filePath);
        }
        filePath += '/' + datesFolder;
        if (!await fs.existsSync(filePath)) {
            await fs.mkdirSync(filePath);
        }

        req.custom_dates_folder = datesFolder;

        next();
    },
};
