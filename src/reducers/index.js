import {combineReducers} from 'redux';

import app from './app-reducers';
import dragdrop from './dragdrop-reducers';

const reducers = combineReducers({
  app,
  dragdrop
});

export default reducers;