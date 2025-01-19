import React, { useContext } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { breakpoints, useWindowWidth } from '../hooks/useWindowWidth';
import { ThemeContext } from '../theme/theme';
import Button from '../components/ui/Button';
import { StyledText } from './ui/StyledText';
import { MaterialIcons } from '@expo/vector-icons';

interface PlaceActionButtonsProps {
  formattedAddress: string;
  website?: string;
  url?: string;
}

const PlaceActionButtons: React.FC<PlaceActionButtonsProps> = ({
  formattedAddress,
  website,
  url,
}) => {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const theme = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.actionButtonsContainer,
        {
          flexDirection: windowWidth < breakpoints.large ? 'column-reverse' : 'row',
          backgroundColor: theme.values.backgroundColor,
        },
      ]}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {/** Back Button and Text as a Pressable **/}
        <Pressable onPress={() => router.push('/tabs/home')} style={styles.pressableContainer}>
          <MaterialIcons
            name="arrow-back"
            size={20}
            color={theme.values.color}
            style={{
              borderRadius: 100,
              backgroundColor: theme.values.iconButtonBackgroundColor,
              padding: 10,
            }}
          />
          <View style={styles.actionButtonTextContainer}>
            <StyledText bold numberOfLines={1}>
              See other places
            </StyledText>
          </View>
        </Pressable>
      </View>

      {/** Buttons **/}
      <View
        style={[
          styles.buttonsContainer,
          {
            flexDirection: windowWidth < breakpoints.large ? 'column' : 'row',
            justifyContent: windowWidth >= breakpoints.large ? 'flex-end' : 'flex-start',
            width: '100%',
          },
        ]}>
        <View
          style={[
            styles.buttonWrapper,
            { width: windowWidth < breakpoints.large ? '100%' : 'auto' },
          ]}>
          <Button
            title={'Website'}
            icon="web"
            onPress={() => website && Linking.openURL(website)}
          />
        </View>

        {/** Directions Button **/}
        <View
          style={[
            styles.buttonWrapper,
            { width: windowWidth < breakpoints.large ? '100%' : 'auto' },
          ]}>
          <Button
            title={'Directions'}
            icon="directions"
            onPress={() => url && Linking.openURL(url)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    marginHorizontal: '5%',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 10,
  },
  actionButtonTextContainer: {
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flex: 1,
    gap: 10,
  },
  buttonWrapper: {
    marginVertical: 5,
  },
  pressableContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
});

export default PlaceActionButtons;
