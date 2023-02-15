const Person = ({person, removeFunct}) => (
    <div>{person.name} {person.number} <button type="button" onClick={() => removeFunct(person.id, person.name)}>delete</button></div>
)

export default Person