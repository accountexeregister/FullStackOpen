const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).json( {error: "Bad request"})
    }
    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogsRouter
