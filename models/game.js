'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const now = new Date();
    const Game = sequelize.define('Game', {
        creator_id: {
            type: DataTypes.INTEGER, // (11),
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        data: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: '[]'
        },
        file: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    Game.associate = function (models) {
        Game.belongsTo(models.User, { as: 'creator', foreignKey: 'creator_id' });
        Game.belongsTo(models.User, { as: 'owner', foreignKey: 'owner_id' });
    };

    return Game;
};
