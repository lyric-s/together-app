// app/(auth)/login.tsx
import React from 'react';
import LoginMobile from '@/screens/LoginMobileScreen';
import LoginWeb from '@/screens/LoginWebScreen';
import { Platform } from 'react-native';

export default function LoginScreen() {
    const isWeb = Platform.OS === 'web';
    if (isWeb) {
        return <LoginWeb />;
    }
    else {
        return <LoginMobile />
    }
}