import { useState } from 'react';

const Filter = ({ nameToFind, findPerson }) => {
  return (
    <div>
      filter shown with <input value={nameToFind} onChange={findPerson}/>
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  addNewName,
  addNewNumber,
  addNewPerson
}) => {
  return (
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
  );
};

const Persons = ({ searchResult, persons }) => {
  if (searchResult.length > 0) {
    return (
      <>
        {searchResult.map((person) => <div key={person.name}>{`${person.name} ${person.number}`}</div>)}
      </>
    )
  }
  return (
    <>
      {persons.map((person) =><div key={person.name}>{`${person.name} ${person.number}`}</div>)}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameToFind, setNameToFind] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const addNewName = (e) => {
    setNewName(e.target.value);
  };

  const addNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const findPerson = (e) => {
    setNameToFind(e.target.value);
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
      <Filter nameToFind={nameToFind} findPerson={findPerson}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addNewName={addNewName} addNewNumber={addNewNumber} addNewPerson={addNewPerson}/>
      <h2>Numbers</h2>
      <Persons searchResult={searchResult} persons={persons}/>
    </div>
  )
}

export default App