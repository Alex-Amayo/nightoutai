import React, { useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View, StyleSheet } from 'react-native';
import Arrow from './Arrow';
import { useWindowWidth, breakpoints } from '../hooks/useWindowWidth'; // Import the Arrow component

interface HorizontalScrollViewProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T) => string;
}

function HorizontalScrollView<T>({ data, renderItem, keyExtractor }: HorizontalScrollViewProps<T>) {
  const flatListRef = useRef<FlatList<T>>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0); // Track content width

  // Scroll list by 5 items at a time
  const scrollList = (direction: 'left' | 'right') => {
    if (flatListRef.current) {
      const newOffset = direction === 'left'
        ? Math.max(0, scrollOffset - 310 * 5) // Move left by 5 items
        : scrollOffset + 310 * 5; // Move right by 5 items
      flatListRef.current.scrollToOffset({
        offset: newOffset,
        animated: true,
      });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  };

  const handleContentSizeChange = (contentWidth: number) => {
    setContentWidth(contentWidth);
  };

  const windowWidth = useWindowWidth();

  // Determine whether arrows should be hidden
  const hideLeftArrow = scrollOffset <= 0;
  const hideRightArrow = scrollOffset >= contentWidth - windowWidth;

  return (
    <View style={styles.container}>
      {windowWidth > breakpoints.medium ? <Arrow direction="left" onPress={() => scrollList('left')} hidden={hideLeftArrow} /> : null}
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={handleContentSizeChange} // Track content size
        // Apply paddingLeft dynamically if windowWidth < breakpoints.large
        style={[styles.list, windowWidth < breakpoints.medium ? { paddingLeft: '3%' } : null]}
      />
      {windowWidth > breakpoints.medium ? <Arrow direction="right" onPress={() => scrollList('right')} hidden={hideRightArrow} />: null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Ensures the list and arrows are displayed in a row
    alignItems: 'center',
  },
  list: {
    flex: 1, // Allows the list to take up available space between arrows
  },
});

export default HorizontalScrollView;
