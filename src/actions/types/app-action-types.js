import { createConstants } from '../../helpers/redux';

export default createConstants(
  { prefix: '@app/' },
  'SHOW_PRELOADER',
  'HIDE_PRELOADER',
  'SET_ATOM_VERSION',
  'RESET_DIRTY'
);