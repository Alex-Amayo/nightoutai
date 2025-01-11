import React, { useContext } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../../../theme/theme';
import { StyledText } from '../StyledText';

type ListButtonProps = {
  text: string;
  icon?: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  uppercase?: boolean;
};

/**
 * List Button component that displays a list button with an icon and text
 */

const ListButton = ({ onPress, text, icon, uppercase }: ListButtonProps) => {
  // Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <Pressable style={styles.listButton} onPress={onPress}>
      <StyledText bold uppercase={uppercase}>
        {text}
      </StyledText>
      <Feather name={icon} size={25} color={theme.values.color} />
    </Pressable>
  );
};

export default ListButton;

const styles = StyleSheet.create({
  listButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
});
