import React, { useEffect } from 'react';
import { router } from 'expo-router';
import LoadingScreen from '../components/ui/LoadingScreen';

export default function HomePage() {
  //Plays animation for 3 sec then pushes '/login' route
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/tabs');
    }, 1000); // 1 seconds
    // Clear timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return <LoadingScreen />;
}
