import React from 'react';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({ data: { confirmed, recovered, deaths } }) => {
  if (!confirmed) {
    return 'Loading';
  }

  const dataItems = [confirmed, recovered, deaths];

  dataItems[0].name = 'infected';
  dataItems[1].name = 'recovered';
  dataItems[2].name = 'deaths';

  return (
    <div className="d--flex j--spaceBetween f--wrap w--100">
      {dataItems.map((item) => (
        <div key={item.name} className={cx(styles.card, styles[item.name])}>
          <img
            src={`./img/icons/${item.name}.svg`}
            alt={item.name}
            className={styles.cardIcon}
          />
          <h3 className={cx('fw--bold', styles.cardValue)}>
            <CountUp start={0} end={item.value} duration={2.5} separator="." />
          </h3>
          <h2 className={cx('fw--bold', styles.cardTitle)}>{item.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Cards;
