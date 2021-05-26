const User = require('../schemas/user_schema')

const checkIfEmailExists = async (email)=>{
    const user = await User.findOne({ email })
    return user ? true : false
}

module.exports = {
    checkIfEmailExists
}