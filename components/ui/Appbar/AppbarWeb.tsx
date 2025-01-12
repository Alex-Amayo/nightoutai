import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';
import brand from '../../../brand/brandConfig';
import { ThemeContext } from '../../../theme/theme';
import IconButtonGroup from './IconButtonGroup';
import AppbarBranding from './AppbarBranding';

type AppbarProps = {
  title: string;
  logoUri?: string;
  tabs?: JSX.Element | JSX.Element[];
};

/**
 * A responsive appbar that displays at the top of the page.
 * Dynamically adapts its styling when the viewport is less than medium
 */

const AppbarWeb = ({ title, logoUri, tabs }: AppbarProps) => {
  //Initialize theme
  const theme = useContext(ThemeContext);

  //Initialize window width
  const windowWidth = useWindowWidth();

  //If window width is greater than medium breakpoint, apply card styles to appbar
  if (windowWidth >= breakpoints.medium) {
    styles.webContainer = {
      ...{
        //Appbar card styling
        //Shadow color from theme
        shadowColor: brand.shadows ? theme.values.shadowColor : undefined,
        //Vertical shadow offset for Appbar
        shadowOffset: brand.shadows ? { width: -2, height: 2 } : undefined,
        shadowOpacity: brand.shadows ? 0.4 : undefined,
        shadowRadius: brand.shadows ? 3 : undefined,
        elevation: brand.shadows ? 20 : undefined,
      },
    };
  }
  return (
    <View
      style={{
        //Configure background with theme background (**Different from appbar background, color of the space for shadows)
        backgroundColor: theme.values.backgroundColor,
        borderBottomWidth: 1,
        borderColor: theme.values.borderColor,
      }}>
      <View
        style={{
          ...styles.webContainer,
          //Configure appbar with theme appbar color
          backgroundColor: theme.values.appbarColor,
        }}>
        <View
          style={{
            ...styles.appbar,
          }}>
          <AppbarBranding title={title} logoUri={logoUri} />
          {windowWidth >= breakpoints.medium ? tabs : null}
          <IconButtonGroup />
        </View>
        {windowWidth < breakpoints.medium ? (
          <View
            style={{
              ...styles.appbarWebSmall,
            }}>
            {tabs}
          </View>
        ) : null}
      </View>
    </View>
  );
};
export default AppbarWeb;

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingHorizontal: 20,
  },
  appbarWebSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    width: '100%',
    paddingHorizontal: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: brand.fontSizes.large,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  webContainer: {}, // WebContainer property to inject shadow styles for web
});
