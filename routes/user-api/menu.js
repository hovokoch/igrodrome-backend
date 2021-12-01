
const menuController = require('./../../controllers/user-api/menu');
const { Router } = require('express');
const router = Router();
const jwtFormat = require('./../../utilities/jwt-format');
const jwtAuth = require('./../../utilities/jwt-auth');



router.get('/projects', jwtFormat, jwtAuth, menuController.projects);
router.get('/project/:projectId', jwtFormat, jwtAuth, menuController.project);



module.exports = router;
