import { createReducer } from '../helpers/redux';
import appActionTypes from '../actions/types/app-action-types';

/**
 * The initial app state, holding the static navigation..
 * @type {Object}
 */
const initialState = {
  version: '',
  title: 'Sky Spike - React'
};

/**
 * Create all reducers for the main header (aka the app)
 */
export default createReducer(initialState, {
  [appActionTypes.RESET_STATE]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  }
});