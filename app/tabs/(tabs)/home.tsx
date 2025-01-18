import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import PlacesRow from '../../../components/PlacesRow';
import { ThemeContext } from '../../../theme/theme';
import { StyledText } from '../../../components/ui/StyledText';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';
import Footer from '../../../components/ui/Footer';
import { useFetchTableData } from '../../../hooks/queries/useFetchTableData';
import { getDistance } from 'geolib';
import Hero from '../../../components/Hero';
import { PlaceProps } from '../../../types/PlacesTypes';
import { useNightclubsStore } from '../../../stores/useNightclubStore';

const HomePage = () => {
  // Initialize theme context
  const theme = useContext(ThemeContext);
  // Get the window width
  const windowWidth = useWindowWidth();

  // Fetch nightclubs data
  const { data, error, isLoading: isFetching } = useFetchTableData<PlaceProps>('nightclubs');

  // Set the nightclubs data in the store
  const { nightclubs, setNightclubs, setLoading, isLoading } = useNightclubsStore();

  // Check if data is available and set the nightclubs data in the store
  useEffect(() => {
    if (data && data.length > 0) {
      setNightclubs(data);
    }
  }, [data, setNightclubs]);

  // Check if nightclub data is loading and set it in the store
  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching, setLoading]);

  // Central point for Las Vegas Strip
  const lasVegasStripCenter = { latitude: 36.1147, longitude: -115.1728 };
  const radius = 2000; // 3km radius

  // Filter places into "On the Strip" and "Off the Strip"
  const onTheStrip = nightclubs?.filter((place) => {
    const { lat, lng } = place.location; // Adjust based on your data structure
    return (
      lat && lng && getDistance({ latitude: lat, longitude: lng }, lasVegasStripCenter) <= radius
    );
  });
  const offTheStrip = nightclubs?.filter((place) => !onTheStrip?.includes(place));

  return (
    <ScrollView style={[styles.screen, { backgroundColor: theme.values.backgroundColor }]}>
      {/** Hero Section **/}
      <Hero />

      {/** Section - Title, description and Sorting Selection **/}
      <View style={styles.sectionHeader}>
        {/** Section Title and description**/}
        <StyledText fontSize={windowWidth > breakpoints.small ? 30 : 25} bold>
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
    marginTop: 40,
    marginBottom: 20,
  },
  sectionHeaderTextContainer: {
    gap: 5,
  },
  sectionContentContainer: {
    marginBottom: 10,
  },
});

export default HomePage;
