import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const updateNewName = (event) => {
    setNewName(event.target.value)
  }

  const updateNewNumber = (event) => {
    setNewNumber(event.target.value)
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
      <form onSubmit = {updatePersons}>
        <div>
          name: <input value={newName} onChange={updateNewName}/>
        </div>
        <div>number: <input value={newNumber} onChange={updateNewNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key = {person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App
