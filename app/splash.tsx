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

import { View, Animated, StyleSheet, Platform } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useAuth, UserType } from '@/context/AuthContext';

export default function Splash() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;
  const { isLoading, userType } = useAuth();
  const isMobile = Platform.OS !== 'web';

  // Function to check if the user is connected
  const checkAuthAndRedirect = async () => {
    if (isLoading) return;

    if (isMobile) {
      if (userType === 'volunteer_guest') {
        console.log('✅ Mobile → Guest');
        router.replace('/(main)/home/AccountWithoutCo');
        return;
      }
      
      if (userType === 'volunteer') {
        console.log('✅ Mobile → Volunteer');
        router.replace('/(main)/profile/ProfileVolunteer');
        return;
      }
      
      // Mobile fallback
      router.replace('/(main)/home/AccountWithoutCo');
      return;
    }

    if (userType === 'volunteer_guest') {
      console.log('✅ Splash → Guest home');
      router.replace('/(main)/home/AccountWithoutCo'); 
      return;
    }
    
    // Web Connecté → profil selon type
    if (userType) {
    const routes: Record<Exclude<UserType, 'volunteer_guest'>, string> = {
      volunteer: '/(main)/profile/ProfileVolunteer',
      association: '/(main)/profile/ProfileAsso',
      admin: '/(main)/profile/ProfileAdmin'
    };
    
      const targetRoute = routes[userType];
      console.log(`✅ Redirect to: ${targetRoute}`);
      router.replace(targetRoute as any);
      return;
    }
    router.replace('/(main)/home/AccountWithoutCo');
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

  useEffect(() => {
    if (!isLoading) {
      checkAuthAndRedirect();
    }
  }, [isLoading, userType]);

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