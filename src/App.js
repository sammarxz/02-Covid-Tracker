import React, { Component } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";

import styles from "./App.module.css";

class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    this.setFetchedData();
  }

  handleCountryChange = async (country) => {
    this.setFetchedData(country);
  };

  setFetchedData = async (country) => {
    const fetchedData = await fetchData(country || "");

    this.setState({
      data: fetchedData,
      country,
    });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className="container">
        <header
          className={`${styles.header} d--flex a--center j--spaceBetween f--wrap w--100 mtb--40`}
        >
          <h1>Covid Tracker</h1>
          <p className="c--lightGray">
            Last update on{" "}
            <span className="fw--bold">
              {new Date(data.lastUpdate).toDateString()}
            </span>
          </p>
        </header>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
