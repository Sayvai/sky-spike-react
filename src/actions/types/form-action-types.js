import { createConstants } from '../../helpers/redux';

export default createConstants(
  { prefix: '@form/' },
  'GET',
  'LOADED',
  'SEND'
);