const errorHandler = (error, request, response, next) => {
    response.status(400).end()
}

module.exports = { errorHandler }