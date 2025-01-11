import React, { useContext } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import brand from '../../brand/brandConfig';
import { ThemeContext } from '../../theme/theme';

type StyledTextProps = {
  children: React.ReactNode;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | number;
  align?: 'left' | 'center' | 'right';
  color?: string;
  bold?: boolean;
  uppercase?: boolean;
  numberOfLines?: number; // Prop for limiting lines
};

export const StyledText = ({
  children,
  fontSize = 'md',
  align = 'left',
  color,
  bold = false,
  numberOfLines,
  uppercase = false,
}: StyledTextProps): React.ReactNode => {
  const theme = useContext(ThemeContext);

  const textStyle: TextStyle = {
    fontSize: typeof fontSize === 'number' ? fontSize : styles[fontSize].fontSize,
    textAlign: align,
    color: color || theme.values.color,
    fontWeight: bold ? 500 : 'normal',
  };

  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {uppercase ? children?.toString().toUpperCase() : children}
    </Text>
  );
};

const styles = StyleSheet.create({
  sm: { fontSize: brand.fontSizes.small },
  md: { fontSize: brand.fontSizes.medium },
  lg: { fontSize: brand.fontSizes.large },
  xl: { fontSize: brand.fontSizes.xlarge },
});
