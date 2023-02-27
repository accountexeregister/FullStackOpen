require('dotenv').config()
const express = require('express')
let morgan = require('morgan')
const Number = require('./models/number.js')
morgan.token('postdata', (request, response) => {
    if (request.method !== 'POST') {
        return ' '
    }

    return JSON.stringify(request.body)
})
const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postdata'))
app.use(express.static('build'))

app.get('/api/persons', (request, response) => 
    Number.find({}).then(numbers => {
        response.json(numbers)
    })
)

app.get('/info', (request, response) => {
    Number.find({}).then(numbers => {
    const firstLine = `<p>Phonebook has info for ${numbers.length} people</p>`
    const time = new Date(Date.now()).toString()
    const secondLine = `<p>${time}</p>`
    response.send(firstLine + secondLine)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Number.findById(id).then(person => {
        if (person === null) {
            return response.status(404).end()
        }
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (!person)
    {
        return response.status(404).end()
    }

    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    const requestName = person.name
    if (!requestName) {
        return response.status(400).json({ error: 'there must be a name' })
    }

    const requestNumber = person.number
    if (!requestNumber) {
        return response.status(400).json({ error: 'there must be a number'})
    }

    const personWithRequestName = persons.find(person => person.name === requestName)
    
    if (personWithRequestName) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const id = Math.floor(Math.random() * 5000000)
    const newPerson = {
        id,
        ...person
    }
    persons = persons.concat(newPerson)
    response.json(person)
})

app.put('/api/persons/:id', (request, response) => {
    const personWithId = request.body
    const id = Number(request.params.id)
    const updatedPerson = {
        id,
        ...personWithId
    }
    persons = persons.map(person => person.id === id ? updatedPerson : person)
    response.json(updatedPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log("Server running on port " + PORT))