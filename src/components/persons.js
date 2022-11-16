import personService from '../services/persons'

const Button = ({clickFunction, text}) => {
  return <button onClick={clickFunction}>{text}</button>
}

const DeleteButton = ({id}) => {
  function clickDelete () {
    return deleteFunction(id)
  }
  return <Button clickFunction={clickDelete} text="delete"/>
}

function deleteFunction(id) {
  console.log("id", id)
  personService
    .remove(id)
    .then( data => {
      console.log("person removed")
      //Fix me, update state
    })
    .catch( err => console.log("can't remove this person", err))
}

const Person = ({person}) => {
  return (
    <li>{person.name} {person.number} <DeleteButton id={person.id}/></li>
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
