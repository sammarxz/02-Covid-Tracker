import React, { useState, useEffect } from 'react';
import { defaults, Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

defaults.global.legend.display = false;

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            borderColor: 'rgba(255, 162, 0, 1)',
            backgroundColor: 'rgba(255, 162, 0, 0.1)',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            borderColor: 'rgba(238, 60, 60, 1)',
            backgroundColor: 'rgba(238, 60, 60, 0.1)',
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(255, 162, 0, .1)',
              'rgba(52, 198, 53, .1)',
              'rgba(238, 60, 60, .1)',
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{ legend: { display: false } }}
    />
  ) : null;

  return (
    <div className={`${styles.container} d--flex j--center w--100`}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;
