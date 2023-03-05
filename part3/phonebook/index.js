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

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Not a valid id'})
    }

    next(error)
}

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

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Number.findById(id).then(person => {
        if (person === null) {
            return response.status(404).end()
        }
        response.json(person)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Number.findByIdAndDelete(request.params.id).then(person => {
        if (person) {
            response.status(204).end()
        } else {
            response.status(404).send({ error: `person with id ${request.params.id} does not exist`})
        }
    }).catch(error => next(error))
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

    Number.find({ name: requestName }).then(personsWithRequestName => {
        console.log(personsWithRequestName)
        if (personsWithRequestName.length > 0) {
            return response.status(400).json({ error: 'name must be unique' })
        }

        const newPerson = new Number({
            ...person
        })
        newPerson.save().then(personSaved => {
            response.json(personSaved)
        })
    })
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

const unknownRoute = (request, response) => {
    response.status(404).json({error: "unknown route"})
}
app.use(unknownRoute)
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log("Server running on port " + PORT))