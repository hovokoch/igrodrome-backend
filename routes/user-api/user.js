
const { Router } = require('express');
const router = Router();
const userController = require('./../../controllers/user-api/user');
const jwtFormat = require('./../../utilities/jwt-format');
const jwtAuth = require('./../../utilities/jwt-auth');
const useragent = require('express-useragent');
const changeDetailsUpload = require('./../../utilities/multer').userUpload();
const buildFolderStructure = require('./../../utilities/folder-structure');



router.get('/details', jwtFormat, jwtAuth, userController.details);
router.put('/change-password', jwtFormat, jwtAuth, userController.changePassword);
router.put('/forgot-password', useragent.express(), userController.forgotPassword);
router.put('/change-details',
    jwtFormat,
    jwtAuth,
    buildFolderStructure.user,
    changeDetailsUpload.single('avatar'),
    userController.changeDetails
);



module.exports = router;
