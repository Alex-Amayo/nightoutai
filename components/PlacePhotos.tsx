import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import HorizontalScrollView from './HorizontalScrollView';
import brand from '../brand/brandConfig';
import { StyledText } from './ui/StyledText';

interface PlacePhotosProps {
  photos?: { photo_reference: string }[];
  googleApiKey: string;
}

const PlacePhotos = ({ photos, googleApiKey }: PlacePhotosProps) => {
  if (!photos || photos.length === 0) {
    return null;
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
        keyExtractor={(item) => item.photo_reference}
        renderItem={({ item }) => {
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${googleApiKey}`;
          return <Image source={{ uri: photoUrl }} style={styles.photo} resizeMode="cover" />;
        }}
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
    height: 300,
    marginRight: 10,
    borderRadius: brand.borderRadius,
  },
});

export default PlacePhotos;
