import { createReducer } from '../helpers/redux';
import appActionTypes from '../actions/types/dragdrop-action-types';

/**
 * The initial app state
 * @type {Object}
 */
const initialState = {
  collectionType: 'Static Collection',
  collectionItems: []
};

/**
 * Create all reducers
 */
export default createReducer(initialState, {
  [appActionTypes.RESET_STATE]: () => {
    return initialState;
  },
  [appActionTypes.SAVE_COLLECTION]: (state, payload) => {
    return {
      ...state,
      collectionItems: payload.collectionItems
    };
  }
});