import React from 'react';
import PropTypes from 'prop-types';
import styles from './dragdrop.styl';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SourceBox from './sourceBox/SourceBox';
import TargetBox from './targetBox/TargetBox';

class Dragdrop extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.dragdrop}>
        <p>I am THE drag drop component</p>
        <section>
          <SourceBox
            items={this.props.data.resultsItems.items}
            onSelectItem={this.props.onSelectItem}
            onResetItemsSelection={this.props.onResetItemsSelection}
          />
          <TargetBox
            items={this.props.data.collectionItems.items}
            onReorderItem={this.props.onReorderCollectionItems}
            onSelectItem={this.props.onSelectItem}
            onResetItemsSelection={this.props.onResetItemsSelection}
            onAddItemsToCollection={this.props.onAddItemsToCollection}
          />
        </section>
      </div>
    );
  }
}

Dragdrop.propTypes = {
  onItemsChanged: PropTypes.func.isRequired,
  onReorderCollectionItems: PropTypes.func,
  onSelectItem: PropTypes.func,
  onResetItemsSelection: PropTypes.func,
  onAddItemsToCollection: PropTypes.func,
  data: PropTypes.shape({
    collectionType: PropTypes.string,
    collectionItems: PropTypes.object,
    resultsItems: PropTypes.object
  })
};

export default DragDropContext(HTML5Backend)(Dragdrop);