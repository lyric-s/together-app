// app/(auth)/login.tsx
import React from 'react';
import LoginMobile from '@/pages/LoginMobile';
import LoginWeb from '@/pages/LoginWeb';
import { Platform } from 'react-native';

export default function LoginPage() {
    const isWeb = Platform.OS === 'web';
    if (isWeb) {
        return <LoginWeb />;
    }
    else {
        return <LoginMobile />
    }
}