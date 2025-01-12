import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import PlacesRow from '../../../components/PlacesRow';
import { ThemeContext } from '../../../theme/theme';
import { StyledText } from '../../../components/ui/StyledText';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';
import Footer from '../../../components/ui/Footer';
import { useFetchTableData } from '../../../hooks/fetchTableData';
import { getDistance } from 'geolib';
import Hero from '../../../components/Hero';
import { Place } from '../../../types/PlacesTypes';

const HomePage = () => {
  const { data, error, isLoading } = useFetchTableData<Place>('nightclubs');
  const theme = useContext(ThemeContext);
  const windowWidth = useWindowWidth();

  // Central point for Las Vegas Strip
  const lasVegasStripCenter = { latitude: 36.1147, longitude: -115.1728 };
  const radius = 2000; // 3km radius

  // Separate places into "On the Strip" and "Off the Strip"
  const onTheStrip = data?.filter((place) => {
    const { lat, lng } = place.location; // Adjust based on your data structure
    return (
      lat && lng && getDistance({ latitude: lat, longitude: lng }, lasVegasStripCenter) <= radius
    );
  });
  const offTheStrip = data?.filter((place) => !onTheStrip?.includes(place));
  return (
    <ScrollView style={[styles.screen, { backgroundColor: theme.values.backgroundColor }]}>
      {/** Hero Section **/}
      <Hero />

      {/** Section - Title, description and Sorting Selection **/}
      <View style={styles.sectionHeader}>
        {/** Section Title and description**/}
        <StyledText fontSize={windowWidth > breakpoints.small ? 50 : 25} bold>
          Find Nightclubs in Las Vegas
        </StyledText>
      </View>

      {/** Display rows for "On the Strip" **/}
      <View style={styles.sectionContentContainer}>
        <PlacesRow
          category={'On the Strip'}
          places={onTheStrip}
          loading={isLoading}
          error={error}
        />
      </View>

      {/** Display rows for "Off the Strip" **/}
      <View style={styles.sectionContentContainer}>
        <PlacesRow
          category={'Off the Strip'}
          places={offTheStrip}
          loading={isLoading}
          error={error}
        />
      </View>
      {Platform.OS === 'web' && <Footer />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  sectionHeader: {
    flex: 1,
    paddingHorizontal: '3%',
    marginVertical: 40,
  },
  sectionHeaderTextContainer: {
    gap: 5,
  },
  sectionContentContainer: {
    paddingTop: 0,
    zIndex: -1,
  },
});

export default HomePage;
