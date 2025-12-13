import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter(); // hook pour la navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue !</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/assos_home_page')} // chemin relatif à app/
      >
        <Text style={styles.buttonText}>Créer une mission</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  button: {
    backgroundColor: '#FF8A3D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
