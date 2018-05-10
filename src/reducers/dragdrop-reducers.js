import { createReducer } from '../helpers/redux';
import * as dataHelpers from  '../helpers/data';
import appActionTypes from '../actions/types/dragdrop-action-types';

/**
 * The initial app state
 * @type {Object}
 */
const initialState = {
  collectionType: 'Static Collection',
  resultsItems: {
    id: 'resultsItems',
    items: dataHelpers.generatePackshots(1, 10)
  },
  collectionItems: {
    id: 'collectionItems',
    items: dataHelpers.generatePackshots(11, 15)
  }
};

/**
 * Create all reducers
 */
export default createReducer(initialState, {
  [appActionTypes.RESET_STATE]: () => {
    return initialState;
  },
  [appActionTypes.UPDATE_ITEMS]: (state, payload) => {
    return {
      ...state,
      resultsItems: {
        ...state.resultsItems,
        items: payload.resultsItems ? payload.resultsItems.items : state.resultsItems.items
      },
      collectionItems: {
        ...state.collectionItems,
        items: payload.collectionItems ? payload.collectionItems.items : state.collectionItems.items
      }
    };
  }
});