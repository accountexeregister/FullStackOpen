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

test("Post succesfully creates a new blog post", async () => {
    await api
       .post("/api/blogs")
        .send({
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const blogsInDb = await blogTestHelper.blogsInDb()
    expect(blogsInDb).toHaveLength(blogTestHelper.initialBlogs.length + 1)
    const blogs = await Blog.find({ 
                        title: "Type wars",
                        author: "Robert C. Martin",
                        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                        likes: 2,
                    })
    expect(blogs).toBeDefined()
})

test("Likes property is not missing from request", async () => {
    const response = await api
                        .get("/api/blogs")
    const blogs = response.body
    blogs.forEach(blog => {
        expect(blog.likes).toBeDefined()
    })
})

test("400 Bad Request if title or url are missing", async() => {
    await api
       .post("/api/blogs")
        .send({
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        })
        .expect(400)

        await api
        .post("/api/blogs")
         .send({
             title: "Type wars",
             author: "Robert C. Martin",
             likes: 2,
         })
         .expect(400)
})

describe("Deleting blog(s)", () => {
    test("Delete 1 blog", async() => {
        let blogs = await blogTestHelper.blogsInDb()
        const firstBlogId = blogs[0].id
        await api  
                .delete(`/api/blogs/${firstBlogId}`)
                .expect(204)

        blogs = await blogTestHelper.blogsInDb()
        const firstBlog = blogs.find(blog => blog.id === firstBlogId)
        expect(firstBlog).not.toBeDefined()
        expect(blogs).toHaveLength(blogTestHelper.initialBlogs.length - 1)
    }, 100000)

    test("Invalid id delete", async() => {
        const id = "sa1231"
        await api   
                .delete(`/api/blogs/${id}`)
                .expect(400)
    }, 100000)
})

describe("Updating blog", () => {
    test("Update 1 blog", async() => {
        const initialFirstBlog = blogTestHelper.initialBlogs[1]
        console.log(initialFirstBlog)
        let blogs = await blogTestHelper.blogsInDb()
        const firstBlogId = blogs[1].id
        await api.put(`/api/blogs/${firstBlogId}`).send({title: initialFirstBlog.title,
            author: initialFirstBlog.author,
            url: initialFirstBlog.url,
            likes: initialFirstBlog.likes + 1
        }).expect(200)

        blogs = await blogTestHelper.blogsInDb()
        const firstBlog = blogs.find(blog => blog.id === firstBlogId)
        expect(firstBlog.likes).toBe(initialFirstBlog.likes + 1)
    })

    test("Invalid id update", async() => {
        const id = "saada11d"
        await api
                .put(`/api/blogs/${id}`)
                .send({title: "pop", author: "sdas", url: "http", likes: 2})
                .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})