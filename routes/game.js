
const gameController = require('./../controllers/game');
const { Router } = require('express');
const router = Router();
const gameUpload = require('./../utilities/multer').gameUpload();
const jwtFormat = require('./../utilities/jwt-format');
const jwtAuth = require('./../utilities/jwt-auth');
const buildFolderStructure = require('./../utilities/folder-structure');

router.get('/all', gameController.games);
router.post('/create', jwtFormat, jwtAuth, buildFolderStructure.game, gameUpload.single('image'), gameController.create);
router.put('/update/:gameId', jwtFormat, jwtAuth, buildFolderStructure.game, gameUpload.single('image'), gameController.update);
router.delete('/delete/:gameId', jwtFormat, jwtAuth, gameController.delete);
router.get('/list', jwtFormat, jwtAuth, gameController.list);

module.exports = router;
