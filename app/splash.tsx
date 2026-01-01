/**
 * @file splash.tsx
 * @description Mobile splash screen displayed on app launch.
 * Shows the splash artwork with a simple fade-in animation,
 * then automatically redirects to the main app.
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Splash() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Redirect to home
    const timeout = setTimeout(() => {
      router.replace('/');
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('@/assets/images/splash_art.png')}
        style={[styles.image, { opacity }]}
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
