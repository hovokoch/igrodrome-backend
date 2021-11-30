
const { Router } = require('express');
const router = Router();
const userController = require('./../../controllers/user-api/user');
const jwtAuth = require('./../../utilities/jwt-format');
const useragent = require('express-useragent');
const changeDetailsUpload = require('./../../utilities/multer').userUpload();
const buildFolderStructure = require('./../../utilities/folder-structure');



router.get('/details', jwtAuth, userController.details);
router.put('/change-password', jwtAuth, userController.changePassword);
router.put('/forgot-password', useragent.express(), userController.forgotPassword);
router.put('/change-details',
    jwtAuth,
    buildFolderStructure.user,
    changeDetailsUpload.single('avatar'),
    userController.changeDetails
);



module.exports = router;
