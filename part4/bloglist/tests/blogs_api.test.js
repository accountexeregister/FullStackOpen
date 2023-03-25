const mongoose = require('mongoose')
const Blog = require("./../models/Blog")
const User = require("./../models/User")
const supertest = require('supertest')
const app = require("./../app")
const blogTestHelper = require("./blogTest_helper")
const api = supertest(app)
const bcrypt = require('bcrypt')

describe('Test for Users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const userToPost = {
            username: "Arkad",
            password: "JamesBond113",
            name: "Arkad Bharad"
        }
        const user = new User(userToPost)
        await user.save()
    })

    describe('Posting user', () => {
        test('Post valid user', async () => {
            const usersInitial = await blogTestHelper.usersInDb()
            expect(usersInitial).toHaveLength(1)
            const userToPost = {
                username: "Akash",
                password: "JAkashBond113",
                name: "Bharad Idy"
            }
            const result = await api
                .post('/api/users')
                .send(userToPost)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            expect({username: result.body.username, name: result.body.name}).toEqual({ username: userToPost.username, name: userToPost.name })
            const users = await blogTestHelper.usersInDb()
            expect(users).toHaveLength(2)
        })
    

        test('User with no username', async() => {
            const userToPost = {
                password: "JamesBond113",
                name: "Arkad Bharad"
            }
            const result = await api
                .post('/api/users')
                .send(userToPost)
                .expect(400)

            expect(result.body).toEqual({ error: "Validation error"})
        })

        test('User with username with less than 3 characters', async() => {
            const userToPost = {
                username: "Hi",
                password: "JamesBond113",
                name: "Arkad Bharad"
            }
            const result = await api
                .post('/api/users')
                .send(userToPost)
                .expect(400)

            expect(result.body).toEqual({ error: "Validation error"})
        })

        test('User with non-unique username', async() => {
            const userToPost = {
                username: "Arkad",
                password: "AshKetchum113",
                name: "NBAPlayer"
            }
            const result = await api
                .post('/api/users')
                .send(userToPost)
                .expect(400)

        })

        test('User with username with no password', async() => {
            const userToPost = {
                username: "Arkad",
                name: "Arkad Bharad"
            }
            const result = await api
                .post('/api/users')
                .send(userToPost)
                .expect(400)

            expect(result.body).toEqual({ error: "There must be a password"})
        })

        test('User with username with no password', async() => {
            const userToPost = {
                username: "Arkad",
                password: "li",
                name: "Arkad Bharad"
            }
            const result = await api
                .post('/api/users')
                .send(userToPost)
                .expect(400)

            expect(result.body).toEqual({ error: "Password length is less than 3 characters"} )
        })
    })
})

describe('Test for blogs', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        for (const user of blogTestHelper.initialUsers) {
            await api
                .post("/api/users")
                .send(user)
        }
        const users = await blogTestHelper.usersInDb()
        await Blog.deleteMany({})
        for (let i = 0; i < blogTestHelper.initialBlogs.length; i++) {
            const blog = blogTestHelper.initialBlogs[i]
            const newBlog = new Blog(blog)
            newBlog.user = users[i].id
            await newBlog.save()
            const blogs = await Blog.find({})
            const newBlogFromDb = blogs[i]
            users[i].blogs = users[i].blogs.concat(newBlogFromDb._id)
            await User.findByIdAndUpdate(users[i].id, users[i])
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
        const users = await blogTestHelper.usersInDb()
        console.log("Users", users)
        const user = users[0]
        const loginResponse = await api
            .post("/api/login")
            .send({
                username: user.username,
                password: blogTestHelper.initialUsers[0].password
            })
        console.log("loginResponse", loginResponse.body)
        const token = loginResponse.body.token
        console.log(token)
        await api
        .post("/api/blogs")
            .send({
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
            })
            .set("Authorization", `Bearer ${token}`)
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

    test("Posting new blog post with no token provided", async () => {
        const result = await api
            .post("/api/blogs")
            .send({
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)
        expect(result.body).toEqual({ error: "Unauthorized"} )
    })

    test("Likes property is not missing from request", async () => {
        const users = await blogTestHelper.usersInDb()
        const user = users[0]
        const loginResponse = await api
                .post("/api/login")
                .send({
                    username: user.username,
                    password: blogTestHelper.initialUsers[0].password
                })

        const token = loginResponse.body.token
        await api
        .post("/api/blogs")
            .send({
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            })
            .set("Authorization", `Bearer ${token}`)
        const response = await api
                            .get("/api/blogs")
        const blogs = response.body
        blogs.forEach(blog => {
            expect(blog.likes).toBeDefined()
        })
    })

    test("400 Bad Request if title or url are missing", async() => {
        const users = await blogTestHelper.usersInDb()
        const user = users[0]
        const loginResponse = await api
            .post("/api/login")
            .send({
                username: user.username,
                password: blogTestHelper.initialUsers[0].password
            })

        const token = loginResponse.body.token
        await api
        .post("/api/blogs")
            .send({
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
            })
            .set("Authorization", `Bearer ${token}`)
            .expect(400)

            await api
            .post("/api/blogs")
            .send({
                title: "Type wars",
                author: "Robert C. Martin",
                likes: 2,
            })
            .set("Authorization", `Bearer ${token}`)
            .expect(400)
    })

    describe("Deleting blog(s)", () => {
        test("Delete 1 blog", async() => {
            const users = await blogTestHelper.usersInDb()
            const user = users[0]
            const loginResponse = await api
                .post("/api/login")
                .send({
                    username: user.username,
                    password: blogTestHelper.initialUsers[0].password
                })
    
            const token = loginResponse.body.token
            let blogs = await blogTestHelper.blogsInDb()
            const firstBlogId = blogs[0].id
            await api  
                    .delete(`/api/blogs/${firstBlogId}`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(204)

            blogs = await blogTestHelper.blogsInDb()
            const firstBlog = blogs.find(blog => blog.id === firstBlogId)
            expect(firstBlog).not.toBeDefined()
            expect(blogs).toHaveLength(blogTestHelper.initialBlogs.length - 1)
        }, 100000)

        test("Invalid id delete", async() => {
            const users = await blogTestHelper.usersInDb()
            const user = users[0]
            const loginResponse = await api
                .post("/api/login")
                .send({
                    username: user.username,
                    password: blogTestHelper.initialUsers[0].password
                })
            const token = loginResponse.body.token
            const id = "sa1231"
            await api   
                    .delete(`/api/blogs/${id}`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(400)

        }, 100000)
    })

    describe("Updating blog", () => {
        test("Update 1 blog", async() => {
            const initialFirstBlog = blogTestHelper.initialBlogs[1]
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

})


afterAll(async () => {
    await mongoose.connection.close()
})