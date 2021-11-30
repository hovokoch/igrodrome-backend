
const menuController = require('./../../controllers/user-api/menu');
const { Router } = require('express');
const router = Router();
const jwtAuth = require('./../../utilities/jwt-format');



router.get('/projects', jwtAuth, menuController.projects);
router.get('/project/:projectId', jwtAuth, menuController.project);



module.exports = router;
