import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import * as Location from 'expo-location'; // Import Expo Location
import PlacesRow from '../../../components/PlacesRow';
import { useFetchMultipleNearbyPlaces } from '../../../hooks/useFetchMultipleNearbyPlaces';
import { ThemeContext } from '../../../theme/theme';
import { StyledText } from '../../../components/ui/StyledText';
import DropDownSelect from '../../../components/ui/DropDownSelect';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';
import Footer from '../../../components/ui/Footer';
import { PlaceProps } from '../../EatOutTypes';
import { useLocationStore } from '../../../stores/useLocationStore'; // Import the Zustand store

const HomePage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const radius = 5000;
  const type = 'restaurant';

  // Define dynamic categories for fetching data
  const categories = {
    couisines: ['mexican', 'italian', 'chinese', 'american', 'korean-bbq', 'sushi'],
    price: ['budget-friendly', 'fine-dining', 'fast-food'],
  };

  // Sorting options are generated dynamically based on the categories object
  const sortByOptions = Object.keys(categories).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
    value: key,
  }));

  // Sorting state
  const [sortBy, setSortBy] = useState<string>(sortByOptions[0].value); // Initialize to the first category dynamically

  // Fetch the current location from Zustand store
  const { location, setLocation } = useLocationStore();

  // Fetching data based on the current sortBy value
  const selectedCategories = categories[sortBy];

  const { data: restaurants, isLoading, error } = useFetchMultipleNearbyPlaces(
    location?.lat || 36.1699, // Default to Las Vegas coordinates if location is not yet available
    location?.lng || -115.1398,
    radius,
    type,
    selectedCategories,
  );

  // Initialize theme
  const theme = useContext(ThemeContext);
  const windowWidth = useWindowWidth();

  // Handle the sort by selection
  const handleSortBy = (option: string) => {
    setSortBy(option);
  };

  // Request permission and get location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    })();
  }, [setLocation]);

  if (errorMsg) {
    Alert.alert('Location Error', errorMsg);
  }
  return (
    <ScrollView style={[styles.screen, { backgroundColor: theme.values.backgroundColor }]}>
      {/** Section - Title, description and Sorting Selection **/}
      <View style={styles.sectionHeader}>
        {/** Section Title and description**/}
        <View style={styles.sectionHeaderTextContainer}>
          <StyledText fontSize={windowWidth > breakpoints.small ? 50 : 25} bold uppercase>
            Find Restaurants Near You
          </StyledText>
          <StyledText fontSize={'lg'}>Eat out uses your location to find restaurants near you!</StyledText>
        </View>

        {/** Dropdown Selector For Sorting Selection **/}
        <View style={[styles.dropDownContainer, { width: windowWidth > breakpoints.small ? '50%' : '100%' }]}>
          <StyledText fontSize={'sm'} uppercase bold>
            {'Sort by'}
          </StyledText>
          <DropDownSelect
            options={sortByOptions}
            onSelect={handleSortBy}
            initialValue={sortByOptions[0].label}
          />
        </View>
      </View>

      {/** Display rows for each category **/}
      <View style={styles.sectionContentContainer}>
        {selectedCategories.map((category) => (
          <PlacesRow
            key={category}
            category={category}
            places={restaurants[category] || []}
            loading={isLoading}
            error={error}
          />
        ))}
      </View>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 20,
  },
  sectionHeader: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: '3%',
    gap: 20,
  },
  sectionHeaderTextContainer: {
    gap: 10,
  },
  dropDownContainer: {
    gap: 10,
    paddingBottom: 20,
  },
  sectionContentContainer: {
    zIndex: -1,
    paddingBottom: 20,
  },
});

export default HomePage;
