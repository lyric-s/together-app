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

import { View, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { storageService } from '@/services/storageService';
import { userService } from '@/services/userService'

/**
 * Displays a startup splash screen with a short fade animation, then checks authentication and navigates to the appropriate route.
 *
 * After the animation completes, the component reads the stored access token and attempts to validate or refresh the session; it navigates to the login route if no valid session is available, or to the main account screen if the session is valid.
 *
 * @returns The React element for the splash screen UI.
 */
export default function Splash() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  // Function to check if the user is connected
  const checkAuthAndRedirect = async () => {
    try {
      const token = await storageService.getAccessToken();
      
      if (!token) {
        return router.replace('/login');
      }

      // VALIDITY CHECK:
      // Attempt to retrieve the logged-in user's information.
      // If the token has expired, the interceptor in api.ts will attempt an automatic refresh.
      // If all else fails, an error will be thrown and we will go to the catch.
      await userService.getMe(); 
      
      // If we arrive here, it means that the token is valid (or has been refreshed).
      router.replace('/(main)/home/AccountBenevole');

    } catch (error) {
      // If the token is invalid, expired, or the server is unreachable
      console.log("Session invalide ou expirée");
      router.replace('/login');
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