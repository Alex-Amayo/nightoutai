import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemeContext } from '../../../theme/theme';
import Footer from '../../../components/ui/Footer';
import { StyledText } from '../../../components/ui/StyledText';
import brand from '../../../brand/brandConfig';

const AboutPage = () => {
  // Initialize theme
  const theme = React.useContext(ThemeContext);

  return (
    <View
      style={{
        ...styles.screen,
        // Configure background color with theme
        backgroundColor: theme.values.backgroundColor,
      }}>
      <View style={styles.container}>
        <Image source={{ uri: brand.logo.light }} style={styles.logo}/>
        <StyledText fontSize={40} align={'center'} bold>
          Eat Out: Your Personalized Food Finder
        </StyledText>
        <StyledText align={'center'}>
          Eat Out is a food finder app that helps users discover nearby restaurants.{'\n'}{'\n'}
          It features an AI chat (currently in development), where the AI is fully aware of restaurant options around you and helps explore personalized recommendations.{'\n'}{'\n'}

          This can be particularly useful if your in a new city or just looking to explore fresh options.
        </StyledText>

      </View>

      <Footer />
    </View>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3%',
  },
  container: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
