import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const updateNewName = (event) => {
    setNewName(event.target.value)
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
      name: newName
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
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key = {person.name}>{person.name}</div>)}
    </div>
  )
}

export default App