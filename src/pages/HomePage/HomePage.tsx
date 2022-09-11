import React, { FC } from 'react';

import styles from './HomePage.module.scss';

const HomePage: FC = () => (
  <div className={styles.HomePage} data-testid='HomePage'>
    HomePage Component
  </div>
);

export default HomePage;
