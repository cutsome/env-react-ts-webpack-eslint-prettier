import React, { FC } from 'react';
import styles from './app.module.css';
import logo from './images/logo.svg';
import Test from './components/Test';

const App: FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <p>Edit src/App.tsx and save to reload.</p>
        <a
          className={styles.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Test />
      </header>
    </div>
  );
};

export default App;
