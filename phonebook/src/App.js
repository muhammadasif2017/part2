import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const addNewName = (e) => {
    setNewName(e.target.value);
  };

  const addNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const findPerson = (e) => {
    setNameFilter(e.target.value);
    const regex = new RegExp(e.target.value, 'ig');
    const searchResult = persons.filter((person) => regex.test(person.name));
    setSearchResult(searchResult);
  }

  const isPersonExist = (name) => {
    return persons.some(person => person.name === name);
  };

  const addNewPerson = (e) => {
    e.preventDefault();
    if (!isPersonExist(newName)) {
      setPersons([...persons, { name: newName, number: newNumber }]);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={nameFilter} onChange={findPerson}/>
        </div>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={addNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={addNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        searchResult.length > 0 
          ? searchResult.map((person) => <div key={person.name}>{`${person.name} ${person.number}`}</div>)
          : persons.map((person) =><div key={person.name}>{`${person.name} ${person.number}`}</div>)
      }
    </div>
  )
}

export default App