const mongoose = require('mongoose')

const url = process.env.DB_URL

mongoose.set('strictQuery', false)
mongoose.connect(url)
const numberSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    number: String
})

numberSchema.set('toJSON', {
    transform: (document, entry) => {
        entry.id = entry._id.toString()
        delete entry._id
        delete entry.__v
    }
})
module.exports = mongoose.model('Number', numberSchema)



