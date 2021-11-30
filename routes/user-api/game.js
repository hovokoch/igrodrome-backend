
const gameController = require('./../../controllers/user-api/game');
const { Router } = require('express');
const router = Router();
const gameUpload = require('./../../utilities/multer').gameUpload();
const jwtAuth = require('./../../utilities/jwt-format');
const buildFolderStructure = require('./../../utilities/folder-structure');



router.post('/upload-image',
    jwtAuth,
    buildFolderStructure.game,
    gameUpload.single('image'),
    gameController.upload
);
router.get('/history', jwtAuth, gameController.history);



module.exports = router;
