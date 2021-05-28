const express = require('express')
const router = express.Router()
const { usersController } = require('../controllers')

router.route('/').get(usersController.getAllUsers)

router.route('/search').get(usersController.getUserByUsername)

module.exports = router