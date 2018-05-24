import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './App';

// Logger with default options
import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true
});

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    logger
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    setTimeout(render);
  });
}