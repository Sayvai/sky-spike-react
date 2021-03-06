import React from 'react';
import PropTypes from 'prop-types';
import styles from './packShot.styl';
import * as constants from '../../../constants';
import { DragSource, DropTarget } from 'react-dnd';

class PackShot extends React.Component {
  constructor(props) {
    super(props);
  }

  getPackshotType() {
    return this.props.packshotType;
  }

  render() {
    const classes = [styles.packshot];
    // Apply conditional classes (just like ng-class in AngularJS)
    this.props.item.selected && classes.push(styles['packshot--selected']);

    return this.props.connectDragSource(
      this.props.connectDropTarget(
        <div className={classes.join(' ')} onClick={this.props.onClick}>
          <img src={'https://picsum.photos/81/120/?image=' + (this.props.item.id + 10)}/>
          <span>{this.props.item.displayName}</span>
        </div>
      )
    );
  }
}

const itemSpec = {
  // intercept drag events
  beginDrag(props) {
    return {
      ...props.item
    };
  }
};

const itemSpecDrop = {
  drop(props, monitor, component) {
    const dragSourceType = monitor.getItemType();
    const draggedItem = monitor.getItem();
    const dragIndex = draggedItem.positionIndex;
    const hoverIndex = props.positionIndex;
    const dropTargetType = props.packshotType;

    console.log('packshotDragIndex: ', dragIndex);
    console.log('packshotHoverIndex: ', hoverIndex);

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    // const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    // const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    /*if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }*/

    // Dragging upwards
    /*if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }*/
    
    console.log('Packshot: ABOUT TO TRIGGER reorderItem()!');
    // Re-order items only, from within the collections box
    if (props.onReorderItem && dragSourceType === constants.PACKSHOT.PACKSHOT_ITEM_COLLECTION) {
      props.onReorderItem({dragIndex, hoverIndex});
    }

    // Add the dragged results items into the 
    if (dragSourceType === constants.PACKSHOT.PACKSHOT_ITEM_RESULT && dragSourceType !== dropTargetType) {
      props.onAddItemsToCollection({ item: draggedItem, hoverIndex });
    }

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    // monitor.getItem().index = hoverIndex;
  }
};

function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function collect(connect, monitor) {
  // binds DND properties to component
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

PackShot.propTypes = {
  item: PropTypes.object.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  isDragging: PropTypes.bool.isRequired,
  forbidDrag: PropTypes.bool,
  onReorderItem: PropTypes.func,
  onClick: PropTypes.func,
  packshotType: PropTypes.string,
  onAddItemsToCollection: PropTypes.func
};

export default DragSource((props) => {
  return props.packshotType;
}, itemSpec, collect)(
  DropTarget([constants.PACKSHOT.PACKSHOT_ITEM_COLLECTION, constants.PACKSHOT.PACKSHOT_ITEM_RESULT], itemSpecDrop, collectDrop)(PackShot));
