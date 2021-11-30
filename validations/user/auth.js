'use strict';

const moment = require('moment');
const validator = require('validator');
const isEmpty = require('lodash.isempty');
const appConfigs = require('./../../config/app');
const helper = require('./../../utilities/helper');

module.exports = {
    register: (data) => {
        const filteredData = {};

        // step 1
        if (isEmpty(data)) {
            return {
                error: "Body not valid!"
            };
        }

        // step 2
        const requiredProps = [
            'name',
            'email',
            'password',
            'gender',
            'birth_date',
        ];
        for (let prop of requiredProps) {
            if (!(prop in data)) {
                return {
                    error: "Body not valid!"
                };
            }
        }

        // step 3
        if (validator.isEmail(data.email)) {
            filteredData.email = data.email;
        } else {
            return {
                error: "Email not valid!"
            };
        }

        if (validator.isLength(data.name, {min: 1, max: 100})) {
            filteredData.name = data.name;
        } else {
            return {
                error: "Name must have max 100 chars!"
            };
        }

        if (validator.isLength(data.password, {min: 6, max: 30})) {
            filteredData.password = data.password;
        } else {
            return {
                error: "Password must have 6-30 chars!"
            };
        }

        let gender = Number(data.gender);
        if (helper.is_natural(gender)) {
            switch (gender) {
                case 0: case 1: case 2:
                    break;
                default:
                    gender = -1;
                    break;
            }
            if (gender >= 0) {
                filteredData.gender = gender;
            } else {
                return {
                    error: "Gender not valid!"
                };
            }
        } else {
            return {
                error: "Gender not valid!"
            };
        }

        if (moment(data.birth_date, "YYYY-MM-DD", true).isValid()) {
            filteredData.birth_date = data.birth_date;
        } else {
            return {
                error: "BirthDate regex: 'YYYY-MM-DD'"
            };
        }

        return {
            filteredData: filteredData
        };
    },
    login: (data) => {
        const filteredData = {};

        // step 1
        if (isEmpty(data)) {
            return {
                error: "Body not valid!"
            };
        }

        // step 2
        const requiredProps = [
            'email',
            'password',
        ];
        for (let prop of requiredProps) {
            if (!(prop in data)) {
                return {
                    error: "Body not valid!"
                };
            }
        }

        // step 3
        if (!isEmpty(data.email)) {
            filteredData.email = data.email;
        } else {
            return {
                error: "Email required!"
            };
        }
        if (!isEmpty(data.password)) {
            filteredData.password = data.password;
        } else {
            return {
                error: "Password required!"
            };
        }

        return {
            filteredData: filteredData
        };
    },
    thirdPartyAuth: (data) => {
        const filteredData = {};

        // step 1
        if (isEmpty(data)) {
            return {
                error: "Body not valid!"
            };
        }

        // step 2
        const requiredProps = [
            'auth_provider',
            'token',
        ];
        for (let prop of requiredProps) {
            if (!(prop in data)) {
                return {
                    error: "Body not valid!"
                };
            }
        }

        // step 3
        if (!isEmpty(data.token)) {
            filteredData.token = data.token;
        } else {
            return {
                error: "ID Token required!"
            };
        }
        if (!isEmpty(data.auth_provider)) {
            if (appConfigs.auth_providers.includes(data.auth_provider)) {
                filteredData.auth_provider = data.auth_provider;
            } else {
                return {
                    error: "Third-party Auth provider is not valid!"
                };
            }
        } else {
            return {
                error: "Third-party Auth provider is not valid!"
            };
        }

        return {
            filteredData: filteredData
        };
    },
};
