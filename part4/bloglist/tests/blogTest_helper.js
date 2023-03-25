const Blog = require("./../models/Blog")
const User = require("./../models/User")
const bcrypt = require('bcrypt')


const initialUsers = [
    {
        blogs: [],
        username: "Michael Chan",
        password: "JackiefanLover",
        name: "Michael"
    },
    {   
        blogs: [],
        username: "Edsger",
        password: "johncena115",
        name: "Edgsger W. Dijkstra"
    },
    {   
        blogs: [],
        username: "Bruce",
        password: "113eet",
        name: "BruceLee"
    },        
]

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 5
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
       
    },
    {
        
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12, 
    },
]

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(user => {
        user.id = user._id.toString()
        return user
    })
}

module.exports = { initialUsers, initialBlogs, blogsInDb, usersInDb }