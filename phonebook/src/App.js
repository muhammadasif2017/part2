import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const addNewName = (e) => {
    setNewName(e.target.value);
  }

  const isPersonExist = (name) => {
    return persons.some(person => person.name === name);
  }

  const addNewPerson = (e) => {
    e.preventDefault();
    if (!isPersonExist(newName)) {
      setPersons([...persons, { name: newName }]);
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) =>
          <li key={person.name}>{person.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App