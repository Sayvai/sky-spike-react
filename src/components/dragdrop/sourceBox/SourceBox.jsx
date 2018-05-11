import React from 'react';
import PropTypes from 'prop-types';
import styles from './sourceBox.styl';
import PackShot from '../packShot/PackShot';
import * as constants from '../../../constants';

class SourceBox extends React.Component {
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
      itemSource: constants.ITEMS.ITEMS_BOX_RESULTS
    });

    this.props.onResetItemsSelection({
      itemSetId: constants.ITEMS.ITEMS_BOX_COLLECTION
    });
  }

  render() {
    const packshots = this.props.items.map((item) =>
      <PackShot
        item={item}
        key={item.id}
        positionIndex={item.positionIndex}
        onClick={this.selectItem.bind(this, item)}
        packshotType={constants.PACKSHOT.PACKSHOT_ITEM_RESULT}
      ></PackShot>
    );

    return (
      <div className={styles.sourcebox}>
        <p>Number of results: {this.props.items.length}</p>
        <ul>{ packshots }</ul>
      </div>
    );
  }
}

SourceBox.propTypes = {
  items: PropTypes.array.isRequired,
  onSelectItem: PropTypes.func,
  onResetItemsSelection: PropTypes.func
};

export default SourceBox;