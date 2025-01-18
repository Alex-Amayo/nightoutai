import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import TextLink from './TextLink';
import { ThemeContext } from '../../theme/theme';
import { useRouter } from 'expo-router';
import brand from '../../brand/brandConfig';

const Footer = () => {
  const theme = useContext(ThemeContext); // Access theme context
  const router = useRouter();
  return (
    <View
      style={[
        styles.footerContainer,
        {
          backgroundColor: theme.values.appbarColor,
          borderColor: theme.values.borderColor,
          borderTopWidth: 1,
        },
      ]}>
      <View style={styles.linkContainer}>
        <TextLink
          onPress={() => router.push('/tabs/home')}
          text="Home"
          color={theme.values.isDark ? '#fff' : '#000000'}
          align={'left'}
        />
        <TextLink
          onPress={() => router.push('/tabs/chat')}
          text="AI Chat"
          color={theme.values.isDark ? '#fff' : '#000000'}
          align={'left'}
        />
        <TextLink
          onPress={() => router.push('/tabs/about')}
          text={'About ' + brand.name}
          color={theme.values.isDark ? '#fff' : '#000000'}
          align={'left'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    
    paddingHorizontal: '3%',
    alignItems: 'flex-start',
    gap: 10,
    width: '100%',
  },
  // Flex direction is column for mobile, row for larger screens
  linkContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    gap: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  link: {
    fontSize: 14,
    marginVertical: 5, // Space between links for mobile
  },
});

export default Footer;
