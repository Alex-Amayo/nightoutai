import React, { useContext } from 'react';
import brand from '../../../brand/brandConfig';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AppbarWeb from '../../../components/ui/Appbar/AppbarWeb';
import { Animated, Pressable, View } from 'react-native';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { ThemeContext } from '../../../theme/theme';

//Initialize Material Top Navigator
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  // Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <View style={{ flex: 1, backgroundColor: theme.values.backgroundColor }}>
      <MaterialTopTabs
        tabBar={(props) => <AppbarLayoutWeb {...props} />}
        tabBarPosition="top"
        screenOptions={{
          // Tab tint color with theme
          tabBarActiveTintColor: theme.values.highlightColor,
          swipeEnabled: false,
        }}>
        <MaterialTopTabs.Screen name="home" options={{ title: 'home' }} />
        <MaterialTopTabs.Screen name="chat" options={{ title: 'explore' }} />
        <MaterialTopTabs.Screen name="about" options={{ title: 'about' }} />
      </MaterialTopTabs>
    </View>
  );
}

// Defining the icon mapping object
const iconMapping: { [key: string]: string } = {
  home: 'restaurant-menu',
  chat: 'chat-bubble-outline',
  about: 'info',
  // Add more mappings as needed
};

type MyTabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: { [key: string]: object };
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>;
  position: Animated.AnimatedInterpolation<number> | number;
};

function AppbarLayoutWeb({ state, navigation }: MyTabBarProps) {
  // Initialize theme
  const theme = useContext(ThemeContext);
  const allowedRoutes = ['home', 'chat', 'about'];
  return (
    <AppbarWeb
      title={brand.name}
      logoUri={theme.values.isDark ? brand.logo.dark : brand.logo.light}
      tabs={
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            width: useWindowWidth() >= breakpoints.medium ? '50%' : '100%',
          }}>
          {state.routes
            .filter((route) => allowedRoutes.includes(route.name))
            .map((route, index) => {
              // Determine if the current route is focused
              const isFocused = state.index === index;
              const iconName = iconMapping[route.name] as keyof typeof MaterialIcons.glyphMap;
              return (
                <Pressable
                  key={route.key} // Ensure each button has a unique key
                  onPress={() => {
                    const event = navigation.emit({
                      type: 'tabPress',
                      target: route.key,
                      canPreventDefault: true,
                    });
                    if (!event.defaultPrevented) {
                      // Navigate to the route
                      navigation.navigate(route.name);
                    }
                  }}
                  style={{
                    flex: 1,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: theme.values.highlightColor,
                    borderBottomWidth: isFocused ? 5 : 0,
                  }}>
                  <MaterialIcons
                    size={25}
                    name={iconName}
                    color={isFocused ? theme.values.highlightColor : theme.values.inactiveIconColor}
                  />
                </Pressable>
              );
            })}
        </View>
      }
    />
  );
}
