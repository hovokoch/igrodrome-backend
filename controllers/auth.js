const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validate = require('./../validations/auth');
const {
    User,
} = require('./../models');


module.exports = {
    register: async (req, res) => {
        const validationResult = validate.register(req.body);

        if (validationResult.error) {
            return res.status(200).json(validationResult);
        }
        const user = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: {email: user.email}
        });
        if (foundUser) {
            return res.status(200).json({
                error: "Адрес электронной почты уже существует!"
            });
        } else {
            try {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await User.create({
                    ...user,
                    role_id: 3,
                    password: hashedPassword
                });
            } catch (err) {
                return res.status(200).json({
                    error: "Что-то пошло не так!"
                });
            }
        }

        return res.status(200).json({
            message: "Вы успешно зарегистрировались."
        });
    },
    login: async (req, res) => {
        const validationResult = validate.login(req.body);
        if (validationResult.error) {
            return res.status(200).json(validationResult);
        }
        const user = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: {email: user.email}
        });
        if (!foundUser) {
            return res.status(200).json({
                error: "Неправильный адрес электронной почты и / или пароль!"
            });
        }

        try {
            jwt.sign({
                id: foundUser.dataValues.id,
                email: foundUser.dataValues.email,
                name: foundUser.dataValues.name,
                role: foundUser.dataValues.role,
            }, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRATION_TIME}, (err, token) => {
                if (err) {
                    return res.status(200).json({
                        error: "Что-то пошло не так!" // 500
                    });
                }
                return res.status(200).json({
                    message: "Вы успешно вошли в систему.",
                    name: foundUser.dataValues.name,
                    email: foundUser.dataValues.email,
                    token: token,
                    role: foundUser.dataValues.role,
                });
            });
        } catch (err) {
            return res.status(200).json({
                error: "Что-то пошло не так!" // 500
            });
        }
    },
    thirdPartyAuth: async (req, res) => {
        const validationResult = validate.thirdPartyAuth(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }

        const user = {
            name: res.user.displayName,
            email: res.user.email,
        };
        const foundUser = await User.findOne({where: {email: res.user.email}});
        if (!foundUser) {
            await User.create(user);
        }

        return res.status(200).json({
            ...user,
            token: idToken,
        });
    },
    logout: async (req, res) => {
        return res.status(200).json({
            message: 'Успешный выход из системы'
        });
    },
};
