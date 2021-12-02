'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('games', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            products: {
                type: Sequelize.JSON,
                allowNull: false,
                defaultValue: '[]'
                // get: function () {
                //   return JSON.parse(this.getDataValue('products'));
                // },
                // set: function (value) {
                //   this.setDataValue('products', JSON.stringify(value));
                // }
            },
            purchase: {
                type: Sequelize.JSON,
                allowNull: true
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            point: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            status: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 0
            },
            created_at: {
                allowNull: false,
                // defaultValue: now,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                // defaultValue: now,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('games');
    }
};
