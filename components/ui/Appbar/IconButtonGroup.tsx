import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../IconButton';
import ToggleIconButton from '../ToggleIconButton';
import { router } from 'expo-router';
import { ThemeContext } from '../../../theme/theme';
import useAuthStore from '../../../stores/authStore/authStore';

/**
 * Icons to be rendered inside appbar on both web and mobile
 * @returns Rendered IconButtonGroup
 */
const IconButtonGroup = () => {
  //Initialize theme toggle
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.appbar}>
      <View style={styles.iconContainer}>
        <ToggleIconButton iconName="sun" alternateIconName="moon" onPress={toggleTheme} />
      </View>
    </View>
  );
};
export default IconButtonGroup;

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
