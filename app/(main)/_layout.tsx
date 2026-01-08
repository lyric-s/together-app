/**
 * @file _layout.tsx
 * @description Root layout component that wraps the entire application.
 *
 * This file defines the root navigation structure using Expo Router's Stack navigator.
 * It applies the appropriate theme (dark or light) based on the device's color scheme,
 * configures a modal screen, and conditionally renders a bottom navigation bar on mobile platforms.
 * 
 * All screens are configured without headers by default.
 */

import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { Platform, View } from 'react-native';
import BottomNavBar from '@/components/MobileNavigationBar';
import Sidebar from '@/components/SideBar';
import { useAuth } from '@/context';
import {UserType} from '@/context/AuthContext'
/**
 * RootLayout component that serves as the top-level layout wrapper.
 *
 * Provides theme context to all child components and configures the navigation stack
 * with the application's main screens. The theme automatically switches between
 * dark and light modes based on the device's color scheme preference.
 *
 * @returns {JSX.Element} The themed navigation stack with status bar configuration.
 */
export default function RootLayout() {
  const { user, isLoading, userType } = useAuth();
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  const safeUserType: UserType = userType || 'volunteer_guest';
  const safeUserName = user?.username || 'Invité';

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>

      {!isMobile && (
        <Sidebar userType={safeUserType} userName={safeUserName} onNavigate={(route: string) => {router.push(route as any)}} />
      )}

      <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>

      {isMobile && (
        <BottomNavBar />
      )}
      </View>
    </View>
  );
}