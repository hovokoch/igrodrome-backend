
const gameController = require('./../../controllers/user-api/game');
const { Router } = require('express');
const router = Router();
const gameUpload = require('./../../utilities/multer').gameUpload();
const jwtFormat = require('./../../utilities/jwt-format');
const jwtAuth = require('./../../utilities/jwt-auth');
const buildFolderStructure = require('./../../utilities/folder-structure');



router.post('/upload-image',
    jwtFormat,
    jwtAuth,
    buildFolderStructure.game,
    gameUpload.single('image'),
    gameController.upload
);
router.get('/history', jwtFormat, jwtAuth, gameController.history);



module.exports = router;
