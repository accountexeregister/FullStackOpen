const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
})

userSchema.set('toJSON', {
    transform: (document, returnedUser) => {
        returnedUser.id = returnedUser._id.toString()
        delete returnedUser._id
        delete returnedUser.__v
        delete returnedUser.password
    }
})

module.exports = mongoose.model('User', userSchema)