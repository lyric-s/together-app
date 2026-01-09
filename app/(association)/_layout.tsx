/**
 * @file _layout.tsx (ASSOCIATION)
 * @description Specific layout for the Association area (Web Only).
 */

import { Redirect, Stack, router } from 'expo-router';
import { Platform, View, Text, ActivityIndicator } from 'react-native';
import Sidebar from '@/components/SideBar';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/colors';

export default function AssociationLayout() {
  const { user, isLoading, userType } = useAuth();
  const isWeb = Platform.OS === 'web';

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.orange} />
      </View>
    );
  }

  if (!isWeb) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          L'espace associatif n'est pas disponible sur mobile.
          Veuillez utiliser un ordinateur.
        </Text>
      </View>
    );
  }

  if (userType !== 'association') {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row', height: '100%' }}>
        <Sidebar 
            userType="association" 
            userName={user?.company_name || 'Association'} 
            onNavigate={(route: string) => {
                router.push(route as any);
            }} 
        />

      <View style={{ flex: 1, overflow: 'hidden' }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}