import React, { useState, useEffect} from 'react';
import { FormControl, Select, MenuItem, Card } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});

  // Only runs once when the component loads 
  useEffect(() => {
      fetch('http://disease.sh/v3/covid-19/all')
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);


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
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;    

    const url = countryCode === "worldwide" ? 'http://disease.sh/v3/covid-19/all' :
      `http://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        console.log(data);
      });
  }

  return (
    <div className="app">
      <div className="app__left">
          {/* Header */}
        <div className="app__header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}        
            </Select>
          </FormControl>
        </div>

          {/* STATS */}
        <div className="app__stats">
          {/* Coronavirus Cases */}
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

          {/* Recovered Cases */}
          <InfoBox title="Recoverd" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

          {/* Deaths Cases */}
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
         {/* Maps */}
        <Map />
      </div>

      <Card className="app__right">
          {/* Table */}
        <h3>Live Cases by Country </h3>
        {/* Graph */}
        <h3>Graph</h3>
      </Card>
      
      
      
      
    </div>
  );
}

export default App;
