const Person = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Persons = ({persons}) => {
  return (
  <ul>
  {persons.map( person => {
    return <Person key={person.name} person={person} />
  })}
  </ul>)
}

export default Persons
