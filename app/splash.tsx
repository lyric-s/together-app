/**
 * @file splash.tsx
 * @description Splash screen displayed at application startup on mobile devices.
 *
 * This screen shows the application splash artwork centered on the screen
 * with a simple fade-in animation. After a short delay, the user is
 * automatically redirected to the main entry point of the application (`/`).
 *
 * On web platforms, the splash screen is skipped entirely and the user is
 * immediately redirected to the home page.
 *
 * @component Splash
 * @returns {JSX.Element} A full-screen view containing the animated splash image.
 */

import { View, Image, Animated, Platform, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

export default function Splash() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  if (Platform.OS === 'web') {
    router.replace('/');
    return;
  }

  Animated.timing(opacity, {
    toValue: 1,
    duration: 600,
    useNativeDriver: true,
  }).start();

  const timeout = setTimeout(() => {
    router.replace('/');
  }, 1200);

  return () => clearTimeout(timeout);
}, []);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Animated.Image
        source={require('@/assets/images/splash_art.png')}
        style={{ width: 180, height: 180, opacity }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 220,
    height: 220,
  },
});
