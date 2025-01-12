import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import brand from '../../../brand/brandConfig';
import { StyledText } from '../StyledText';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';

type AppBarBrandingProps = {
  title: string;
  logoUri?: string; // Optional logo image URL
};

/**
 * Appbar business Name and optional Logo for the business
 */

const AppBarBranding = ({ title, logoUri }: AppBarBrandingProps) => {
  const windowWidth = useWindowWidth();
  return (
    <Link href="/">
      <View
        style={{
          ...styles.container,
          width: windowWidth > breakpoints.small ? 150 : 'auto',
        }}>
        {logoUri && <Image source={{ uri: logoUri }} style={styles.logo} />}
        <StyledText fontSize={18} bold>
          {title}
        </StyledText>
      </View>
    </Link>
  );
};

export default AppBarBranding;

const styles = StyleSheet.create({
  container: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
