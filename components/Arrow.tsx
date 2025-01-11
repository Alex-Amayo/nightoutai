import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from '../theme/theme';
import brand from '../brand/brandConfig';

interface ArrowProps {
  direction: 'left' | 'right';
  onPress: () => void;
  hidden: boolean;
}

const Arrow = ({ direction, onPress, hidden = false }: ArrowProps) => {
  const theme = React.useContext(ThemeContext);
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { alignItems: direction === 'left' ? 'flex-end' : 'flex-start' }]}>
      {hidden ? null : (
        <FontAwesome5
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          size={25}
          color={brand.colors.primary}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '3%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default Arrow;
