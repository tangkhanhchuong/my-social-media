const express = require('express')

const { usersController } = require('../controllers')
const { parseUploadFile } = require('../services/upload')

const router = express.Router()

router.route('/').get(usersController.getAllUsers)

router.route('/search').get(usersController.getUserByUsername)

router.route('/profile')
    .post(parseUploadFile, usersController.uploadCoverPicture)

router.route('/profile/:key')
    .get(usersController.getCoverPicture)

module.exports = router