const User = require('../models/User')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: "Validation error"} )
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message} )
    } else {
        response.status(400).json({ error: error.message })
    }
}

const tokenExtractor = (request, response, next) => {
    if (request.method === 'POST' || request.method === 'DELETE') {
        
        const authorizationString = request.get('Authorization')
        if (authorizationString && authorizationString.startsWith('Bearer ')) {
            request.token = authorizationString.replace('Bearer ', '')
        }
    }

    next()
}

const userExtractor = async (request, response, next) => {
    if (request.method === 'POST' || request.method === 'DELETE') {
        try {
            const decodedToken = jwt.verify(request.token, process.env.SECRET)
            if (!decodedToken.id) {
            return response.status(401).json({ error: "token invalid"} )
            }
            request.user = await User.findById(decodedToken.id)
        } catch (error) {
            next(error)
        }
    }

    next()
}


module.exports = { errorHandler, tokenExtractor, userExtractor }