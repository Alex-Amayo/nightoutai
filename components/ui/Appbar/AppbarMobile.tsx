import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import brand from '../../../brand/brandConfig';
import { ThemeContext } from '../../../theme/theme';
import IconButtonGroup from './IconButtonGroup';
import AppbarBranding from './AppbarBranding';

type AppbarProps = {
  title: string;
  logoUri: string;
  tabs?: JSX.Element | JSX.Element[];
};

/**
 * Non-responsive appbar  that displays at the top  of the screen for mobile devices.
 */
const Appbar = ({ title, logoUri, tabs }: AppbarProps) => {
  // Initialize the theme
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        ...styles.appbar,
        backgroundColor: theme.values.appbarColor,
        borderBottomWidth: 1,
        borderColor: theme.values.borderColor,
      }}>
      <AppbarBranding title={title} logoUri={logoUri} />
      {tabs ? tabs : null}
      <IconButtonGroup />
    </View>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingHorizontal: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: brand.fontSizes.large,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
