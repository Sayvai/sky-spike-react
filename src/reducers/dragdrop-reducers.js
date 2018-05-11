import { createReducer } from '../helpers/redux';
import * as dataHelpers from  '../helpers/data';
import appActionTypes from '../actions/types/dragdrop-action-types';
import * as Constants from '../constants';
import { addItemsToCollectionSet } from '../helpers/data/manipulator';

/**
 * The initial app state
 * @type {Object}
 */
const initialState = {
  collectionType: 'Static Collection',
  resultsItems: {
    id: Constants.ITEMS_BOX_RESULTS,
    items: dataHelpers.generatePackshots(1, 10)
  },
  collectionItems: {
    id: Constants.ITEMS_BOX_COLLECTION,
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
    const items = dataHelpers.clone(state[payload.itemSource].items);

    return {
      ...state,
      [payload.itemSource]: {
        ...state[payload.itemSource],
        items: dataHelpers.toggleItemSelection(items, payload.itemId)
      }
    };
  },
  [appActionTypes.RESET_ITEMS_SELECTIONS]: (state, payload) => {
    const items = dataHelpers.clone(state[payload.id].items);

    return {
      ...state,
      [payload.id]: {
        ...state[payload.id],
        items: dataHelpers.resetItemsSelections(items)
      }
    };
  },
  [appActionTypes.ADD_ITEMS_TO_COLLECTION]: (state, payload) => {
    return {
      ...state,
      ...addItemsToCollectionSet(state.resultsItems, state.collectionItems, payload.dropOffsetIndex)
    };
  }
});