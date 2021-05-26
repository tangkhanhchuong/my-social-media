const jwt = require('jsonwebtoken')

const { throwError, ErrorStatus } = require('../utils/error')

const verifyToken = (token, isAccessToken = true) => {
    const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env

    try {
        const tokenSecret = isAccessToken ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET
        return jwt.verify(token, tokenSecret)
    }
    catch {
        throwError(ErrorStatus.UNAUTHORIZED)
    }
}

const requireAuth = (req, res, next) => {
    const authorizationHeader = req.headers["authorization"]
    const accessToken = authorizationHeader && authorizationHeader.split(" ")[1]

    
    try {
        if (!accessToken)
            throwError(ErrorStatus.UNAUTHORIZED)

        const data = verifyToken(accessToken)
        req.user = data
        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    requireAuth,
    verifyToken
}