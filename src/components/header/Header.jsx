import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.styl';

function Header() {
  return (
    <header className={styles.header}>
      <h1>Sky Spike - React</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dragdrop">Drag and Drop</Link></li>
      </ul>
    </header>
  );
}

export default Header;