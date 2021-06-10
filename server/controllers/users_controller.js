const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { User } = require('../schemas')
const { uploadFileToS3, getFileStreamFromS3 } = require('../services/upload')

const getAllUsers = async (req, res) => {
    const users = await User.find()

    res.status(200).json({
        data: users
    })
}

const getUserByUsername = async (req, res) => {
    const { username } = req.query

    if(username.length < 3) return res.sendStatus(200)

    const users = await User.find({ username: new RegExp(username, "i") })
    res.status(200).json(users)
}

const getCoverPicture = async (req, res, next) => {
    const key = req.params.key
    try {
        const readStream = getFileStreamFromS3(key)
        readStream.pipe(res)
    }
    catch(err) {
        next(err)
    }
}

const uploadCoverPicture = async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    // const file = req.file
    // console.log(file)

    // const result = await uploadFileToS3(file)
    // await unlinkFile(file.path)
    // console.log(result)
    // const description = req.body.description
    // res.status(200).json({imagePath: `/images/${result.Key}`})
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    uploadCoverPicture,
    getCoverPicture
}