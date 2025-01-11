import React, { useContext } from 'react';
import { StyleSheet, View, TextInput as RNTextInput, TextInputProps, Platform } from 'react-native';
import brand from '../../brand/brandConfig';
import { ThemeContext } from '../../theme/theme';
import IconButton from './IconButton';

// Define props for the StyledTextInput component
interface CustomTextInputProps extends TextInputProps {
  onPressSend: () => void; // Add an optional prop for the send button's onPress
}

const StyledTextInput = (props: CustomTextInputProps): React.JSX.Element => {
  const { onPressSend, ...textInputProps } = props;
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.container, { borderColor: theme.values.borderColor }]}>
      <RNTextInput
        {...textInputProps}
        style={[
          styles.textInput,
          { color: theme.values.color },
          Platform.OS === 'web' && styles.webInput, // Apply web-specific styles
        ]}
        placeholderTextColor={theme.values.color}
      />
      <View style={styles.iconButtonContainer}>
        <IconButton onPress={onPressSend} iconName={'arrow-up'} />
      </View>
    </View>
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderRadius: 100,
  },
  textInput: {
    flex: 1,
    fontSize: brand.fontSizes.medium,
    borderWidth: 0, // Remove any internal border from the StyledTextInput
    paddingHorizontal: 25,
  },
  webInput: {
    // @ts-expect-error TS doesn't detect the web styles below but are necessary to get rid of unwanted errors.
    outlineStyle: 'none', // Remove default focus outline on web
    boxShadow: 'none', // Remove any box shadow (focus border)
  },
  iconButtonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
