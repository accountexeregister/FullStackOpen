import Person from './Person.js'

const Persons = ({persons, filter}) => (
    persons.filter(person => person.name.toLowerCase().includes(filter.trim().toLowerCase()))
        .map(person => <Person key = {person.name} person = {person}/>)
)

export default Persons