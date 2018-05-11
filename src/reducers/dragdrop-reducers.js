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
  },
  [appActionTypes.UPDATE_COLLECTION_ITEM]: (state, payload) => {
    return {
      ...state,
      collectionItems: {
        ...state.collectionItems,
        items: payload.collectionItems
      }
    };
  },
  [appActionTypes.SELECT_ITEM]: (state, payload) => {
    const items = dataHelpers.clone(state.collectionItems.items);

    return {
      ...state,
      collectionItems: {
        ...state.collectionItems,
        items: dataHelpers.toggleItemSelection(items, payload.itemId)
      }
    };
  }
});