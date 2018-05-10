export function generatePackshots(startIndex, endIndex = 0) {
  const items = [];

  for (let i = startIndex; i <= endIndex; i++) {
    items.push({
      id: i,
      displayName: `Movie ${i}`
    });
  }

  return items;
}