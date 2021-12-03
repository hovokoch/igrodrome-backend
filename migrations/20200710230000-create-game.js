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
            creator_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            owner_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            name: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            data: {
                type: Sequelize.JSON,
                allowNull: false,
                defaultValue: '[]'
            },
            file: {
                type: Sequelize.TEXT,
                allowNull: false,
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
