import { useState, useEffect } from 'react'
import axios from 'axios'


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

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({addName, newName, newNum, handleNameChange, handleNumChange}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
      number: <input value={newNum} onChange={handleNumChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const checkRepeatName = () => {
    let names = persons.map( person => person.name);
    return (names.includes(newName));
  }
  const getPeople = function() {
    axios.get("http://localhost:3001/persons")
      .then( response => {
        setPersons(response.data);
      })
  }
  useEffect(getPeople,[]);

  const addName = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNum,
    }
    if (checkRepeatName()) {
      alert(`${newName} is already added to the phonebook`)
      return;
    }
    setPersons(persons.concat(newObject));
    setNewName("");
    setNewNum("");
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const namesToShow = (newFilter === "")
    ? persons
    : persons.filter( person => {
      let lowerCaseName = person.name.toLowerCase();
      let lowerCaseFilter = newFilter.toLowerCase();
      return lowerCaseName.includes(lowerCaseFilter);
    })

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a New</h2>
      <PersonForm addName={addName} newName={newName} newNum={newNum}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange} />

      <h2>Numbers</h2>
      <Persons persons={namesToShow} />
    </div>
  )
}

export default App
