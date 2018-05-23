import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as dragdropActions from '../../actions/dragdrop-actions';
import styles from './dragdrop.styl';
import Dragdrop from '../../components/dragdrop/Dragdrop';

class DragDropContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.dragdropContainer}>
        <h2>Feature - Drag and Drop</h2>
        <p>{ this.props.dragdropData.collectionType }</p>
        <p>Build your feature component here...</p>
        <Dragdrop
          data={this.props.dragdropData}
          onItemsChanged={this.props.onItemsChanged}
          onReorderCollectionItems={this.props.onReorderCollectionItems}
          onSelectItem={this.props.onItemSelected}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    dragdropData: state.dragdrop
  }
);

const mapDispatchToProps = dispatch => (
  {
    onItemsChanged: evt => {
      dispatch(dragdropActions.updateItems(evt));
    },
    onReorderCollectionItems: evt => {
      dispatch(dragdropActions.reorderCollectionItem({
        originalIndex: evt.dragIndex,
        newIndex: evt.hoverIndex
      }));
    },
    onItemSelected: evt => {
      dispatch(dragdropActions.selectItem({
        itemId: evt.itemId
      }));
    }
  }
);

DragDropContainer.propTypes = {
  onItemsChanged: PropTypes.func.isRequired,
  onReorderCollectionItems: PropTypes.func,
  onItemSelected: PropTypes.func,
  dragdropData: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContainer);