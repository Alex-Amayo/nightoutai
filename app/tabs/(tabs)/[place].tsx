import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { ThemeContext } from '../../../theme/theme';
import { useLocalSearchParams } from 'expo-router';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';
import PlacePhotos from '../../../components/PlacePhotos';
import Footer from '../../../components/ui/Footer';
import HeaderImageGradient from '../../../components/HeaderImageGradient';
import { useLocationStore } from '../../../stores/useLocationStore';
import { getDistance } from 'geolib';
import PlaceActionButtons from '../../../components/PlaceActionButtons';
import { useFetchPhotosByPlace } from '../../../hooks/fetchPhotosByPlace';
import { useFetchPlaceById } from '../../../hooks/useFetchPlaceById';

const PlacesScreen = () => {
  // Retrieve raw query parameters
  const { id: rawId } = useLocalSearchParams();

  // Parse rawId and rawPlaceId
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  // Fetch Place by ID from the "places" table
  const { data: place, isLoading, error } = useFetchPlaceById(id);

  const theme = useContext(ThemeContext);
  const windowWidth = useWindowWidth();
  const { location } = useLocationStore();

  const {
    data: photos,
    isLoading: isPhotosLoading,
    error: photosError,
  } = useFetchPhotosByPlace(place?.google_place_id ?? '');

  // Get distance from place
  const distance = location ? getDistance(location, { latitude: place?.location.lat ?? 0, longitude: place?.location.lng ?? 0, }) : 0;
  const milesAway: number = distance * 0.000621371;

  // Get the first photo URL or fallback to a placeholder
  const firstPhotoUrl = photos?.[0]?.url || 'https://via.placeholder.com/800';

  return (
    <ScrollView style={{ backgroundColor: theme.values.backgroundColor }}>
      {/** Header Image Component **/}
      <HeaderImageGradient
        name={place?.name ?? ''}
        priceLevel={place?.price_level}
        imageUrl={firstPhotoUrl} // Use the first photo from Supabase
        distance={milesAway}
      />

      {/** Action Buttons for Large Screens **/}
      {windowWidth >= breakpoints.large ? (
        <PlaceActionButtons formattedAddress={place?.address ?? ''} />
      ) : null}

      <View style={styles.placeContentContainer}>
        {/** Photos **/}
        <PlacePhotos placeId={place?.google_place_id ?? ''} />
      </View>

      {/** Action Buttons for Small Screens **/}
      {windowWidth < breakpoints.large ? (
        <PlaceActionButtons formattedAddress={place?.address ?? ''} />
      ) : null}

      {Platform.OS === 'web' && <Footer />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  placeContentContainer: {
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
  },
});

export default PlacesScreen;
