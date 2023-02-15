import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import axiosService from './services/AxiosService.js'
import MessageNotification from './Notifications/MessageNotification.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const getPersons = () => {
    axiosService.get()
      .then(persons => {
          setPersons(persons)
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
    const personWithName = (persons.find(person => person.name === newName))
    if (!!personWithName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const updatedPerson = {...personWithName, number: newNumber}
        axiosService.put(updatedPerson.id, updatedPerson).then(
          updatedP => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
            setMessage(`Updated ${updatedPerson.name}`)
            setTimeout(() => setMessage(null), 5000)
          }
        )

      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    axiosService.post(newPerson).then(newP => {
      setPersons(persons.concat(newP)) 
      setMessage(`Added ${newP.name}`)
      setTimeout(() => setMessage(null), 5000)
    }) 
  }

  const deletePerson = (id, name) => {
    if (window.confirm("Delete " + name + " ?"))
    {
      axiosService.remove(id).then(response =>
        {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Deleted ${name}`)
          setTimeout(() => setMessage(null), 5000)
          return response
        }
      ).catch(error =>
        {
          alert("Already removed")
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <MessageNotification message = {message}/>
      <Filter filter={filter} updateFilter={updateFilter}/>
      <h2>Add a new</h2>
      <PersonForm updatePersons={updatePersons} newName={newName} updateNewName={updateNewName} newNumber = {newNumber}
       updateNewNumber = {updateNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removeFunct={deletePerson}/>
    </div>
  )
}

export default App
