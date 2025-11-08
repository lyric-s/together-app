/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

/**
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
*/
/**
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👋 Hello, Together Web + Mobile !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
*/

/**
import React from 'react';
import { View } from 'react-native';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageA from './pages/PageA';
import PageB from './pages/PageB';
import PageC from './pages/PageC';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageA />} />
        <Route path="/pageb" element={<PageB />} />
        <Route path="/pagec" element={<PageC />} />
      </Routes>
    </Router>
  );
}
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import ModificationMission from './pages/assos/ModificationMission';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ModificationMission />
    </SafeAreaView>
  );
}
