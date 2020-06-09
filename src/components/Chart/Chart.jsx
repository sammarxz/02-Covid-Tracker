import React, { useState, useEffect } from 'react';
import { defaults, Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

defaults.global.legend.display = false;

const Chart = (props) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  });

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

  return (
    <div className={`${styles.container} d--flex j--center w--100`}>
      {lineChart}
    </div>
  );
};

export default Chart;
