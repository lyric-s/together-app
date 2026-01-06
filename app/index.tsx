/**
 * @file index.tsx
 * @description Root entry point for the application's home screen. 
 * This file defines the layout structure, featuring a centered navigation component.
 */

/**
 * Renders the home screen layout that vertically centers the bottom navigation bar between two flexible spacer sections.
 *
 * The layout is wrapped in a SafeAreaView so content respects device safe areas.
 *
 * @returns The JSX element for the home screen layout.
 */

import { Redirect } from "expo-router";
import { Platform } from "react-native";

export default function Index() {

  if (Platform.OS !== 'web') {
    return <Redirect href="/splash" />;
  }

  // Web platform: redirect to main home page
  return <Redirect href="/(main)/home/AccountBenevole" />;}