import { useState } from 'react'

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

const dummyNames = [
  {name: 'Arto Hellas', number: '040-1234567'},
  {name: 'Jimmy Bean', number: '32465123' },
  {name: 'Dentist', number: '8014566578' }
]

const App = () => {
  const [persons, setPersons] = useState(dummyNames)
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const checkRepeatName = () => {
    let names = persons.map( person => person.name);
    return (names.includes(newName));
  }

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
    // alert("filter data");
  }

  // const namesToShow = persons;

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
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <h2>Add a New</h2>
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
      <h2>Numbers</h2>
      <Persons persons={namesToShow} />
      <div>debug: {newName}</div>
      <div>debug: {newNum}</div>
      <div>debug: {newFilter}</div>
    </div>
  )
}

export default App

// {persons.map( person => {
//   <li key={person.id}>{person.name}</li>
// })}

    // return <li key={person.name}>{person.name}</li>
