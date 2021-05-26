const { User } = require('../schemas')

const getAllUsers = async (req, res)=>{
    const users = await User.find()

    res.status(200).json({
        data: users
    })
}

module.exports = {
    getAllUsers
}