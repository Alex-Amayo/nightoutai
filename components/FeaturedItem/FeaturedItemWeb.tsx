import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { StyledText } from '../ui/StyledText';
import usePriceSymbol from '../../hooks/usePriceSymbol';

interface FeaturedItemProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  imageUrl: string;
  priceLevel: number;
}

export default function FeaturedItemWeb({
  title,
  imageUrl,
  subtitle,
  description,
  tags,
  priceLevel,
}: FeaturedItemProps) {
  const priceSymbol = usePriceSymbol(priceLevel);
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.imageBackground} resizeMode="cover">
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient
              id="radialGrad"
              cx="75%" // Centered more towards the right side
              cy="50%" // Vertically centered
              r="60%" // The radius, covering 60% of the width
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
          {/** Title **/}
          <StyledText color={'#fff'} bold fontSize={60}>
            {title}
          </StyledText>

          {/** Info section separated by top margin **/}
          <View style={styles.infoContainer}>

            <View style={styles.tagContainer}>
              <StyledText color={'#ccc'} fontSize={'md'}>
                {priceLevel ? priceSymbol : null} | Open Now - till |
              </StyledText>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: 400,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    left: '3%',
    justifyContent: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoContainer: {
    marginTop: 20,
    gap: 20,
  },
});
