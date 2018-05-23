import axios from 'axios';
import actionTypes from './types/form-action-types';
import { createAction } from '../helpers/redux';

/**
 * Trigger form data fetching
 * @returns {Object}
 */
export function getData() {
  return (dispatch) => {
    axios.get('./assets/form-data.json')
      .then(resp => {
        let groupForm = resp.data.payload.nodeTypes.CATALOGUE.subTypes.GROUP.attributes;
        groupForm.ACCESS_CHANNEL.options = ['Sky Atlantic', 'Sky Cinema'];
        groupForm.SECTION_NAVIGATION.options = ['Default', 'Documentaries', 'Entertainment', 'Home'];
        groupForm.VIEW_ALL.options = ['False', 'True'];
        groupForm.ORIENTATION.options = ['Landscape', 'Portrait'];
        groupForm.INTERACTION.options = ['Background', 'Expand'];
        dispatch(createAction(actionTypes.LOADED, groupForm));
      })
      .catch(err => console.error('Err', err));
  };
}

/**
 * Update state with new form data
 * @param {Object} data
 * @returns {Function}
 */
export function formLoaded(data) {
  return createAction(actionTypes.LOADED, data);
}