/**
 * @file index.tsx
 * @description Root entry point for the application's home screen. 
 * This file defines the layout structure, featuring a centered navigation component.
 */

import { Redirect } from "expo-router";
import { Platform } from "react-native";


/**
 * Redirects the user to the platform-appropriate initial route.
 *
 * On native platforms (iOS/Android) this navigates to `/splash`; on web it navigates to `/(main)/home/AccountBenevole`.
 *
 * @returns A `Redirect` element that navigates to the initial route for the current platform.
*/
export default function Index() {

  if (Platform.OS !== 'web') {
    return <Redirect href="/splash" />;
  }

  // Web platform: redirect to main home page
  return <Redirect href="/(main)/library/upcoming/volunteer_upcoming_activity" />;
}