import Person from './Person.js'

const Persons = ({persons, filter, removeFunct}) => (
    persons.filter(person => person.name.toLowerCase().includes(filter.trim().toLowerCase()))
        .map(person => <Person key = {person.name} person = {person} removeFunct={removeFunct}/>)
)

export default Persons