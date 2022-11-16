import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/persons'
import Filter from './components/filter'
import PersonForm from './components/person_form'
import personService from './services/persons'

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
    personService.getAll()
      .then( data => setPersons(data))
      .catch( err => console.log("couldn't get all persons", err))
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
    personService
      .create(newObject)
      .then( data => {
        console.log("contact added succesfully");
        getPeople();
        setNewName("");
        setNewNum("");
      })
      .catch( err => console.log("contact was not added"));
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
      <Persons persons={persons} setPersons={setPersons} namesToShow={namesToShow}/>
    </div>
  )
}

export default App
