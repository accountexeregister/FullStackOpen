const mongoose = require('mongoose')
const Blog = require("./../models/Blog")
const supertest = require('supertest')
const app = require("./../app")
const blogTestHelper = require("./blogTest_helper")
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of blogTestHelper.initialBlogs) {
        const newBlog = new Blog(blog)
        await newBlog.save()
    }
})

test("Get returns the correct amount of blog posts", async () => {
    const response = await api
                    .get("/api/blogs")
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
    const blogs = response.body
    expect(blogs).toHaveLength(blogTestHelper.initialBlogs.length)
})

test("Unique identifier property of the blog posts is named id", async () => {
    const response = await blogTestHelper.blogsInDb()
    response.forEach(blog => expect(blog.id).toBeDefined())
})

afterAll(async () => {
    await mongoose.connection.close()
})