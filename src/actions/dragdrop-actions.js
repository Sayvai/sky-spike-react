import actionTypes from './types/dragdrop-action-types';
import { createAction } from '../helpers/redux';
import { reorderArrayItems } from '../helpers/data';
import * as constants from '../constants';


/**
 * Updates collection items.
 * @param {Object} data collection data
 * @returns {Object}
 */
export function updateItems(data) {
  return createAction(actionTypes.UPDATE_ITEMS, data);
}

/**
 * Reorder collection items
 * @param {Object} data
 * @returns {Function}
 */
export function reorderCollectionItem(data) {
  return (dispatch, getState) => {
    const { collectionItems } = getState().dragdrop;
    const reorderedItems = reorderArrayItems(collectionItems.items, data.originalIndex, data.newIndex);

    dispatch(createAction(actionTypes.UPDATE_COLLECTION_ITEM, { collectionItems: reorderedItems }));
  };
}

/**
 * Set selection flag on item
 * @param {Number} id
 * @return {Object}
 */
export function selectItem(data) {
  return createAction(actionTypes.SELECT_ITEM, data);
}

/**
 * Resets the selection flags for a given item set to false
 * @param {String} itemSetId
 * @return {Object}
 */
export function resetItemsSelection(data) {
  return createAction(actionTypes.RESET_ITEMS_SELECTIONS, { id: data.itemSetId });
}

/**
 * Adds item(s) to the collection.
 * Only passes item info is only single item added,
 * otherwise, add items based on selected flags from redux state tree (resultItems)
 * @param {Function} data
 */
export function addSelectedItemsToCollection(data) {
  return (dispatch, getState) => {
    const { resultsItems } = getState().dragdrop;

    const isAnItemSelected = resultsItems.items.some(item => item.selected);

    // if a single item is passed, then set selected flag to true
    if (!isAnItemSelected && data && data.item) {
      dispatch(createAction(actionTypes.SELECT_ITEM, {
        itemId: data.item.id,
        itemSource: constants.ITEMS.ITEMS_BOX_RESULTS
      }));
    }

    dispatch(createAction(actionTypes.ADD_ITEMS_TO_COLLECTION, { dropOffsetIndex: data.dragIndex }));

    // Resets all selections
    dispatch(createAction(actionTypes.RESET_ITEMS_SELECTIONS, { id: constants.ITEMS.ITEMS_BOX_RESULTS }));
    dispatch(createAction(actionTypes.RESET_ITEMS_SELECTIONS, { id: constants.ITEMS.ITEMS_BOX_COLLECTION }));
  };
}