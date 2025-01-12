import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import HorizontalScrollView from './HorizontalScrollView';
import brand from '../brand/brandConfig';
import { StyledText } from './ui/StyledText';
import { useFetchPhotosByPlace } from '../hooks/fetchPhotosByPlace';

interface PlacePhotosProps {
  placeId: string;
}

const PlacePhotos = ({ placeId }: PlacePhotosProps) => {
  const { data: photos, isLoading, error } = useFetchPhotosByPlace(placeId);

  if (isLoading) {
    return (
      <View style={styles.header}>
        <StyledText fontSize="md">Loading photos...</StyledText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.header}>
        <StyledText fontSize="md" color="red">
          Error loading photos
        </StyledText>
      </View>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <View style={styles.header}>
        <StyledText fontSize="md">No photos available</StyledText>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.header}>
        <StyledText bold uppercase fontSize={'lg'}>
          Photos
        </StyledText>
      </View>
      <HorizontalScrollView
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.photo} resizeMode="cover" />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '3%',
    paddingVertical: 20,
  },
  photo: {
    width: 300,
    height: 200,
    marginRight: 10,
    borderRadius: brand.borderRadius,
  },
});

export default PlacePhotos;
