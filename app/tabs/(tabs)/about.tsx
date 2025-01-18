import React from 'react';
import { StyleSheet, View, Image, Platform, ScrollView } from 'react-native';
import { ThemeContext } from '../../../theme/theme';
import Footer from '../../../components/ui/Footer';
import { StyledText } from '../../../components/ui/StyledText';
import brand from '../../../brand/brandConfig';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';

const AboutPage = () => {
  // Initialize theme
  const theme = React.useContext(ThemeContext);
  const windowWidth = useWindowWidth();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          ...styles.screen,
          // Configure background color with theme
          backgroundColor: theme.values.backgroundColor,
        }}>
        <View style={styles.container}>
          <Image source={{ uri: brand.logo.light }} style={{ width: 100, height: 100 }} />
          <StyledText fontSize={windowWidth > breakpoints.small ? 50 : 25} align={'left'} bold>
            Your AI Nightlife Guide
          </StyledText>
          <StyledText align={'center'}>
            Eat Out is a food finder app that helps users discover nearby restaurants.{'\n'}
            {'\n'}
            It features an AI chat (currently in development), where the AI is fully aware of
            restaurant options around you and helps explore personalized recommendations.{'\n'}
            {'\n'}
            This can be particularly useful if your in a new city or just looking to explore fresh
            options.
          </StyledText>
        </View>
      </ScrollView>
      {Platform.OS === 'web' && <Footer />}
    </View>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3%',
    paddingTop: 100,
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
