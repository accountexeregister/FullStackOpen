const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password)

    if (!user || !passwordCorrect) {
        return response.status(401).json({
            error: "Invalid username or password"
        })   
    }

    const userToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET)
    response.status(200).json({
        token,
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter