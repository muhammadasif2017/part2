import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addNewName = (e) => {
    setNewName(e.target.value);
  }

  const addNewNumber = (e) => {
    setNewNumber(e.target.value);
  }

  const isPersonExist = (name) => {
    return persons.some(person => person.name === name);
  }

  const addNewPerson = (e) => {
    e.preventDefault();
    if (!isPersonExist(newName)) {
      setPersons([...persons, { name: newName, number: newNumber }]);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  console.log(persons);
  return (
    <div>
      <h2>Phonebook</h2>
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
      <ul>
        {persons.map((person) =>
          <li key={person.name}>{`${person.name} ${person.number}`}</li>
        )}
      </ul>
    </div>
  )
}

export default App