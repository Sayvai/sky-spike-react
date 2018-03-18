import React from 'react';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import styles from './app.styl';
import Header from './header/Header';
import Home from './home/Home';
import DragdropContainer from '../containers/dragdropContainer';

function App() {
  return (
    <Router history={browserHistory}>
      <div className={styles.component}>
        <Header/>
        <Route exact path="/" component={Home} />
        <Route exact path="/dragdrop" component={DragdropContainer} />
      </div>
    </Router>);
}

export default App;