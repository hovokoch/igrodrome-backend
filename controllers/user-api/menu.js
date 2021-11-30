
const port = process.env.APP_PORT;
const env = process.env.NODE_ENV;
const apiUrlPrefix = process.env.APP_URL + (env === 'development' ? ':' + port : '');

const validate = require('./../../validations/user/menu');
const {
    ProjectAccessor,
} = require('./../../models');



module.exports = {
    projects: async (req, res) => {
        const data = validate.projects(req.query).filteredData;

        // TODO: Take into account that projects will be shuffled on each time depending on current User
        // const user = await User.findOne({
        //     where: { email: req.user.email },
        //     attributes: ['id'],
        // });
        // if (!user) {
        //     return res.status(403).json({
        //         error: "Something went wrong!" // 500
        //     });
        // }
        // let whereData = {
        //     user_id: user.dataValues.id,
        // };

        const {rows, count} = await ProjectAccessor.findAndCountAll({
            // where: whereData,
            attributes: [
                'id',
                // 'p_code',
                'name',
                'images',
                'address',
                'website',
                'lat',
                'lng',
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

        const prevPage = `${apiUrlPrefix}/user-api/v1/menu/projects?per=${data.per}&page=${prev}`;
        const nextPage = `${apiUrlPrefix}/user-api/v1/menu/projects?per=${data.per}&page=${next}`;

        return res.status(200).json({
            per: data.per,
            page: data.page,
            total: total,
            prev: prevPage,
            next: nextPage,
            data: rows,
        });
    },
    project: async (req, res) => {
        const validationResult = validate.project(req.params);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const data = validationResult.filteredData;

        const project = await ProjectAccessor.findOne({
            where: { id: data.projectId },
            attributes: [
                'id',
                'p_code',
                'name',
                'description',
                'cover_image',
                'images',
                'contact_email',
                'contact_phone',
                'address',
                'website',
                'lat',
                'lng',
                'created_at',
            ],
        });

        if (project) {
            return res.status(200).json(project);
        } else {
            return res.status(404).json({
                error: "Project not found!"
            });
        }
    },
};
