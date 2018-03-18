import actionTypes from './types/dragdrop-action-types';
import { createAction } from '../helpers/redux';


/**
 * Save collection items.
 * @param {Object} data collection data
 * @returns {Object}
 */
export function saveCollection(data) {
  return createAction(actionTypes.SAVE_COLLECTION, data.items);
}