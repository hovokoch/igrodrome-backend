
const path = require('path');
const port = process.env.APP_PORT;
const env = process.env.NODE_ENV;
const apiUrlPrefix = process.env.APP_URL + (env === 'development' ? ':' + port : '');

const validate = require('./../validations/game');
const {
    User,
    Game,
} = require('./../models');
const appConfigs = require('./../config/app');



module.exports = {
    create: async (req, res) => {
        let imageName = null;
        if (req.file) {
            imageName = req.file.filename;
        }

        const user = await User.findOne({
            where: { email: req.jwt_data.email },
            attributes: ['id']
        });
        if (user) {
            await Game.create({
                user_id: user.dataValues.id,
                image: imageName,
                text: null,
                status: 0, // pending
                created_at: new Date(),
            });
        } else {
            return res.status(403).json({
                error: "Something went wrong!" // 500
            });
        }

        return res.status(201).json({
            message: "Game was successfully created.",
            image_url: imageName,
        });
    },
    update: async (req, res) => {
        let imageName = null;
        if (req.file) {
            imageName = req.file.filename;
        }

        const user = await User.findOne({
            where: { email: req.jwt_data.email },
            attributes: ['id']
        });
        if (user) {
            await Game.update({
                user_id: user.dataValues.id,
                image: imageName,
                text: null,
                status: 0, // pending
                updated_at: new Date(),
            });
        } else {
            return res.status(403).json({
                error: "Something went wrong!" // 500
            });
        }

        return res.status(201).json({
            message: "Game was successfully updated.",
            image_url: imageName,
        });
    },
    delete: async (req, res) => {
        let imageName = null;
        if (req.file) {
            imageName = req.file.filename;
        }

        const user = await User.findOne({
            where: { email: req.jwt_data.email },
            attributes: ['id']
        });
        console.log(req.body. req.params)
        if (user) {
            await Game.destroy({
                id: req.body.gameId,
            });
        } else {
            return res.status(403).json({
                error: "Something went wrong!" // 500
            });
        }

        let imagesFolder = appConfigs.uploads.game_images;
        let imagePath = path.join(__dirname, `./../uploads/${imagesFolder}/original/${req.custom_dates_folder}/${imageName}`);
        await multiSharp(imagePath, imageName, imagesFolder, req.custom_dates_folder);

        return res.status(201).json({
            message: "Game was successfully updated.",
            image_url: imageName,
        });
    },
    list: async (req, res) => {
        const data = validate.history(req.query).filteredData;

        const user = await User.findOne({
            where: { email: req.jwt_data.email },
            attributes: ['id'],
        });
        if (!user) {
            return res.status(403).json({
                error: "Something went wrong!" // 500
            });
        }

        let whereData = {
            user_id: user.dataValues.id,
        };
        if (data.status >= 0) {
            whereData.status = data.status;
        }

        const {rows, count} = await Game.findAndCountAll({
            model: Game,
            as: 'games',
            where: whereData,
            attributes: [
                'id',
                'image',
                'status',
                'created_at',
            ],
            order: [['id', 'DESC']],
            limit: data.per,
            offset: (data.per * (data.page - 1)),
            distinct: true,
        });

        let total = Math.ceil(count / data.per);
        let prev = data.page - 1;
        if (prev <= 0 || (data.page * data.per <= count && data.page === 1)) {
            prev = '';
        }
        let next = rows.length === data.per ? (data.page + 1) : '';
        if (next > total) {
            next = '';
        }

        const prevPage = `${apiUrlPrefix}/v1/games/history?per=${data.per}&page=${prev}`;
        const nextPage = `${apiUrlPrefix}/v1/games/history?per=${data.per}&page=${next}`;

        return res.status(200).json({
            per: data.per,
            page: data.page,
            total: total,
            prev: prevPage,
            next: nextPage,
            data: rows,
        });
    },
};
