import React, { FC } from 'react';
import styles from './app.module.css';
import Test from './components/Test';

const App: FC = () => {
  return (
    <div className={styles.back}>
      <Test />
      <h1 className={styles.title}>Hello</h1>
      <p className={styles.title2}>aho</p>
    </div>
  );
};

export default App;
