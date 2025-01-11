import React, { useContext } from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../../theme/theme';
import { useFetchPlaceDetails } from '../../../hooks/useFetchPlaceDetails';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';
import PlacePhotos from '../../../components/PlacePhotos';
import Footer from '../../../components/ui/Footer';
import ReviewsList from '../../../components/ReviewsList';
import HeaderImageGradient from '../../../components/HeaderImageGradient';
import LoadingScreen from '../../../components/ui/LoadingScreen';
import { StyledText } from '../../../components/ui/StyledText';
import { useLocationStore } from '../../../stores/useLocationStore';
import { getDistance } from 'geolib';
import brand from '../../../brand/brandConfig';
import PlaceActionButtons from '../../../components/PlaceActionButtons'; // Import the new component

const PlacesScreen = () => {
  const router = useRouter();
  const { place } = useLocalSearchParams();
  const place_id = Array.isArray(place) ? place[0] : place;

  const theme = useContext(ThemeContext);
  const windowWidth = useWindowWidth();
  const { location } = useLocationStore();
  const fields = 'name,formatted_address,photos,reviews,website,url,price_level,geometry';
  const { data, isLoading, error } = useFetchPlaceDetails(place_id, fields);
  const distance = location && data ? getDistance(location, data.geometry.location) : 0; //Returns distance in meters
  const milesAway: number = distance * 0.000621371;
  if (!place_id) {
    return (
      <View style={styles.centered}>
        <Text>Place ID is missing or invalid.</Text>
      </View>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error fetching place details: {error.message}</Text>
      </View>
    );
  }
  const imageUrl = data?.photos?.[0]?.photo_reference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.photos[0].photo_reference}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    : 'https://stadiumhelp.com/wp-content/uploads/2019/12/best-las-vegas-buffets.jpg';

  return (
    <ScrollView style={{ backgroundColor: theme.values.backgroundColor }}>
      {/** Header Image Component **/}
      {data ? (
        <HeaderImageGradient
          name={data?.name}
          priceLevel={data.price_level}
          imageUrl={imageUrl}
          distance={milesAway}
        />
      ) : null}

      {/** Action Buttons **/}
      {
        windowWidth >= breakpoints.large ?
        <PlaceActionButtons
          formattedAddress={data?.formatted_address ?? ''}
          website={data?.website}
          url={data?.url}
        />
          :
          null
      }

      <View style={styles.placeContentContainer}>
        {/** Photos **/}
        <PlacePhotos photos={data?.photos} googleApiKey={process.env.GOOGLE_PLACES_API_KEY!} />

        {/** Reviews **/}
        {data?.reviews ? <ReviewsList reviews={data.reviews} /> : null}
      </View>

      {/** Action Buttons **/}
      {
        windowWidth < breakpoints.large ?
          <PlaceActionButtons
            formattedAddress={data?.formatted_address ?? ''}
            website={data?.website}
            url={data?.url}
          />
          :
          null
      }

      <Footer />
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
