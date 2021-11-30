
const bcrypt = require('bcrypt');
const validate = require('./../../validations/customer/customer');
const helper = require('./../../utilities/helper');
const appConfigs = require('./../../config/app');

const emailConfigs = require('../../config/email');
const mailgun = require('mailgun-js');
const email = emailConfigs[process.env.NODE_ENV];
const mg = mailgun({ apiKey: email.api_key, domain: email.domain });
const inlineHtml = require('./../../utilities/inline-html');
const path = require('path');
const multiSharp = require('./../../utilities/multi-sharp');
const {
    Customer,
} = require('./../../models');



module.exports = {
    details: async (req, res) => {
        const customer = await Customer.findOne({
            where: { email: req.customer.email },
            attributes: [
                'name',
                'username',
                'email',
                'auth_provider',
                'gender',
                'avatar',
                'address',
                'birth_date',
            ],
        });

        if (customer) {
            return res.status(200).json(customer);
        } else {
            return res.status(409).json({
                error: "Something went wrong!" // 500
            });
        }
    },
    changePassword: async (req, res) => {
        const validationResult = validate.changePassword(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const data = validationResult.filteredData;

        const foundCustomer = await Customer.findOne({
            where: { email: req.customer.email },
            attributes: ['id', 'password'],
        });
        if (foundCustomer) {
            const match = await bcrypt.compare(data.old_password, foundCustomer.dataValues.password);

            if(match) {
                const hashedPassword = await bcrypt.hash(data.new_password, 10);
                await foundCustomer.update({
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

        const foundCustomer = await Customer.findOne({
            where: { email: data.email },
        });
        if (!foundCustomer) {
            return res.status(409).json({
                error: "Something went wrong!"
            });
        }

        const emailTokenCount = foundCustomer.dataValues.email_token_count;
        if (emailTokenCount >= appConfigs.customer_email_token_limit) {
            return res.status(403).json({
                error: "Forgot-Email requests limit expired!"
            });
        }

        const emailToken = helper.random_string(40);

        // TODO: replace config variables
        const forgotPasswordHtml = inlineHtml.forgotPassword({
            name: foundCustomer.dataValues.name,
            link: process.env.APP_SITE + 'customer/forgot-password?email_token=' + emailToken,
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
            text: `Hi ${foundCustomer.dataValues.name}`,
            html: forgotPasswordHtml
        };
        mg.messages().send(emailData, (err, body) => {
            if (body) {
                foundCustomer.update({
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

        const foundCustomer = await Customer.findOne({
            where: { email: req.customer.email }
        });
        if (!foundCustomer) {
            return res.status(409).json({
                error: "Something went wrong!" // 500
            });
        }

        if (req.file) {
            data.avatar = req.custom_dates_folder + '/' + req.file.filename;

            let imageName = req.file.filename;
            let imagesFolder = appConfigs.uploads.customer_images;
            let imagePath = path.join(__dirname, `./../../uploads/${imagesFolder}/original/${req.custom_dates_folder}/${imageName}`);
            await multiSharp(imagePath, imageName, imagesFolder, req.custom_dates_folder);
        }

        if (data) {
            await foundCustomer.update({
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
