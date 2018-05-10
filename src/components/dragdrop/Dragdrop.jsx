import React from 'react';
import PropTypes from 'prop-types';
import styles from './dragdrop.styl';
import * as dataHelpers from  '../../helpers/data';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Dragdrop = ({ dragdropData, onItemsChanged}) => {
  const getList = id => dragdropData[id].items;

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey'
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const onDragEnd = result => {
    // Access drag event property values
    const { source, destination } = result;

    // dropped outside the list, so do nothing
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Item was not drag and dropped outside of it's original dropzone. Likely reordered.
      const items = dataHelpers.reorderArrayItems(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      // Invoke parent callback to update Redux state tree
      onItemsChanged({
        [source.droppableId]: { items }
      });
    } else {
      // Item was drag and dropped outside of it's original dropzone to a different dropzone
      const itemSets = dataHelpers.moveDragDropItems(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      // Invoke parent callback to update Redux state tree
      onItemsChanged({
        [source.droppableId]: { items: itemSets[source.droppableId] },
        [destination.droppableId]: { items: itemSets[destination.droppableId] }
      });
    }
  };

  return (
    <div className={styles.dragdrop_component}>
      <h2>Feature - Drag and Drop</h2>
      <p>{ dragdropData.collectionType }</p>
      <p>You can drag multi drag packshots from results dropzone to collection dropzone...</p>
      <div className={styles.dragdrop_library_component}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={dragdropData.resultsItems.id}>
            {(providedDroppable, snapshotDroppable) => (
              <div
                ref={providedDroppable.innerRef}
                className={styles.dragdrop_library_component_lists}
                style={getListStyle(snapshotDroppable.isDraggingOver)}>
                {dragdropData.resultsItems.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}>
                    {(providedDraggable, snapshotDraggable) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        className={styles.dragdrop_library_component_item}
                        style={getItemStyle(
                          snapshotDraggable.isDragging,
                          providedDraggable.draggableProps.style
                        )}>
                        {item.displayName}
                      </div>
                    )}
                  </Draggable>
                ))}
                {providedDroppable.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId={dragdropData.collectionItems.id}>
            {(providedDroppable, snapshotDroppable) => (
              <div
                ref={providedDroppable.innerRef}
                className={styles.dragdrop_library_component_lists}
                style={getListStyle(snapshotDroppable.isDraggingOver)}>
                {dragdropData.collectionItems.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}>
                    {(providedDraggable, snapshotDraggable) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        className={styles.dragdrop_library_component_item}
                        style={getItemStyle(
                          snapshotDraggable.isDragging,
                          providedDraggable.draggableProps.style
                        )}>
                        {item.displayName}
                      </div>
                    )}
                  </Draggable>
                ))}
                {providedDroppable.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

Dragdrop.propTypes = {
  onItemsChanged: PropTypes.func.isRequired,
  dragdropData: PropTypes.shape({
    collectionType: PropTypes.string,
    resultsItems: PropTypes.object,
    collectionItems: PropTypes.object
  })
};

Dragdrop.defaultProps = {
  dragdropData: PropTypes.object
};

export default Dragdrop;