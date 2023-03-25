const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response, next) => {
    const user = request.body
    if (!user.password) {
        return response.status(400).json({ error: "There must be a password"} )
    } 
    if (user.password.length < 3) {
        return response.status(400).json({ error: "Password length is less than 3 characters"} )
    }
    const salt = 10
    const passwordHash = await bcrypt.hash(user.password, salt)
    const userToSave = new User({
            username: user.username,
            password: passwordHash,
            name: user.name
        }
    )
    try {
        const result = await userToSave.save()
        response.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users)
})

module.exports = usersRouter