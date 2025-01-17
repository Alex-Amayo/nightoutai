import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { ThemeContext } from '../../../theme/theme';
import { useLocalSearchParams } from 'expo-router';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';
import PlacePhotos from '../../../components/PlacePhotos';
import Footer from '../../../components/ui/Footer';
import HeaderImageGradient from '../../../components/HeaderImageGradient';
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

  const {
    data: photos,
    isLoading: isPhotosLoading,
    error: photosError,
  } = useFetchPhotosByPlace(place?.google_place_id ?? '');

  // Get the second photo URL (usually better for header) or fallback to a placeholder
  const headerPhotoURL =
    photos?.[0]?.url ||
    'https://xyyfo01l4d.ufs.sh/f/YPschnd1m5QkVmPiAE4SldTaxryP3gAKYZw7n05JjQ9ctqsm';

  return (
    <ScrollView style={{ backgroundColor: theme.values.backgroundColor }}>
      {/** Header Image Component **/}
      <HeaderImageGradient
        name={place?.name ?? ''}
        priceLevel={place?.price_level}
        imageUrl={headerPhotoURL} // Use the first photo from Supabase
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
