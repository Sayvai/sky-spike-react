import React from 'react';
import PropTypes from 'prop-types';
import styles from './targetBox.styl';
import * as constants from '../../../constants';
import { DropTarget } from 'react-dnd';
import PackShot from '../packShot/PackShot';

class TargetBox extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.selectItem = this.selectItem.bind(this);
  }

  /**
   * Invokes parent callback and selected item id
   * @param {Object} item
   */
  selectItem(item) {
    this.props.onSelectItem({
      itemId: item.id,
      itemSource: constants.ITEMS.ITEMS_BOX_COLLECTION
    });

    this.props.onResetItemsSelection({
      itemSetId: constants.ITEMS.ITEMS_BOX_RESULTS
    });
  }

  render() {
    const packshots = this.props.items.map((item) =>
      <PackShot
        item={item}
        key={item.id}
        positionIndex={item.positionIndex}
        onReorderItem={this.props.onReorderItem}
        onClick={this.selectItem.bind(this, item)}
        packshotType={constants.PACKSHOT.PACKSHOT_ITEM_COLLECTION}
        onAddItemsToCollection={this.props.onAddItemsToCollection}
      ></PackShot>
    );

    return this.props.connectDropTarget(
      <div className={styles.targetbox}>
        <p>Number of collection items: {this.props.items.length}</p>
        <ul>{ packshots }</ul>
      </div>
    );
  }
}

const dropTarget = {
  drop(props, monitor) {
    console.log('dropTarget drop props: ', props);
    console.log('dropTarget drop monitor: ', monitor.getItem());

    const dragSourceType = monitor.getItemType();
    const draggedItem = monitor.getItem();
    const dragIndex = draggedItem.positionIndex;
    const hoverIndex = props.positionIndex;
    const dropTargetType = props.packshotType;

    console.log('packshotDragIndex: ', dragIndex);
    console.log('packshotHoverIndex: ', hoverIndex);

    // Don't replace items with themselves
    //if (dragIndex === hoverIndex) {
    //  return;
    //}

    console.log('Target: ABOUT TO TRIGGER reorderItem()!');
    // Re-order items only, from within the collections box
    if (props.onReorderItem && dragSourceType === constants.PACKSHOT.PACKSHOT_ITEM_COLLECTION) {
      props.onReorderItem({dragIndex, hoverIndex});
    }

    // Add the dragged results items into the collection (target) box
    if (dragSourceType === constants.PACKSHOT.PACKSHOT_ITEM_RESULT && dragSourceType !== dropTargetType) {
      props.onAddItemsToCollection({ item: draggedItem, hoverIndex });
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

TargetBox.propTypes = {
  items: PropTypes.array,
  connectDropTarget: PropTypes.func.isRequired,
  onReorderItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  onResetItemsSelection: PropTypes.func,
  onAddItemsToCollection: PropTypes.func
};

export default DropTarget([constants.PACKSHOT.PACKSHOT_ITEM_COLLECTION, constants.PACKSHOT.PACKSHOT_ITEM_RESULT], dropTarget, collect)(TargetBox);
