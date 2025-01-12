import React, { useContext } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { StyledText } from './ui/StyledText';
import { breakpoints, useWindowWidth } from '../hooks/useWindowWidth';
import Button from './ui/Button';
import { ThemeContext } from '../theme/theme';
import { Place } from '../types/PlacesTypes';
import { router } from 'expo-router';
import brand from '../brand/brandConfig';

const Hero = () => {
  const windowWidth = useWindowWidth();
  const theme = useContext(ThemeContext);
  const goToChat = (place: Place) => {
    // Navigate to home/places/[place] with id and place.id
    router.push('/tabs/chat');
  };
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: windowWidth > breakpoints.small ? 500 : 300,
        backgroundColor: 'black',
        marginHorizontal: windowWidth > breakpoints.small ? '3%' : 0,
        marginTop: windowWidth > breakpoints.small ? 20 : 0,
        borderRadius: windowWidth > breakpoints.small ? brand.borderRadius : 0,
      }}>
      {/* Image Background */}
      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          opacity: 0.3,
        }}
        resizeMode="stretch"
        blurRadius={2}
      />
      {/* Promoter Image and Text Row */}
      <View
        style={{
          flexDirection: windowWidth > breakpoints.small ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: windowWidth > breakpoints.small ? 40 : 10,
          gap: windowWidth > breakpoints.small ? 40 : 10,
          marginHorizontal: 20,
        }}>
        <Image
          source={require('../assets/Jeff.webp')}
          style={{
            width: windowWidth > breakpoints.small ? 250 : 100,
            height: windowWidth > breakpoints.small ? 250 : 100,
            borderRadius: 125, // 100% borderRadius is not supported in React Native
            marginVertical: 10,
          }}
        />
        <View
          style={{
            flex: 1,
            maxWidth: 500,
            gap: 10,
          }}>
          <StyledText
            fontSize={windowWidth > breakpoints.small ? 20 : 15}
            bold
            color="white"
            align={windowWidth > breakpoints.small ? 'left' : 'center'}>
            Whether you're looking for the best deals, exclusive events, or insider tips in Las
            Vegas, Jeff has you covered.
          </StyledText>
          <Button title="Chat with Jeff – Your AI Nightlife Guide" onPress={goToChat} />
        </View>
      </View>
    </View>
  );
};

export default Hero;
