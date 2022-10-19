import { useState, useEffect } from 'react';
import axios from 'axios';

const Languages = ({ languages }) => {
  const languageKeys = Object.keys(languages); 
  return (
    <ul>
      {languageKeys.map((langKey) => <li key={langKey}>{languages[langKey]}</li>)}
    </ul>
  )
};

const Capitals = ({ capital }) => {
  console.log(capital);
  if (capital.length === 1) {
    return (
      <div>capital {`${capital[0]}`}</div>
    )
  }
  const showMultipleCapitals = capital.reduce((current, next) => {
    return next + ', ' + current;
  })
  return (
    <div>capitals {showMultipleCapitals}</div>
  )
}

const ShowCountries = ({ countries, fetchCountryData }) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, please specify another filter
      </div>
    );
  }
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <>
        {countries.map((country) => {
          return (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => fetchCountryData(country.name.common)}>show</button>
            </div>
          );
        })}
      </>
    );
  }

  if (countries.length) {
    const {
      name,
      area,
      capital,
      languages,
      flags
    } = countries[0];
    return (
      <div>
        <h1>{name.common}</h1>
        {capital && <Capitals capital={capital}/>}
        <div>area {`${area}`}</div>
        <div>
          <h3>languages</h3>
          <Languages languages={languages} />
        </div>
        <div>
          <img src={flags.png} alt="Country"/>
        </div>
      </div>
    );
  }
}

function App() {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState([]);

  const findCountry = (e) => {
    setCountryName(e.target.value);
  };

  const fetchCountryData = (name) => {
    const url = `https://restcountries.com/v3.1/name/${name}`;
    axios
      .get(url)
      .then((response) => { 
        console.log(response);
        setCountries(response.data);
      });
  }

  useEffect(() => {
    if (countryName !== '') {
      console.log(countryName);
      const url = `https://restcountries.com/v3.1/name/${countryName}`;
      axios
        .get(url)
        .then((response) => { 
          console.log(response);
          setCountries(response.data);
        });
    }
  }, [countryName]);

  return (
    <div>
      find countries <input value={countryName} onChange={findCountry}/>
      <ShowCountries countries={countries} fetchCountryData={fetchCountryData}/>
    </div>
  );
}

export default App;
