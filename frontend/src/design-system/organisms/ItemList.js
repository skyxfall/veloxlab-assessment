import React, { memo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import ItemRow from './ItemRow';
import ListShell from './ListShell';

function ItemList({ items, height, rowHeight, isBusy = false, onVisibleRangeChange }) {
  const handleItemsRendered = useCallback(
    ({ visibleStartIndex, visibleStopIndex }) => {
      onVisibleRangeChange?.({ start: visibleStartIndex, stop: visibleStopIndex });
    },
    [onVisibleRangeChange],
  );

  return (
    <ListShell height={height} isBusy={isBusy}>
      <List
        height={height}
        itemCount={items.length}
        itemSize={rowHeight}
        width="100%"
        itemData={items}
        outerElementType="ul"
        innerElementType="div"
        onItemsRendered={handleItemsRendered}
      >
        {ItemRow}
      </List>
    </ListShell>
  );
}

export default memo(ItemList);
