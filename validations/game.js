'use strict';

const helper = require('./../utilities/helper');

module.exports = {
    history: (data) => {
        const filteredData = {};

        let status = -1;
        switch (data.status) {
            case '0': case '1': case '2':
                status = Number(data.status);
        }
        filteredData.status = status;

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
};
