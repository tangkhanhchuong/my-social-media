const express = require('express')

const { usersController } = require('../controllers')
const { uploadMultipleFiles } = require('../services/upload')

const router = express.Router()

router.route('/').get(usersController.getAllUsers)

router.route('/search').get(usersController.getUserByUsername)

router.route('/profile')
    .patch(uploadMultipleFiles(["avatar", "coverPicture"]), usersController.uploadCoverPicture)

router.route('/profile/:key')
    .get(usersController.getCoverPicture)

module.exports = router