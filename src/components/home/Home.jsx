import React from 'react';
import styles from './home.styl';

function Home() {
  return (
    <div className={styles.home}>
      <p>Welcome to this Sky Spike - React project</p>
      <p>The main purpose of this project is to explore and prototype various typical challenging features of editors</p>
      <p>This project utilises the main technologies listed below:</p>
      <ul>
        <li><a href="https://facebook.github.io/react/docs/react-dom.html" target="_blank" rel="noopener noreferrer">react-dom</a> (16.2.0)</li>
        <li><a href="https://github.com/reactjs/react-redux" target="_blank" rel="noopener noreferrer">react-redux</a> (5.0.7)</li>
        <li><a href="https://github.com/reacttraining/react-router" target="_blank" rel="noopener noreferrer">react-router-dom</a> (4.2.2)</li>
        <li><a href="https://github.com/gaearon/redux-thunk" target="_blank" rel="noopener noreferrer">redux-thunk</a> (2.2.0)</li>
        <li><a href="https://webpack.github.io/" target="_blank" rel="noopener noreferrer">webpack</a> (4.1.1)</li>
        <li><a href="https://github.com/babel/babel" target="_blank" rel="noopener noreferrer">babel</a> (6.26.0)</li>
        <li><a href="https://github.com/eslint/eslint" target="_blank" rel="noopener noreferrer">eslint</a></li>
        <li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">nodeJS</a> (8.10.0)</li>
      </ul>
    </div>
  );
}

export default Home;