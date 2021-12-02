
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const appConfigs = require('./../../config/app');
const path = require('path');
const multiSharp = require('./../../utilities/multi-sharp');

const validate = require('./../../validations/user/auth');
const {
    User,
} = require('./../../models');



module.exports = {
    register: async (req, res) => {
        // TODO: upload image only when validation passed
        const validationResult = validate.register(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const user = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: { email: user.email }
        });
        if (foundUser) {
            return res.status(409).json({
                error: "Email already exists!"
            });
        } else {
            try {
                let imageName = null;
                if (req.file) {
                    imageName = req.file.filename;
                    let imagesFolder = appConfigs.uploads.user_images;
                    let imagePath = path.join(__dirname, `./../../uploads/${imagesFolder}/original/${req.custom_dates_folder}/${imageName}`);
                    await multiSharp(imagePath, imageName, imagesFolder, req.custom_dates_folder);
                }
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await User.create({
                    ...user,
                    password: hashedPassword,
                    avatar: imageName ? (req.custom_dates_folder + '/' + imageName) : null
                });
            } catch (err) {
                return res.status(403).json({
                    error: "Something went wrong!" // 500
                });
            }
        }

        return res.status(201).json({
            message: "User signed up successfully."
        });
    },
    login: async (req, res) => {
        const validationResult = validate.login(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const user = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: { email: user.email }
        });
        if (!foundUser) {
            return res.status(403).json({
                error: "Incorrect email or/and password!"
            });
        }

        try {
            jwt.sign({
                id: foundUser.dataValues.id,
                email: foundUser.dataValues.email,
                avatar: foundUser.dataValues.avatar,
                name: foundUser.dataValues.name,
                role: foundUser.dataValues.role,
            }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRATION_TIME }, (err, token) => {
                if (err) {
                    return res.status(403).json({
                        error: "Something went wrong!" // 500
                    });
                }
                return res.status(200).json({
                    message: "User logged in successfully.",
                    name: foundUser.dataValues.name,
                    email: foundUser.dataValues.email,
                    token: token,
                    avatar: foundUser.dataValues.avatar,
                    address: foundUser.dataValues.address,
                    birth_date: foundUser.dataValues.birth_date,
                    gender: foundUser.dataValues.gender,
                    role: foundUser.dataValues.role,
                });
            });
        } catch (err) {
            return res.status(403).json({
                error: "Something went wrong!" // 500
            });
        }
    },
    thirdPartyAuth: async (req, res) => {
        const validationResult = validate.thirdPartyAuth(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const data = validationResult.filteredData;

        // get "response" from JWT credentials

        if (true) {
            const user = {
                name: response.user.displayName,
                email: response.user.email,
                avatar: response.user.photoURL,
                // TODO: develop the fields below
                birth_date: "1990-08-25",
                gender: 1,
            };
            const foundUser = await User.findOne({ where: { email: response.user.email } });
            if (!foundUser) {
                await User.create(user);
            }

            return res.status(200).json({
                ...user,
                token: idToken,
            });
        } else {
            return res.status(403).json({
                error: "Something went wrong!" // 500
            });
        }
    },
};
