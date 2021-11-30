
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const Promise = require('bluebird');
global.Promise = Promise;
const appConfigs = require('./../config/app');



module.exports = async (imagePath, imageName, imagesFolder, datesFolder) => {
    const imageSizes = appConfigs.image_sizes;
    const imageSizesArray = [];
    for (let k in imageSizes) {
        if (imageSizes.hasOwnProperty(k) && imageSizes[k].name !== 'original') {
            imageSizesArray.push(imageSizes[k]);

            let filePath = path.join(__dirname, `./../uploads/${imagesFolder}`);
            filePath += '/' + imageSizes[k].name;
            if (!await fs.existsSync(filePath)) {
                await fs.mkdirSync(filePath);
            }
            if (datesFolder) {
                filePath += '/' + datesFolder;
                if (!await fs.existsSync(filePath)) {
                    await fs.mkdirSync(filePath);
                }
            }
        }
    }

    await Promise.map(imageSizesArray, async function(imageSize) {
        let resizedImagePath = '';
        if (datesFolder) {
            resizedImagePath = path.join(__dirname, `./../uploads/${imagesFolder}/${imageSize.name}/${datesFolder}/${imageName}`);
        } else {
            resizedImagePath = path.join(__dirname, `./../uploads/${imagesFolder}/${imageSize.name}/${imageName}`);
        }

        return await sharp(imagePath, { failOnError: false })
            .resize(imageSize.width, imageSize.height)
            .toFile(resizedImagePath);
    });
};
