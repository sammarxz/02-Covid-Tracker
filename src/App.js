import React, { Component } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";

import styles from "./App.module.css";

class App extends Component {
  state = {
    data: {},
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  render() {
    const { data } = this.state;

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
      </div>
    );
  }
}

export default App;
