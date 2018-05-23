import React from 'react';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import styles from './app.styl';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Dragdrop from './containers/dragdrop/dragdrop';
import Form from './containers/form/form';

function App() {
  return (
    <Router history={browserHistory}>
      <div className={styles.component}>
        <Header/>
        <Route exact path="/" component={Home} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/dragdrop" component={Dragdrop} />
      </div>
    </Router>);
}

export default App;