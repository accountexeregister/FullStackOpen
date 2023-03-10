const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reduceFunc = (sum, post) => {
        return sum + post.likes
    }

    return blogs.reduce(reduceFunc, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length == 0) {
        return {}
    }

    const reduceFunc = (currentBlog, blog) => {
        if (blog.likes > currentBlog.likes) {
            return blog
        }
        return currentBlog
    }
    const favouriteBlogFull = blogs.reduce(reduceFunc)
    return { 
        title: favouriteBlogFull.title, 
        author: favouriteBlogFull.author, 
        likes: favouriteBlogFull.likes 
    }
}

const mostBlogs = (blogs) => {
    const blogsGrouped = _.groupBy(blogs, (blog) => blog.author)
    const blogMost = _.reduce(blogsGrouped, (result, value, key) => {
        if (!result.author || value.length > result.blogs) {
            result.author = key
            result.blogs = value.length
        }
        return result
    }, {})
    return blogMost
}

const mostLikes = (blogs) => {
    const blogsGrouped = _.groupBy(blogs, (blog) => blog.author)
    const blogsMapped = _.mapValues(blogsGrouped, (blogs) => {
            return _.reduce(blogs, (sum, blog) => {
                    return sum + blog.likes
                }, 0)
        }
    ) 
    const blogMost = _.reduce(blogsMapped, (result, value, key) => {
        if (!result.author || value > result.likes) {
            result.author = key
            result.likes = value
        }
        return result
    }, {})
    return blogMost
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}