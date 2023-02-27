const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length === 4) {
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://accexeregister:${password}@cluster0.zbo8jph.mongodb.net/phonebookdb?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)
const numberSchema = mongoose.Schema({
    name: String,
    number: String
})

const Number = mongoose.model('Number', numberSchema)

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const personNumber = new Number({
        name,
        number
    })
    personNumber.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
    console.log("phonebook:")
    Number.find({}).then(result => {
        result.forEach(entry => {
            console.log(`${entry.name} ${entry.number}`)
        })
        mongoose.connection.close()
    })
}