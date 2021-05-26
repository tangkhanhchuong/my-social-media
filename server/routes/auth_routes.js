const express = require('express')
const router = express.Router()
const { authController } = require('../controllers')

router.route('/login').post(authController.login)
router.route('/register').post(authController.register)
router.route('/logout').delete(authController.logout)
router.route('/forgot-password').post(authController.forgotPassword)
router.route('/update-password').post(authController.updatePassword)
router.route('/token').post(authController.getAccessToken)

module.exports = router