'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const now = new Date();
    const Game = sequelize.define('Game', {
        project_id: {
            type: DataTypes.INTEGER, // (11),
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER, // (11),
            allowNull: false
        },
        products: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: '[]'
        },
        purchase: {
            type: DataTypes.JSON,
            allowNull: true
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 0
        },
        created_at: {
            allowNull: false,
            defaultValue: now,
            type: DataTypes.DATE,
            get() {
                return moment(this.dataValues.created_at).format('D MMM YYYY'); // 'D MMM YYYY, LT'
            }
        },
        updated_at: {
            allowNull: false,
            defaultValue: now,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'games',
        freezeTableName: true,
        // underscored: true,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    Game.associate = function (models) {
        Game.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        Game.belongsTo(models.Project, { as: 'project', foreignKey: 'project_id' });
    };

    return Game;
};
