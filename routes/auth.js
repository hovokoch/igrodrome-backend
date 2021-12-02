
const { Router } = require('express');
const router = Router();
const authController = require('./../controllers/auth');
const registerUpload = require('./../utilities/multer').userUpload();
const buildFolderStructure = require('./../utilities/folder-structure');



router.post('/register',
    buildFolderStructure.user,
    registerUpload.single('avatar'),
    authController.register
);
router.post('/login', authController.login);
router.post('/third-party-auth', authController.thirdPartyAuth);



module.exports = router;
