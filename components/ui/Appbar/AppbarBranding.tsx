import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import brand from '../../../brand/brandConfig';
import { StyledText } from '../StyledText';

type AppBarBrandingProps = {
  title: string;
  logoUri?: string; // Optional logo image URL
};

/**
 * Appbar business Name and optional Logo for the business
 */

const AppBarBranding = ({ title, logoUri }: AppBarBrandingProps) => {
  return (
    <Link href="/">
      <View style={styles.container}>
        {logoUri && <Image source={{ uri: logoUri }} style={styles.logo} />}
        <StyledText fontSize={'lg'} bold>
          {title}
        </StyledText>
      </View>
    </Link>
  );
};

export default AppBarBranding;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: brand.fontSizes.large,
    fontWeight: 'bold',
  },
});
