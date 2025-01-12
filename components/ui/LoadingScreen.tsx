import React, { useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { ThemeContext } from '../../theme/theme';

/**
 * Loading Screen component.
 * Can be displayed conditionally when a page is loading
 */

const LoadingScreen = () => {
  // Initialize theme
  const theme = useContext(ThemeContext);

  return (
    <View style={{ ...styles.screen, backgroundColor: theme.values.backgroundColor }}>
      <LottieView
        source={require('../../assets/cheers.json')}
        autoPlay
        loop
        style={styles.lottieView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: 200,
    height: 400,
  },
});

export default LoadingScreen;
