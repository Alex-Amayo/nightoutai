import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CategoryRowProps, PlaceProps } from '../app/EatOutTypes';
import PlaceCard from './PlaceCard';
import { StyledText } from './ui/StyledText';
import HorizontalScrollView from './HorizontalScrollView';
import SkeletonPlaceCard from './SkeletonPlaceCard';

function PlacesRow({ category, places, loading, error }: CategoryRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.header}>
        <StyledText bold uppercase fontSize={'lg'}>
          {category}
        </StyledText>
      </View>
      <View style={styles.listContainer}>
        {loading ? (
          <HorizontalScrollView
            data={Array(20).fill({})} // Placeholder data for skeleton loading]
            // @ts-expect-error key extractor for skeleton
            keyExtractor={(_, index) => `skeleton-${index}`}
            renderItem={() => <SkeletonPlaceCard />}

          />
        ) : error ? (
          <StyledText>{'error loading ' + { category }}</StyledText>
        ) : (
          <HorizontalScrollView
            data={places}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => <PlaceCard place={item} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '3%',
  },
  listContainer: {
    paddingVertical: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default PlacesRow;
