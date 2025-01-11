import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

export default function FeaturedItemMobile({
                                             title,
                                             imageUrl,
                                             subtitle,
                                             description,
                                             tags,
                                             priceLevel
                                           }: FeaturedItemProps) {
  const priceSymbol = usePriceSymbol(priceLevel);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'black']}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Title Overlay */}
        <View style={styles.titleOverlay}>
          <StyledText bold fontSize={30} color="#fff">
            {title}
          </StyledText>
        </View>
      </View>

      <View style={styles.textContainer}>
        {/** Subtitle **/}
        <StyledText bold fontSize={20}>
          {subtitle}
        </StyledText>
        {/** Description **/}
        <StyledText fontSize={16}>{description}</StyledText>
        {/** Tags **/}
        <View style={styles.tagContainer}>
          <StyledText>
            {priceLevel ? 'Price Level: ' + priceSymbol : null} | distance
          </StyledText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200
  },
  image: {
    width: '100%',
    height: '100%'
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 10
  },
  textContainer: {
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: '3%',
    gap: 20
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  }
});
