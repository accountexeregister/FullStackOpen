const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },
    password: {
        type: String,
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