import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/theme';

function SkeletonHeaderImageMobile() {
  const theme = useContext(ThemeContext);

  return (
    <View style={styles.container}>
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
      </View>
    </View>
  );
}

function SkeletonHeaderImageWeb() {
  const theme = useContext(ThemeContext);

  return (
    <View style={styles.container}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  skeletonImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'column',
    gap: 5,
  },
  skeletonText: {
    height: 10,
    borderRadius: 4,
    marginTop: 5,
  },
});

export { SkeletonHeaderImageMobile, SkeletonHeaderImageWeb };
