import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import HorizontalScrollView from './HorizontalScrollView';
import brand from '../brand/brandConfig';
import { StyledText } from './ui/StyledText';
import { PhotoProps } from '../types/PlacesTypes';
import { ThemeContext } from '../theme/theme';

interface PlacePhotosProps {
  photos: PhotoProps[] | undefined;
  isLoading: boolean;
}

const PlacePhotos = ({ photos, isLoading }: PlacePhotosProps) => {
  const theme = useContext(ThemeContext);

  if (isLoading) {
    return (
      <View>
        <View style={styles.header}>
          <StyledText bold uppercase fontSize={'lg'}>
            Photos
          </StyledText>
        </View>
        <HorizontalScrollView
          data={Array.from({ length: 10 }, (_, index) => ({ id: index.toString(), url: '' }))}
          keyExtractor={(item) => item.id}
          renderItem={() => (
            <View
              style={[
                styles.skeletonPhoto,
                { backgroundColor: theme.values.isDark ? '#333333' : '#e0e0e0' },
              ]}
            />
          )}
        />
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
    marginHorizontal: '5%',
    paddingVertical: 20,
  },
  photo: {
    width: 300,
    height: 200,
    marginRight: 10,
    borderRadius: brand.borderRadius,
  },
  skeletonPhoto: {
    width: 300,
    height: 200,
    marginRight: 10,
    borderRadius: brand.borderRadius,
  },
});

export default PlacePhotos;
