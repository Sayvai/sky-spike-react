import { createReducer } from '../helpers/redux';
import appActionTypes from '../actions/types/form-action-types';

/**
 * The initial app state
 * @type {Object}
 */
const initialState = {
  fields: []
};

/**
 * Create all reducers
 */
export default createReducer(initialState, {
  [appActionTypes.LOADED]: (state, payload) => {
    return {
      ...state,
      fields: [
        { ...payload.ACCESS_CHANNEL },
        { ...payload.SECTION_NAVIGATION },
        { ...payload.HEROBANNER },
        { ...payload.ALIAS },
        { ...payload.VIEW_ALL },
        { ...payload.COLOR },
        { ...payload.ORIENTATION },
        { ...payload.INTERACTION }
      ]
    };
  }
});