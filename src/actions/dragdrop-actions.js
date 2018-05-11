import actionTypes from './types/dragdrop-action-types';
import { createAction } from '../helpers/redux';
import { reorderArrayItems } from '../helpers/data';


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