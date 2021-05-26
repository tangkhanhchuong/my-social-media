const { ErrorStatus, throwError } = require('../utils/error')

const errorHandler = (error, req, res, next) => {
    if (!error.statusCode) error.statusCode = ErrorStatus.INTERNAL_SERVER_ERROR

    res.status(error.statusCode).json({
        message: error.message
    })
}

const notFoundErrorHandler = (req, res) => {
    throwError(ErrorStatus.NOT_FOUND)
}

module.exports = {
    errorHandler,
    notFoundErrorHandler
}