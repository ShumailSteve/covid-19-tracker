import React, { useState, useEffect} from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  // Only runs once when the component loads 
  useEffect(() => {

    const getCountriesData = async () => {
      await fetch("http://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));

          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  // Update select value 
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>Covid 19 Tracker</h1>
        <FormControl className="app-dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}        
          
          </Select>
        </FormControl>
      </div>
       
      
    </div>
  );
}

export default App;
