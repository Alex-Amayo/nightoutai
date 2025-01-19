import React, { useContext } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { PlaceProps } from '../types/PlacesTypes';
import { StyledText } from './ui/StyledText';
import { getDistance } from 'geolib';
import brand from '../brand/brandConfig';
import { ThemeContext } from '../theme/theme';
import { useRouter } from 'expo-router';
import { useWindowWidth, breakpoints } from '../hooks/useWindowWidth';
import usePriceSymbol from '../hooks/usePriceSymbol';
import { useLocationStore } from '../stores/useLocationStore';
import { useFetchPhotosByPlace } from '../hooks/queries/useFetchPhotosByPlace';
import SkeletonPlaceCard from './SkeletonPlaceCard';

function PlaceCard(place: PlaceProps) {
  const { data: photos, isLoading } = useFetchPhotosByPlace(place.google_place_id);

  const fallbackImage =
    'https://th.bing.com/th/id/OIP.sWCvltMZF_s3mjA5sL-RdgHaE8?rs=1&pid=ImgDetMain';
  //Use the second photo if available, otherwise use the first photo, otherwise use the fallback image (Second Photo usually better)
  const imageUrl = photos?.[1]?.url || photos?.[0]?.url || fallbackImage;

  // Initialize theme
  const theme = useContext(ThemeContext);

  // Initialize router
  const router = useRouter();
  const goToPlace = (place: PlaceProps) => {
    // Navigate to home/places/[place] with id and place.id
    router.push(`/tabs/${place.name}?id=${place.id}`);
  };

  const priceSymbol = usePriceSymbol(place.price_level);
  const windowWidth = useWindowWidth();

  if (isLoading) {
    return <SkeletonPlaceCard />; // Show loading state
  }

  return (
    <Pressable
      style={
        windowWidth > breakpoints.small ? styles.placeContainerWeb : styles.placeContainerMobile
      }
      onPress={() => goToPlace(place)}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { height: windowWidth > breakpoints.small ? 150 : 150 }]}
        resizeMode={'cover'}
      />
      <View style={styles.infoContainer}>
        <StyledText fontSize="md" numberOfLines={1} bold align="left">
          {place.name}
        </StyledText>
        <StyledText fontSize="sm" color={theme.values.color} numberOfLines={1} align="left">
          Price: {priceSymbol}
        </StyledText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  placeContainerWeb: {
    width: 300,
    marginRight: 10,
  },
  placeContainerMobile: {
    width: 200,
    marginRight: 10,
  },
  image: {
    width: '100%',
    borderRadius: brand.borderRadius,
  },
  infoContainer: {
    marginTop: 10,
    gap: 5,
  },
});

export default PlaceCard;
