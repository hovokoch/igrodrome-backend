'use strict';

const path = require('path');
const {
    User,
} = require('./../models');


module.exports = {
    main: (req, res) => {
        const filePath = path.join(__dirname + './../views/index.html');
        res.sendFile(filePath);
    },
    about: (req, res) => {
        const filePath = path.join(__dirname + './../views/about.html');
        res.sendFile(filePath);
    },
    users: async (req, res) => {
        const users = await User.findAll();

        res.render('users', {
            users: users
        });
    },
};
