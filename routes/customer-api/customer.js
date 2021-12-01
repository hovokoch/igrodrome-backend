
const { Router } = require('express');
const router = Router();
const customerController = require('./../../controllers/customer-api/customer');
const jwtFormat = require('./../../utilities/jwt-format');
const jwtAuth = require('./../../utilities/jwt-auth');
const useragent = require('express-useragent');
const changeDetailsUpload = require('./../../utilities/multer').customerUpload();
const buildFolderStructure = require('./../../utilities/folder-structure');



router.get('/details', jwtFormat, jwtAuth, customerController.details);
router.put('/change-password', jwtFormat, jwtAuth, customerController.changePassword);
router.put('/forgot-password', useragent.express(), customerController.forgotPassword);
router.put('/change-details',
    jwtFormat,
    jwtAuth,
    buildFolderStructure.customer,
    changeDetailsUpload.single('avatar'),
    customerController.changeDetails
);



module.exports = router;
