import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../IconButton';
import ToggleIconButton from '../ToggleIconButton';
import { router } from 'expo-router';
import { ThemeContext } from '../../../theme/theme';
import useAuthStore from '../../../stores/authStore/authStore';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';

/**
 * Icons to be rendered inside appbar on both web and mobile
 * @returns Rendered IconButtonGroup
 */
const IconButtonGroup = () => {
  //Initialize theme toggle
  const { toggleTheme } = useContext(ThemeContext);
  const windowWidth = useWindowWidth();
  return (
    <View
      style={{
        ...styles.buttonGroup,
        width: windowWidth > breakpoints.small ? 150 : 'auto',
        justifyContent: 'flex-end',
      }}>
      <View style={styles.iconContainer}>
        <ToggleIconButton iconName="sun" alternateIconName="moon" onPress={toggleTheme} />
      </View>
    </View>
  );
};
export default IconButtonGroup;

const styles = StyleSheet.create({
  buttonGroup: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
