
const { Router } = require('express');
const router = Router();
const authController = require('./../../controllers/customer-api/auth');
const registerUpload = require('./../../utilities/multer').customerUpload();
const buildFolderStructure = require('./../../utilities/folder-structure');



router.post('/register',
    buildFolderStructure.customer,
    registerUpload.single('avatar'),
    authController.register
);
router.post('/login', authController.login);



module.exports = router;
