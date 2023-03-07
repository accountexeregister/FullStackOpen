const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reduceFunc = (sum, post) => {
        return sum + post.likes
    }

    return blogs.reduce(reduceFunc, 0)
}

module.exports = {
    dummy,
    totalLikes
}