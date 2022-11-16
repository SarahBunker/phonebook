import personService from '../services/persons'

const Button = ({clickFunction, text}) => {
  return <button onClick={clickFunction}>{text}</button>
}

const DeleteButton = ({id, namesToShow, persons, setPersons}) => {
  function clickDelete () {
    personService
      .remove(id)
      .then( data => {
        console.log("person removed")
        let index = findIndex(id, persons);
        if (!index) console.log("index error");
        let copyPersons = [...persons];
        copyPersons.splice(index,1);
        setPersons(copyPersons);
      })
      .catch( err => console.log("can't remove this person", err))
  }
  return <Button clickFunction={clickDelete} text="delete"/>
}

function findIndex(id, persons) {
  let index = null;
  persons.forEach((item, i) => {
    if (item.id === id) index = i;
  });
  return index;
}

const Person = ({person, persons, setPersons, namesToShow}) => {
  return (
    <li>{person.name} {person.number} <DeleteButton id={person.id} persons={persons} setPersons={setPersons} namesToShow={namesToShow}/></li>
  )
}

const Persons = ({namesToShow, persons, setPersons}) => {
  return (
    <ul>
    {namesToShow.map( person => {
      return <Person key={person.name} person={person} persons={persons} setPersons={setPersons} namesToShow={namesToShow}/>
    })}
    </ul>)
}

export default Persons
