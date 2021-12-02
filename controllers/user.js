
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validate = require('./../validations/user');
const helper = require('./../utilities/helper');
const appConfigs = require('./../config/app');

const emailConfigs = require('../config/email');
const mailgun = require('mailgun-js');
const email = emailConfigs[process.env.NODE_ENV];
const mg = mailgun({ apiKey: email.api_key, domain: email.domain });
const inlineHtml = require('./../utilities/inline-html');
const path = require('path');
const multiSharp = require('./../utilities/multi-sharp');

const {
    User,
    Role,
} = require('./../models');



module.exports = {
    details: async (req, res) => {
        const foundUser = await User.findOne({
            where: {
                email: req.jwt_data.email,
            },
            include: [
                { model: Role, as: 'role'}
            ]
        });
        const roleData = foundUser.role.dataValues;

        return res.status(200).json({
            role_id: roleData.id,
            ...req.jwt_data,
        });
    },
    changePassword: async (req, res) => {
        const validationResult = validate.changePassword(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const data = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: { email: req.user.email },
            attributes: ['id', 'password'],
        });
        if (foundUser) {
            const match = await bcrypt.compare(data.old_password, foundUser.dataValues.password);

            if(match) {
                const hashedPassword = await bcrypt.hash(data.new_password, 10);
                await foundUser.update({
                    password: hashedPassword,
                    updated_at: new Date(),
                });

                return res.status(200).json({
                    message: "Password successfully changed."
                });
            } else {
                return res.status(403).json({
                    error: "Current password is incorrect!"
                });
            }
        } else {
            return res.status(409).json({
                error: "Something went wrong!" // 500
            });
        }
    },
    forgotPassword: async (req, res) => {
        const validationResult = validate.forgotPassword(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const data = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: { email: data.email },
        });
        if (!foundUser) {
            return res.status(409).json({
                error: "Something went wrong!"
            });
        }

        const emailTokenCount = foundUser.dataValues.email_token_count;
        if (emailTokenCount >= appConfigs.user_email_token_limit) {
            return res.status(403).json({
                error: "Forgot-Email requests limit expired!"
            });
        }

        const emailToken = helper.random_string(40);

        // TODO: replace config variables
        const forgotPasswordHtml = inlineHtml.forgotPassword({
            name: foundUser.dataValues.name,
            link: process.env.APP_SITE + 'user/forgot-password?email_token=' + emailToken,
            email_token: emailToken,
            year: (new Date()).getFullYear(),
            app_name: process.env.APP_NAME,
            site: process.env.APP_SITE,
            logo: process.env.APP_SITE + "logo-icon.png",
            source: req.useragent.source,
        });
        const emailData = {
            from: email.from_name,
            to: email.to_test_email ? email.to_test_email : data.email,
            subject: "Forgot Password?",
            text: `Hi ${foundUser.dataValues.name}`,
            html: forgotPasswordHtml
        };
        mg.messages().send(emailData, (err, body) => {
            if (body) {
                foundUser.update({ // TODO: add await if need
                    email_token: emailToken,
                    email_token_count: emailTokenCount + 1,
                    updated_at: new Date(),
                });
            }
        });

        return res.status(200).json({
            message: `We'll email you to ${data.email}. Check it out for password reset.`
        });
    },
    changeDetails: async (req, res) => {
        const validationResult = validate.changeDetails(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const data = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: { email: req.user.email }
        });
        if (!foundUser) {
            return res.status(409).json({
                error: "Something went wrong!" // 500
            });
        }

        if (req.file) {
            data.avatar = req.custom_dates_folder + '/' + req.file.filename;

            let imageName = req.file.filename;
            let imagesFolder = appConfigs.uploads.user_images;
            let imagePath = path.join(__dirname, `./../../uploads/${imagesFolder}/original/${req.custom_dates_folder}/${imageName}`);
            await multiSharp(imagePath, imageName, imagesFolder, req.custom_dates_folder);
        }

        if (data) {
            await foundUser.update({
                ...data,
                updated_at: new Date(),
            });

            return res.status(201).json({
                message: "Details successfully updated.",
            });
        } else {
            return res.status(201).json({
                message: "Nothing was changed!",
            });
        }
    },
};
