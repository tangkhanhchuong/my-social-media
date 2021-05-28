const { User } = require('../schemas')

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

module.exports = {
    getAllUsers,
    getUserByUsername
}