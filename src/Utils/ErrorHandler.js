class ErrorHandler {

}

ErrorHandler.unknownError = async (error, req, res, next) => {
    res.json({
        code: 500,
        message: error.message,
    }).status(500)
}
export default ErrorHandler