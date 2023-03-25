const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: "Validation error"} )
    } else {
        response.status(400).send()
    }
}

module.exports = { errorHandler }