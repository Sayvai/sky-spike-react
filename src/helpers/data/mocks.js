export function generatePackshots(startIndex, endIndex = 0) {
  const items = [];
  let pos = 0;

  for (let i = startIndex; i <= endIndex; i++) {
    items.push({
      id: i,
      displayName: `Movie ${i}`,
      selected: false,
      positionIndex: pos
    });

    pos++;
  }

  return items;
}