/**
 * @file ActivityGuest.tsx
 * @description Mobile screen displayed when the user is not authenticated.
 * Encourages the user to log in or create an account to access their activity.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import ButtonAuth from '@/components/Button';
import { styles } from '@/styles/pages/ActivityGuestStyles';

/**
 *
 * Screen displayed when the user is not authenticated.
 * It informs the user that they must be logged in to access their activity
 * and provides navigation buttons to:
 * - Log in
 * - Create a new account (sign up)
 *
 * Uses the router to redirect the user to the appropriate authentication screens.
 */
export default function ActivityGuest() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>
        Vous n’êtes pas connectés. Pour accéder à votre activité, connectez-vous.
      </Text>

      <ButtonAuth
        text="Se connecter"
        onPress={() => router.push('/(auth)/login')}
      />

      <Text style={styles.mainText}>
        Vous n’avez pas encore de compte, créez-en un !
      </Text>

      <ButtonAuth
        text="S'inscrire"
        onPress={() => router.push('/(auth)/register')}
      />
    </View>
  );
}