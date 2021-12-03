
const bcrypt = require('bcrypt');
const validate = require('./../validations/user');
const helper = require('./../utilities/helper');
const appConfigs = require('./../config/app');

const emailConfigs = require('../config/email');
const mailgun = require('mailgun-js');
const email = emailConfigs[process.env.NODE_ENV];
const mg = mailgun({ apiKey: email.api_key, domain: email.domain });
const inlineHtml = require('./../utilities/inline-html');

const {
    User,
    Role,
} = require('./../models');



module.exports = {
    details: async (req, res) => {
        console.log(req.jwt_data)
        const foundUser = await User.findOne({
            where: {
                email: req.jwt_data.email,
            },
            include: [
                { model: Role, as: 'role'}
            ]
        });

        return res.status(200).json({
            user: foundUser,
        });
    },
    changePassword: async (req, res) => {
        const validationResult = validate.changePassword(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const data = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: { email: req.jwt_data.email },
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
                    message: "Пароль успешно изменен."
                });
            } else {
                return res.status(200).json({
                    error: "Старый пароль неверен!"
                });
            }
        } else {
            return res.status(200).json({
                error: "Что-то пошло не так!"
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
                error: "Что-то пошло не так!"
            });
        }

        const emailTokenCount = foundUser.dataValues.email_token_count;
        if (emailTokenCount >= appConfigs.user_email_token_limit) {
            return res.status(403).json({
                error: "Срок действия лимита запросов на забытые адреса электронной почты истек!"
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
            message: `Мы отправим вам электронное письмо на ${data.email}. Проверьте это для сброса пароля.`
        });
    },
    changeDetails: async (req, res) => {
        const validationResult = validate.changeDetails(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const data = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: { email: req.jwt_data.email }
        });
        if (!foundUser) {
            return res.status(200).json({
                error: "Что-то пошло не так!" // 500
            });
        }

        if (data) {
            await foundUser.update({
                ...data,
                updated_at: new Date(),
            });

            return res.status(200).json({
                message: "Детали успешно обновлены.",
            });
        } else {
            return res.status(200).json({
                message: "Ничего не изменилось!",
            });
        }
    },
};
