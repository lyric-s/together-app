import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import AnimatedSplashScreen from '@/components/AnimatedSplash';

SplashScreen.preventAutoHideAsync();

export default function IndexDispatcher() {
  const { userType, isLoading, user } = useAuth();
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  
  const isWeb = Platform.OS === 'web';

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
        onAnimationFinish={() => setIsAnimationFinished(true)} 
      />
    );
  }

  // --- FROM HERE ON, EVERYTHING IS LOADED AND THE ANIMATION IS FINISHED ---

  // User not logged in -> Guest Area
  if (!user) {
    return <Redirect href="/(guest)/home" />;
  }

  // Switching according to the new routes
  switch (userType) {
    
    // Volunteer (Mobile & Web)
    case 'volunteer':
      return <Redirect href="/(volunteer)/home" />;

    // Admin (Web Only)
    case 'admin':
      return <Redirect href="/(admin)/dashboard" />; 

    // Association (Web Only)
    case 'association':
      return <Redirect href="/(association)/home" />;

    case 'volunteer_guest':
    default:
      return <Redirect href="/(guest)/home" />;
  }
}