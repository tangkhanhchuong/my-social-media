const jwt = require('jsonwebtoken')

const { User } = require('../schemas')
const { verifyToken } = require('../middlewares/require_auth')
const { throwError, ErrorStatus } = require('../services/error')
const { sendEmailSES } = require('../services/email')
const { generateAccessToken, generateRefreshToken } = require('../services/jwt')

let refreshTokens = []
const { AWS_SYSTEM_EMAIL } = process.env

const login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(!user)    
        return res.status(409).json({
            message: `Email does not exist!`
        })

    const isValidPassword = await user.isValidPassword(password)

    if(!isValidPassword)
        return res.status(401).json({
            message: 'Wrong password!'
        })

    //sign token

    const accessToken = generateAccessToken({
        id: user._id,
        email: user.email,
        username: user.username
    })

    const refreshToken = generateRefreshToken({
        id: user._id,
        email: user.email,
        username: user.username
    })

    refreshTokens.push(refreshToken)

    await sendEmailSES({
        to: AWS_SYSTEM_EMAIL,
        from: email,
        subject: "Login successfully",
        text: "Congratulation! You are authenticated. You can access our services."
    })

    const {_id, username} = user
    res.status(200).json({_id, username, email, accessToken, refreshToken})
}

const register = async (req, res) => {
    const {email, username, password} = req.body

    const user = await User.findOne({email})
    if(user)    
        return res.status(409).json({
            message: `Email already exist! Please select another email!`
        })

    const createdUser = await User.create({
        username, email, password
    })

    res.status(201).json({
        id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        profilePicture: createdUser.profilePicture,
        avatar: createdUser.avatar
    })
}

const getAccessToken = (req, res) => {
    const authorizationHeader = req.headers["authorization"]
    const refreshToken = authorizationHeader && authorizationHeader.split(" ")[1]

    const index = refreshTokens.find(t => t === refreshToken)
    if(!index){
        throwError(ErrorStatus.UNAUTHORIZED)
        return
    }

    const user = verifyToken(refreshToken, false)

    const accessToken = generateAccessToken({
        id: user._id,
        email: user.email,
        username: user.username
    })

    res.json({accessToken})
}

const forgotPassword = (req, res) => {

}

const updatePassword = (req, res) => {
    
}

const logout = (req, res) => {
    const authorizationHeader = req.headers["authorization"]
    const refreshToken = authorizationHeader && authorizationHeader.split(" ")[1]

    refreshTokens = refreshTokens.filter(t => {
        return t !== refreshToken
    })

    res.sendStatus(204)
}

const fbLoginSuccess = (req, res) => {
    const { fbId, username } = req.user
    const accessToken = generateAccessToken({ fbId, username })
    res.status(200).json({ accessToken })
}

const fbLoginFailed = (req, res) => {
    res.status(400).json("Authenticate Failed")
}

module.exports = {
    login, register, forgotPassword, updatePassword, logout, getAccessToken,
    fbLoginSuccess, fbLoginFailed
}