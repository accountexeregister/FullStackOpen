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

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
  } catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
