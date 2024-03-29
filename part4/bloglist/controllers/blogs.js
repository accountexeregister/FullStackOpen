const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    try {
      if (blog.title === undefined || blog.url === undefined) {
        return response.status(400).json( {error: "Bad request"})
      }
      if (blog.likes === undefined) {
        blog.likes = 0
      }
      const user = request.user
      blog.user = user._id
      const result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
      response.status(201).json(result)
  } catch (error) {
    next(error)
  }
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
  const blogId = request.params.id
  try {
    const user = request.user
    const blog = await Blog.findById(blogId)
    if (blog.user.toString() !== user._id.toString()) {
      response.status(401).json({ error: "incorrect blog user id token"} )
    }
    await Blog.findByIdAndRemove(blogId)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
