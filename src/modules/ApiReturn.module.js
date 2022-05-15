module.exports.outputObject = (error, status, message, data) => {
    return {
        error,
        status,
        message,
        data
    }
}