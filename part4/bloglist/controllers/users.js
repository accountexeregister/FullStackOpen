const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const user = request.body
    const salt = 10
    const passwordHash = await bcrypt.hash(user.password, salt)
    const userToSave = new User({
            username: user.username,
            password: passwordHash,
            name: user.name
        }
    )
    const result = await userToSave.save()
    response.status(201).json(result)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter