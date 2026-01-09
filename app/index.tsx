import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import AnimatedSplashScreen from '@/components/AnimatedSplash';

SplashScreen.preventAutoHideAsync();

/**
 * Selects and renders the initial app view: shows an animated splash on native platforms while authentication is loading, then redirects to the appropriate route based on the signed-in user and their `userType`.
 *
 * @returns The root React element for the index route — either the splash animation or a `Redirect` to the resolved home/dashboard route.
 */
export default function IndexDispatcher() {
  const { userType, isLoading, user } = useAuth();
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  
  const isWeb = Platform.OS === 'web';

   const handleAnimationFinish = useCallback(() => {
    setIsAnimationFinished(true);
  }, []);

  // On the web, you don't have to wait for the animation
  useEffect(() => {
    if (isWeb) {
      setIsAnimationFinished(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // As soon as Auth is loaded, we hide the native splash screen (the static image)
      // to make room for our AnimatedSplashScreen component (the animated image).
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading]);

  // UNTIL IT'S READY: Display the splash animation.
  // Condition: If it's still loading OR (if you're on a mobile device and the animation isn't finished).
  if (isLoading || (!isAnimationFinished && !isWeb)) {
    return (
      <AnimatedSplashScreen 
        onAnimationFinish={handleAnimationFinish} 
      />
    );
  }

  // Web platform: redirect to main home page
  return <Redirect href="/(main)/library/history/assos_history" />;
}