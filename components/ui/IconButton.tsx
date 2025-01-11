import React, { useContext } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { ThemeContext } from '../../theme/theme';
import brand from '../../brand/brandConfig';

type IconButtonProps = {
  iconName: keyof typeof Feather.glyphMap;
  onPress: () => void;
  raised?: boolean;
};

/**
 * Renders rounded icon button with icon from expo-vector icons.
 */

const IconButton = ({ iconName, onPress, raised }: IconButtonProps) => {
  //Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: theme.values.iconButtonBackgroundColor,
        shadowOpacity: raised && brand.shadows ? 0.4 : undefined,
        shadowRadius: raised && brand.shadows ? 5 : undefined,
        elevation: raised && brand.shadows ? 20 : undefined,
      }}>
      <Feather name={iconName} size={20} color={theme.values.iconButtonIconColor} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
