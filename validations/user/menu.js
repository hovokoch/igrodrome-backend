'use strict';

const helper = require('./../../utilities/helper');
const isEmpty = require('lodash.isempty');
const appConfigs = require('./../../config/app');

module.exports = {
    projects: (data) => {
        const filteredData = {};

        let page = 1;
        if (data.page) {
            if (helper.is_natural(data.page)) {
                page = Number(data.page) > 0 ? Number(data.page) : 1;
            }
        }
        filteredData.page = page;

        let per = 10;
        if (data.per) {
            if (helper.is_natural(data.per)) {
                per = Number(data.per) > 0 ? Number(data.per) : 10;
            }
        }
        filteredData.per = per > 100 ? 10 : per;

        return {
            filteredData: filteredData
        };
    },
    project: (data) => {
        const filteredData = {};

        // step 1
        if (isEmpty(data)) {
            return {
                error: "Query Param not valid!"
            };
        }

        // step 2
        if (helper.is_natural(data.projectId)) {
            filteredData.projectId = data.projectId;
        } else {
            return {
                error: "Project ID is invalid!"
            };
        }

        return {
            filteredData: filteredData
        };
    },
};
