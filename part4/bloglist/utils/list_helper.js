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
        return null
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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}