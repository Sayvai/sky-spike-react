import React from 'react';
import PropTypes from 'prop-types';
import styles from './targetBox.styl';
import Constants from '../../../constants';
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
      itemId: item.id
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

const squareTarget = {
  drop(props, monitor) {
    console.log('squareTarget drop props: ', props);
    console.log('squareTarget drop monitor: ', monitor.getItem());
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
  onSelectItem: PropTypes.func
};

export default DropTarget(Constants.PACKSHOT, squareTarget, collect)(TargetBox);