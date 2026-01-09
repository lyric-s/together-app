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
 * Top-level layout for the app that composes navigation and platform-specific chrome.
 *
 * Uses authentication context to derive the current user's type and display name (defaults: `userType` -> `'volunteer_guest'`, `userName` -> `'Invité'`), renders a sidebar on non-mobile platforms and a bottom navigation bar on mobile, and provides the main navigation Stack for app screens.
 *
 * @returns The root JSX element containing the app's navigation layout and platform-specific navigation UI.
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