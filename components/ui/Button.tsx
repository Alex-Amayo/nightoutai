import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import brand from '../../brand/brandConfig';
import { StyledText } from './StyledText';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  secondary?: boolean;
  loading?: boolean;
  icon?: string; // Optional icon prop to specify the icon name from MaterialCommunityIcons
};

/**
 * A reusable button component that can be customized with different styles,
 * loading states, and behavior based on props. It can also display an optional icon.
 */

const Button = ({ title, secondary, loading, icon, onPress }: ButtonProps) => {
  return loading ? (
    <View>
      <ActivityIndicator
        size="small"
        color={secondary ? brand.colors.secondary : brand.colors.primary}
      />
    </View>
  ) : (
    <Pressable onPress={onPress} style={secondary ? styles.secondary : styles.primary}>
      <View style={styles.contentContainer}>
        <StyledText fontSize={'md'} color="white">
          {title}
        </StyledText>
        {/* Conditionally render the icon if provided */}
        {icon && (
          <MaterialCommunityIcons
            //@ts-expect-error - not specifying icon types
            name={icon}
            size={24}
            color="#FFFFFF"
            style={styles.icon}
          />
        )}
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  primary: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: brand.borderRadius,
    backgroundColor: brand.colors.primary,
    flex: 1,
    maxHeight: 50,
  },
  secondary: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: brand.borderRadius,
    backgroundColor: brand.colors.secondary,
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row', // Ensures icon and text are in a row
    alignItems: 'center', // Vertically centers icon and text
  },
  icon: {
    marginLeft: 8, // Adds spacing between icon and text
  },
});
