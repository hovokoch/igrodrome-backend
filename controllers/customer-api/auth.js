
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const appConfigs = require('./../../config/app');
const path = require('path');
const multiSharp = require('./../../utilities/multi-sharp');

const validate = require('./../../validations/customer/auth');
const {
    Customer,
} = require('./../../models');



module.exports = {
    register: async (req, res) => {
        // TODO: upload image only when validation passed
        const validationResult = validate.register(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const customer = validationResult.filteredData;

        const foundCustomer = await Customer.findOne({
            where: { email: customer.email }
        });
        if (foundCustomer) {
            return res.status(409).json({
                error: "Email already exists!"
            });
        } else {
            try {
                let imageName = null;
                if (req.file) {
                    imageName = req.file.filename;
                    let imagesFolder = appConfigs.uploads.customer_images;
                    let imagePath = path.join(__dirname, `./../../uploads/${imagesFolder}/original/${req.custom_dates_folder}/${imageName}`);
                    await multiSharp(imagePath, imageName, imagesFolder, req.custom_dates_folder);
                }
                const hashedPassword = await bcrypt.hash(customer.password, 10);
                await Customer.create({
                    ...customer,
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
            message: "Customer signed up successfully."
        });
    },
    login: async (req, res) => {
        const validationResult = validate.login(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const customer = validationResult.filteredData;

        const foundCustomer = await Customer.findOne({
            where: { email: customer.email }
        });
        if (!foundCustomer) {
            return res.status(403).json({
                error: "Incorrect email or/and password!"
            });
        }

        try {
            jwt.sign({
                id: foundCustomer.id,
                email: foundCustomer.email,
                avatar: foundCustomer.avatar,
                name: foundCustomer.name,
                role: foundCustomer.role
            }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRATION_TIME }, (err, token) => {
                if (err) {
                    return res.status(403).json({
                        error: "Something went wrong!" // 500
                    });
                }
                return res.status(200).json({
                    message: "Customer logged in successfully.",
                    name: foundCustomer.dataValues.name,
                    email: foundCustomer.dataValues.email,
                    token: token,
                    avatar: foundCustomer.dataValues.avatar,
                    address: foundCustomer.dataValues.address,
                    birth_date: foundCustomer.dataValues.birth_date,
                    gender: foundCustomer.dataValues.gender,
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
            const customer = {
                name: response.user.displayName,
                email: response.user.email,
                avatar: response.user.photoURL,
                // TODO: develop the fields below
                birth_date: "1990-08-25",
                gender: 1,
            };
            const foundCustomer = await Customer.findOne({ where: { email: response.user.email } });
            if (!foundCustomer) {
                await Customer.create(customer);
            }

            return res.status(200).json({
                ...customer,
                token: idToken,
            });
        } else {
            return res.status(403).json({
                error: "Something went wrong!" // 500
            });
        }
    },
};
