const express = require('express')
const Upload = require('multer')
const UserController = require('../Controllers/usersControllers')
const { checkIfTokenSentAndNotExpierd } = require('../helpers/token')
const { checkIfAllDataThere } = require('../middelwares/inputsHandelar')
const errorHandelarAsMidelleWare = require('../middelwares/errorhandelars')
const imageMiddleware = require('../middelwares/imageMiddleware')
// opreate
const router = express.Router()
const multer = Upload({ storage: Upload.memoryStorage() })
const parseDataMiddleware = multer.none()

router.post('/login', [parseDataMiddleware, checkIfAllDataThere, errorHandelarAsMidelleWare], UserController.login)
router.post('/signUp', errorHandelarAsMidelleWare, imageMiddleware, UserController.signUp)
router.get('/Users/:id', checkIfTokenSentAndNotExpierd, multer.none(), UserController.userShow)
router.get('/AllUsersShow', checkIfTokenSentAndNotExpierd, multer.none(), UserController.AllUsersShow)
router.post(
  '/EditUser/:id',
  [checkIfTokenSentAndNotExpierd, checkIfAllDataThere, errorHandelarAsMidelleWare],
  multer.none(),
  UserController.EditUser,
)
router.post(
  '/verifyEmail',
  [checkIfTokenSentAndNotExpierd, checkIfAllDataThere, errorHandelarAsMidelleWare],
  multer.none(),
  UserController.verifyEmail,
)
router.delete('/DeleteMyAccount', checkIfTokenSentAndNotExpierd, multer.none(), UserController.DeleteUser)

module.exports = router
