import React, { useContext } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { PlaceCardProps } from '../app/EatOutTypes';
import { StyledText } from './ui/StyledText';
import { getDistance } from 'geolib';
import brand from '../brand/brandConfig';
import { ThemeContext } from '../theme/theme';
import { useRouter } from 'expo-router';
import { useWindowWidth, breakpoints } from '../hooks/useWindowWidth';
import usePriceSymbol from '../hooks/usePriceSymbol';
import { useLocationStore } from '../stores/useLocationStore';

const getPhotoUrl = (photoReference: string) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.GOOGLE_PLACES_API_KEY}&callback=`;
};

function PlaceCard({ place }: PlaceCardProps) {
  const imageUrl = place.photos?.length
    ? getPhotoUrl(place.photos[0].photo_reference)
    : 'https://th.bing.com/th/id/OIP.sWCvltMZF_s3mjA5sL-RdgHaE8?rs=1&pid=ImgDetMain';

  const { location } = useLocationStore();
  const distance = location ? getDistance(location, place.geometry.location) : 0; //Returns distance in meters
  const milesAway: number = distance * 0.000621371;

  // Initialize theme
  const theme = useContext(ThemeContext);

  //Initialize router
  const router = useRouter();

  const goToPlace = (place: string) => {
    // Navigate to home/places/[place]
    router.push(`/tabs/${place}`);
  };
  const priceSymbol = usePriceSymbol(place.price_level)
  const windowWidth  = useWindowWidth();
  return (
    <Pressable
      style={windowWidth > breakpoints.small ? styles.placeContainerWeb : styles.placeContainerMobile}
      onPress={() => goToPlace(place.place_id)}>
      <Image source={{ uri: imageUrl }} style={[styles.image, {height: windowWidth > breakpoints.small ? 150 : 150}]} resizeMode={'cover'} />
      <View style={styles.infoContainer}>
        <StyledText fontSize="md" numberOfLines={1} align="left">
          {place.name}
        </StyledText>
        <StyledText fontSize="sm" color={theme.values.color} numberOfLines={1} align="left">
          {milesAway.toFixed(2)} miles away
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
