const express = require('express')
const multer = require('multer')
const passport = require('passport')
const authController = require('../../controllers/AuthController')
const upload = multer({})

const router = express.Router()

const passportMiddleware = require('../../middlewares/passport')
    // link
router.post('/api/auth', upload.none(), authController.signUp)

router.get('/api/auth/secret', passport.authenticate('jwt', {
    session: false
}), authController.secret)


router.patch('/api/auth/signIn', upload.none(), passport.authenticate('local', {
    session: false
}), authController.signIn)

module.exports = router