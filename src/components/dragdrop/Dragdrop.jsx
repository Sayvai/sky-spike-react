import React from 'react';
import PropTypes from 'prop-types';
import styles from './dragdrop.styl';

const Dragdrop = ({ dragdropData , onSave}) => {
  return (
    <div className={styles.dragdrop}>
      <h2>Feature - Drag and Drop</h2>
      <p>{ dragdropData.collectionType }</p>
      <p>Build your feature component here...</p>
    </div>
  );
};

Dragdrop.propTypes = {
  onSave: PropTypes.func.isRequired,
  dragdropData: PropTypes.shape({
    collectionType: PropTypes.string,
    collectionItems: PropTypes.array,
  }),
};

Dragdrop.defaultProps = {
  dragdropData: PropTypes.object,
};

export default Dragdrop;