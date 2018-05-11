import React from 'react';
import PropTypes from 'prop-types';
import styles from './sourceBox.styl';
import PackShot from '../packShot/PackShot';

class SourceBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const packshots = this.props.items.map((item) =>
      <PackShot
        item={item}
        key={item.id}
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
  items: PropTypes.array.isRequired
};

export default SourceBox;