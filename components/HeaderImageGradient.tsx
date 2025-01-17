import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { StyledText } from './ui/StyledText';
import usePriceSymbol from '../hooks/usePriceSymbol';
import { breakpoints, useWindowWidth } from '../hooks/useWindowWidth';
import brand from '../brand/brandConfig';

interface HeaderImageGradientProps {
  name: string;
  imageUrl: string;
  priceLevel?: number | string;
  distance?: number;
}

export default function HeaderImageGradient({
  name,
  imageUrl,
  priceLevel,
  distance,
}: HeaderImageGradientProps) {
  const priceSymbol = usePriceSymbol(typeof priceLevel === 'number' ? priceLevel : 0);
  const windowWidth = useWindowWidth();

  // Common tag container used across web and mobile
  const renderTagContainer = () => (
    <View style={styles.tagContainer}>
      <StyledText
        color={'#ccc'}
        fontSize={windowWidth > breakpoints.small ? 'lg' : 'md'}
        align="left">
        {distance ? distance.toFixed(2) + ' Miles away |' : null}
        {priceLevel && priceLevel !== 'N/A' ? `Price Level: ${priceSymbol}` : null}
      </StyledText>
    </View>
  );

  const renderMobileLayout = () => (
    <View style={{ ...styles.container, height: 200 }}>
      <View style={styles.imageContainer}>
        {/* Background image */}
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'black']}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Title overlay */}
        <View style={styles.titleOverlay}>
          <StyledText bold fontSize={30} color="#fff" align="left">
            {name}
          </StyledText>
          {/* Tags container reused for mobile */}
          {renderTagContainer()}
        </View>
      </View>
    </View>
  );

  const renderWebLayout = () => (
    <View
      style={[
        styles.container,
        {
          height: 300,
          marginHorizontal: '3%',
          marginTop: 20,
          backgroundColor: 'red',
          borderRadius: brand.borderRadius,
        },
      ]}>
      {/* Background image with gradient overlay */}
      <ImageBackground source={{ uri: imageUrl }} style={styles.imageBackground} resizeMode="cover">
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient
              id="radialGrad"
              cx="75%" // Center more towards the right
              cy="50%" // Vertically centered
              r="60%" // Covering 60% of the width
              fx="75%" // Focus on the right side
              fy="50%"
              gradientUnits="userSpaceOnUse">
              <Stop offset="0%" stopColor="transparent" stopOpacity="0" />
              <Stop offset="100%" stopColor="black" stopOpacity="0.8" />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#radialGrad)" />
        </Svg>

        <View style={styles.textContainer}>
          {/* Title overlay */}
          <StyledText color={'#fff'} bold fontSize={50} align="left">
            {name}
          </StyledText>

          {/* Info container for tags reused for web */}
          <View style={styles.infoContainer}>{renderTagContainer()}</View>
        </View>
      </ImageBackground>
    </View>
  );

  // Conditional rendering based on platform
  return windowWidth > breakpoints.small ? renderWebLayout() : renderMobileLayout();
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0, // Full screen gradient overlay
  },
  titleOverlay: {
    gap: 10,
    position: 'absolute',
    bottom: 20,
    left: 10, // Position title at bottom left
  },
  textContainer: {
    position: 'absolute',
    textAlign: 'left',
    bottom: 40,
    gap: 10,
    paddingHorizontal: '3%',
    width: '100%',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 10, // Shared styling for tag container
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginTop: 0,
    gap: 20, // Info section for web
  },
});
