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

import { View, Animated, Platform, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter, Redirect } from 'expo-router';

export default function Splash() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  // Function to check if the user is connected
  const checkAuthAndRedirect = async () => {
    // Here, we will replace with our actual logic (e.g. Firebase, Supabase, or AsyncStorage)
    const userIsLoggedIn = true; // Change true to test redirection to home

    if (userIsLoggedIn) {
      router.replace('/(main)/home/AccountBenevole');
    } else {
      router.replace('/register');
    }
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Call to logical redirection after animation
      checkAuthAndRedirect();
    });
  }, [opacity]);


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