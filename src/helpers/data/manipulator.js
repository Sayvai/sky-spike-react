/**
 * Reorder the items within the given array (list)
 * @param {Array} list
 * @param {Number} startIndex
 * @param {Number} endIndex
 */
export function reorderArrayItems(list, startIndex, endIndex) {
  let items = Array.from(list);
  const selectedItems = items.filter(item => item.selected) || [];

  // Handle multiple items for reorder here,
  // else, deal with single item reorder
  if (selectedItems.length > 0) {
    // Extracted all unselected items
    const unselectedItems = resetPositionIndexes((items.filter(item => !item.selected) || []));

    // Get the nearest (to the left) unselected item
    const nearestUnselectedItem = items.reverse().find(item => {
      if (item.positionIndex <= endIndex && !item.selected) {
        return item;
      }
    });

    // Get new drop position index
    const dropAnchorIndex = unselectedItems.find(item => {
      return item.id === nearestUnselectedItem.id;
    }).positionIndex;

    // reorder multi-selected items
    unselectedItems.splice(dropAnchorIndex, 0, ...selectedItems);
    items = unselectedItems;
  } else {
    let [removed] = items.splice(startIndex, 1);

    items.splice(endIndex, 0, removed);
  }

  // Reset position position indexes
  items = resetPositionIndexes(items);

  return items;
}

/**
 * Resets the positionIndex
 * @param {Array} list
 * @returns {Array}
 */
export function resetPositionIndexes(list) {
  return list.map((item, index) => {
    return {
      ...item,
      positionIndex: index
    };
  });
}

/**
 * Clone an object
 * @param {Object} item
 * @returns {Object} clone of item
 */
export function clone(item) {
  return JSON.parse(JSON.stringify(item));
}

/**
 * Toggles the selection flag for given item within the list based on item id
 * @param {Array} items
 * @param {Number} id
 */
export function toggleItemSelection(items, id) {
  return items.map(item => {
    if (item.id === id) {
      item.selected = !item.selected;
    }

    return item;
  });
}