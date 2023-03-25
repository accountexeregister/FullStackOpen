const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: Number,
})

blogSchema.set('toJSON', {
    transform: (document, returnedBlog) => {
        returnedBlog.id = returnedBlog._id.toString()
        delete returnedBlog._id
        delete returnedBlog.__v
        if (returnedBlog.likes === undefined) {
            returnedBlog.likes = 0
        }
    }
})

module.exports = mongoose.model('Blog', blogSchema)