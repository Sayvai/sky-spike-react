import { connect } from 'react-redux';
import { dragdropActions } from '../actions/dragdrop-actions';
import { dragdropActionTypes } from '../actions/types/dragdrop-action-types';
import { createAction } from '../helpers/redux';

import Dragdrop from '../components/dragdrop/Dragdrop';

const mapStateToProps = state => (
  {
    dragdropData: state.dragdrop
  }
);

const mapDispatchToProps = dispatch => (
  {
    onSave: (evt) => {
      evt.preventDefault();
      dispatch(dragdropActions.saveCollection(evt));
    }
  }
);

const DragdropContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dragdrop);

export default DragdropContainer;