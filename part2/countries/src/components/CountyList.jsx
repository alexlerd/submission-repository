// CountryList Component
import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area}</p>
    <p>
      <strong>Languages: </strong>
    </p>
    <ul>
      {country.languages &&
        Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
    </ul>
    <img
      src={country.flags.svg}
      alt={`Flag of ${country.name.common}`}
      width={200}
      height={200}
    />
  </div>
);

const CountryList = ({ searchText }) => {
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState({});

  useEffect(() => {
    if (searchText) {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchText}`)
        .then((response) => {
          setCountries(response.data);
        });
    }
  }, [searchText]);

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <button onClick={() => setShowCountry(country)}>View Info</button>
            {showCountry.name &&
              showCountry.name.common === country.name.common && (
                <CountryDetails country={country} />
              )}
          </div>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }

  return null;
};

export default CountryList;
