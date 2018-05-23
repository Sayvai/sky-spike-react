import {combineReducers} from 'redux';

import app from './app-reducers';
import dragdrop from './dragdrop-reducers';
import form from './form-reducers';

const reducers = combineReducers({
  app,
  dragdrop,
  form
});

export default reducers;