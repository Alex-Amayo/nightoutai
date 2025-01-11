import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/theme';
import brand from '../brand/brandConfig';
import { useWindowWidth, breakpoints } from '../hooks/useWindowWidth';

function SkeletonPlaceCard() {
  const theme = useContext(ThemeContext);
  const windowWidth = useWindowWidth();

  return (
    <View
      style={
        windowWidth > breakpoints.small
          ? styles.skeletonContainerWeb
          : styles.skeletonContainerMobile
      }
    >
      <View
        style={[
          styles.skeletonImage,
          { backgroundColor: theme.values.isDark ? '#333333' : '#e0e0e0' },
        ]}
      />
      <View style={styles.infoContainer}>
        <View
          style={[
            styles.skeletonText,
            {
              width: '70%',
              backgroundColor: theme.values.isDark ? '#333333' : '#e0e0e0',
            },
          ]}
        />
        <View
          style={[
            styles.skeletonText,
            {
              width: '40%',
              backgroundColor: theme.values.isDark ? '#333333' : '#e0e0e0',
            },
          ]}
        />
        <View
          style={[
            styles.skeletonText,
            {
              width: '30%',
              backgroundColor: theme.values.isDark ? '#333333' : '#e0e0e0',
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonContainerWeb: {
    width: 300,
    marginRight: 20,
  },
  skeletonContainerMobile: {
    width: 200,
    marginRight: 20,
  },
  skeletonImage: {
    width: '100%',
    height: 150, // matches the smaller height from PlaceCard for mobile
    borderRadius: brand.borderRadius,
  },
  infoContainer: {
    marginTop: 10,
    gap: 5,
  },
  skeletonText: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 5,
  },
});

export default SkeletonPlaceCard;
