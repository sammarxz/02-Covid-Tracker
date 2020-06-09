import React, { useState, useEffect } from 'react';

import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };

    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <div>
      <select
        onChange={(e) => handleCountryChange(e.target.value)}
        defaultValue="global"
        className={styles.picker}
      >
        <option value="">Global</option>
        {fetchedCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryPicker;
