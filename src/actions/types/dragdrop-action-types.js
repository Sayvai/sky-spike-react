import { createConstants } from '../../helpers/redux';

export default createConstants(
  { prefix: '@dragdrop/' },
  'UPDATE_ITEMS',
  'UPDATE_COLLECTION_ITEM',
  'SELECT_ITEM',
  'RESET_ITEMS_SELECTIONS',
  'ADD_ITEMS_TO_COLLECTION'
);