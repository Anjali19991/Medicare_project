

const ErrorHandler = (err, req, res, next) => {
    console.log("Middleware Error Handling");
    const errStatus = err.status || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    })
}

module.exports = ErrorHandler