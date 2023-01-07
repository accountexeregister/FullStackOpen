import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const getPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
          setPersons(response.data)
        }
      )
  }

  useEffect(getPersons, [])

  const updateNewName = (event) => {
    setNewName(event.target.value)
  }

  const updateNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  const updatePersons = (event) => {
    event.preventDefault()
    // Checks if persons already has person with name submitted by form
    const hasPersonWithName = !!(persons.find(person => person.name === newName))
    if (hasPersonWithName) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilter={updateFilter}/>
      <h2>Add a new</h2>
      <PersonForm updatePersons={updatePersons} newName={newName} updateNewName={updateNewName} newNumber = {newNumber}
       updateNewNumber = {updateNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App
