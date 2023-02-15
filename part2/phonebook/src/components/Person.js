const Person = ({person, removeFunct}) => (
    <div>{person.name} {person.number} <button type="button" onClick={() => removeFunct(person.id)}>delete</button></div>
)

export default Person