const express = require('express')
const multer = require('multer')
const authController = require('../../controllers/AuthController')
const upload = multer({})

const router = express.Router()

// link
router.post('/api/auth', upload.none(), authController.signUp)

module.exports = router