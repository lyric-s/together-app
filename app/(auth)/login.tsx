// app/(auth)/login.tsx
import React from 'react';
//import LoginMobile from '@/pages/LoginMobile';
//import LoginWeb from '@/pages/LoginWeb';
import { Platform } from 'react-native';

/**
 * Render the platform-appropriate login component.
 *
 * Renders <LoginWeb /> when running on web and <LoginMobile /> on other platforms. Currently the implementation is commented out and the component returns no UI.
 *
 * @returns A JSX element containing the platform-specific login UI
 */
export default function LoginPage() {
//    return Platform.OS === 'web' ? <LoginWeb /> : <LoginMobile />;
}