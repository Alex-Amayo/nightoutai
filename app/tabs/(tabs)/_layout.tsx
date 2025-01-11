import React, { useContext } from 'react';
import { Tabs } from 'expo-router';
import brand from '../../../brand/brandConfig';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AppbarMobile from '../../../components/ui/Appbar/AppbarMobile';
import { ThemeContext } from '../../../theme/theme';

export default function TabLayout() {
  // Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: brand.colors.primary,
        tabBarStyle: { backgroundColor: theme.values.appbarColor, borderTopWidth: 1, borderColor: theme.values.borderColor },
        tabBarShowLabel: false,
        header: () => (
          <AppbarMobile
            title={brand.name}
            logoUri={theme.values.isDark ? brand.logo.dark : brand.logo.light}
          />
        ),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              size={20}
              name="restaurant-menu"
              color={focused ? theme.values.highlightColor : '#656469'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'chat-bubble-outline',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              size={20}
              name="chat-bubble-outline"
              color={focused ? theme.values.highlightColor : '#656469'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'about',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              size={20}
              name="info"
              color={focused ? theme.values.highlightColor : '#656469'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="[place]"
        options={{
          href: null,
          title: 'place',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              size={20}
              name="info"
              color={focused ? theme.values.highlightColor : '#656469'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
