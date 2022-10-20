import { useState, useEffect } from 'react';

import personServices from './services/phonebook';

import './App.css';

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

const Persons = ({ searchResult, persons, deletePerson }) => {
  if (searchResult.length > 0) {
    return (
      <>
        {searchResult.map((person) => <div key={person.name}>{`${person.name} ${person.number}`}</div>)}
      </>
    )
  }
  return (
    <>
      {persons.map((person) => {
        return (
          <div key={person.name}>
            {`${person.name} ${person.number}`}
            <button onClick={() => deletePerson(person)}>delete</button>
          </div>
        )
      })}
    </>
  );
};

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={ messageType === 'Error' ? 'error' : 'success'}>
      {message}
    </div>
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
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

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
    return persons.find(person => person.name === name);
  };

  const addNewPerson = (e) => {
    e.preventDefault();
    const isPersonFound = isPersonExist(newName);
    const addNewPerson = { name: newName, number: newNumber };
    if (!isPersonFound) {
      personServices
        .createPerson(addNewPerson)
        .then((person) => {
          setPersons([...persons, person]);
          setMessage(`Added ${newName}`);
          setMessageType('Success');
          setTimeout(() => {
            setMessage(null);
            setMessageType('');
          }, 5000);
        })
        .catch(error => alert(error));
      
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const { id } = isPersonFound;
        personServices
          .updatePerson(id, addNewPerson)
          .then((response) => { 
            const updatePersonsList = persons.map((person) => person.id !== id ? person : response);
            setPersons(updatePersonsList);
          })
          .catch((error) => alert(error));
      }
    }
  };

  const deletePerson = (person) => {
    const { id, name } = person;
    if (window.confirm(`Delete ${name} ?`)) {
      personServices
        .deletePerson(id)
        .then(() => {
          const allPersons = persons.filter(person => person.id !== id);
          setPersons(allPersons);
        })
        .catch((error) => {
          setMessage(
            `Information of ${name} has already been removed from server`
          );
          setMessageType('Error');
          setTimeout(() => {
            setMessage(null);
            setMessageType('');
          }, 5000);
          setPersons(persons.filter(person => person.id !== id));
        })
    }
  };

  useEffect(() => {
    personServices
      .getAllPersons()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        alert(error);
      })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType}/>
      <Filter nameToFind={nameToFind} findPerson={findPerson}/>
      <h3>add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addNewName={addNewName}
        addNewNumber={addNewNumber}
        addNewPerson={addNewPerson} 
      />
      <h2>Numbers</h2>
      <Persons searchResult={searchResult} persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App