
const multer = require('multer');
const path = require('path');
const appConfigs = require('./../config/app');

module.exports = {
    generateFilename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1];
        const dateField = (new Date().getTime() / 1000 | 0);
        const randomField = Math.random().toString(36).substring(2);
        const fileName = `${dateField}-${randomField}.${extension}`;
        cb(null, fileName);
    },
    userUpload: function () {
        return multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    const filePath = path.join(__dirname, `./../uploads/${appConfigs.uploads.user_images}/original/${req.custom_dates_folder}`);
                    cb(null, filePath);
                },
                filename: this.generateFilename
            }),
            limits: {
                fileSize: 1024 * 1024 * appConfigs.image_max_size // MB
            },
            fileFilter: (req, file, cb) => {
                let valid = (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png');
                cb(null, valid);
            },
        });
    },
    gameUpload: function () {
        return multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    const filePath = path.join(__dirname, `./../uploads/${appConfigs.uploads.game_images}/original/${req.custom_dates_folder}`);
                    cb(null, filePath);
                },
                filename: this.generateFilename
            }),
            limits: {
                fileSize: 1024 * 1024 * appConfigs.image_max_size // MB
            },
            fileFilter: (req, file, cb) => {
                let valid = (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png');
                cb(null, valid);
            },
        });
    },
};
