'use strict';

const {
    User,
} = require('./../models');


module.exports = {
    main: (req, res) => {
        return res.status(200).json({
            data: "Root URL",
        });
    },
    users: async (req, res) => {
        const users = await User.findAll();

        res.render('users', {
            users: users
        });
    },
};
