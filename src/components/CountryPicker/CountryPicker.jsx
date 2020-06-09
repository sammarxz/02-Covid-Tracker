import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange, country }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(country);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };

    fetchAPI();
  }, [setFetchedCountries]);

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
    handleCountryChange(selectedOption.value);
  };

  const options = [{ value: '', label: 'Global' }];
  fetchedCountries.map((countryName) => options.push({ value: countryName, label: countryName }));

  return (
    <div className={styles.picker}>
      <Select
        placeholder="by Country"
        value={selectedCountry}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export default CountryPicker;
