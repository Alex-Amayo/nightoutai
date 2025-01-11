import React, { useContext, useState } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  FlatList,
  ListRenderItem,
  LayoutRectangle,
  ListRenderItemInfo,
} from 'react-native';
import { StyledText } from './StyledText';
import brand from '../../brand/brandConfig';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../theme/theme';
import Card from './Card';
import List from './List/List';
import ListButton from './List/ListButton';
import ListDivider from './List/ListDivider';
import { FlashList } from '@shopify/flash-list';

interface Option {
  label: string;
  value: string;
}

interface DropdownSelectProps {
  options: Option[]; // Options passed as prop
  initialValue: string;
  onSelect: (value: string) => void; // Callback to notify parent of the selected value
}

const DropdownSelect = ({ options, onSelect, initialValue }: DropdownSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(initialValue);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [buttonLayout, setButtonLayout] = useState<LayoutRectangle | null>(null);

  const handleOptionSelect = (option: Option) => {
    setSelectedValue(option.label); // Update local state with selected option
    setDropdownVisible(false); // Close the dropdown
    onSelect(option.value); // Notify parent component about the selected value
  };

  // Initialize theme
  const theme = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      {/* Dropdown Button */}
      <Pressable
        style={[
          styles.dropdownButton,
          {
            borderRadius: brand.borderRadius,
          },
        ]}
        onPress={() => setDropdownVisible(!isDropdownVisible)}
        onLayout={(event) => setButtonLayout(event.nativeEvent.layout)} // Capture button layout
      >
        <StyledText fontSize={'sm'} uppercase bold>
          {isDropdownVisible ? '\n' : selectedValue}
        </StyledText>
        <MaterialCommunityIcons name={'chevron-down'} size={20} color={theme.values.color} />
      </Pressable>

      {/* Dropdown List */}
      {isDropdownVisible && buttonLayout && (
        <View
          style={[
            styles.dropdownList,
            {
              marginTop: 10,
              top: buttonLayout.y + buttonLayout.height, // Position right below the button
              left: buttonLayout.x, // Align with button's left
              width: buttonLayout.width, // Match the button's width
            },
          ]}>
          <Card>
            <FlashList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <>
                  <ListButton
                    text={item.label}
                    onPress={() => handleOptionSelect(item)}
                    uppercase
                  />
                  <ListDivider />
                </>
              )}
              estimatedItemSize={50}
            />
          </Card>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: brand.borderRadius,
  },
  dropdownList: {
    position: 'absolute',
    zIndex: 999, // Ensure dropdown appears above other content
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DropdownSelect;
