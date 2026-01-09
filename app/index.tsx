/**
 * @file index.tsx
 * @description Root entry point for the application's home screen. 
 * This file defines the layout structure, featuring a centered navigation component.
 */

import { Redirect } from "expo-router";
import { Platform } from "react-native";


/**
 * Redirects the user to the application's splash route.
 *
 * The splash screen will perform any further routing decisions (for example based on authentication).
 *
 * @returns A `Redirect` element that navigates to `/splash`.
 */
export default function Index() {
  // We let the Splash Screen decide where to send us based on the AuthContext
  return <Redirect href="/splash" />;
}