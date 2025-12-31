/**
 * @file ActivityWithoutAccount.tsx
 * @description Mobile screen displayed when the user is not authenticated.
 * Encourages the user to log in or create an account to access their activity.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import ButtonAuth from '@/components/Button';
import { styles } from '@/styles/pages/ActivityWithoutAccountStyle';

export default function ActivityWithoutAccount() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>
        Vous n’êtes pas connectés. Pour accéder à votre activité, connectez-vous.
      </Text>

      <ButtonAuth
        text="Se connecter"
        onPress={() => router.push('/login')}
      />

      <Text style={styles.mainText}>
        Vous n’avez pas encore de compte, créez en un !
      </Text>

      <ButtonAuth
        text="S'inscrire"
        onPress={() => router.push('/register')}
      />
    </View>
  );
}
