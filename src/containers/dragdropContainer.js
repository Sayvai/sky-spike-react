import { connect } from 'react-redux';
import * as dragdropActions from '../actions/dragdrop-actions';

import Dragdrop from '../components/dragdrop/Dragdrop';

const mapStateToProps = state => (
  {
    dragdropData: state.dragdrop
  }
);

const mapDispatchToProps = dispatch => (
  {
    onItemsChanged: (evt) => {
      dispatch(dragdropActions.updateItems(evt));
    }
  }
);

const DragdropContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dragdrop);

export default DragdropContainer;