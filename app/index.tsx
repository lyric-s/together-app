/**
 * @file index.tsx
 * @description Main entry point acting as a "Playground" or "Test Zone" for UI components.
 * It demonstrates different variations of the SwitchButton and the MobileSearchBar.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MobileSearchBar from '@/components/MobileSearchBar';
// Ensure the import path matches your project structure
import SwitchButton from '@/components/SwitchButton'; 

export default function Index() {
  // State for search results (currently unused in this display example)
  const [results, setResults] = useState([]);
  
  // Mock data for the search bar
  const categoryList = [
    "Environnement", "Social", "Éducation", "Culture", "Animaux",
  ];
  const defaultCity = "Paris";

  /**
   * Handles the search action triggered by the SearchBar.
   * @param searchText - The string entered by the user.
   * @param filters - The active filters associated with the search.
   */
  const handleSearch = (searchText: string, filters: any) => {
    console.log("Recherche :", searchText, filters);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      
      <Text style={styles.headerTitle}>Zone de Test Composants</Text>

      {/* TEST 1: Mission Variant (Default) */}
      <View style={styles.testSection}>
        <Text style={styles.label}>Variante 1 : Mission (Default)</Text>
        <SwitchButton 
            variant="mission" 
            onChange={(tab) => console.log("Switch Mission ->", tab)}
        />
      </View>

      {/* TEST 2: Auth Variant (New) */}
      <View style={styles.testSection}>
        <Text style={styles.label}>Variante 2 : Auth (Inscription/Connexion)</Text>
        <SwitchButton 
            variant="auth" 
            onChange={(tab) => console.log("Switch Auth ->", tab)}
        />
      </View>

      {/* Existing SearchBar Component */}
      <View style={styles.testSection}>
        <Text style={styles.label}>Composant SearchBar</Text>
        <MobileSearchBar
            category_list={categoryList}
            default_city={defaultCity}
            onSearch={handleSearch}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        paddingTop: 60, // Top padding to avoid status bar overlap
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    testSection: {
        marginBottom: 40,
        width: '100%',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        fontWeight: '600',
    }
});