const PersonForm = ({updatePersons, newName, updateNewName, newNumber, updateNewNumber}) => (
    <form onSubmit = {updatePersons}>
        <div>
          name: <input value={newName} onChange={updateNewName}/>
        </div>
        <div>number: <input value={newNumber} onChange={updateNewNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm