const express = require('express')
let morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny'))

let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => 
    response.json(persons)
)

app.get('/info', (request, response) => {
    const firstLine = `<p>Phonebook has info for ${persons.length} people</p>`
    const time = new Date(Date.now()).toString()
    const secondLine = `<p>${time}</p>`
    response.send(firstLine + secondLine)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (!person)
    {
       return response.status(404).end()
    }

    response.json(person)
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

const PORT = 3001
app.listen(PORT, () => console.log("Server running on port " + PORT))