import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MobileSearchBar from '@/components/MobileSearchBar';
// Assure-toi que le chemin d'import est correct selon ta structure
import SwitchButton from '@/components/SwitchButton'; 

export default function Index() {
  const [results, setResults] = useState([]);
  
  const categoryList = [
    "Environnement", "Social", "Éducation", "Culture", "Animaux",
  ];
  const defaultCity = "Paris";

  const handleSearch = (searchText: string, filters: any) => {
    console.log("Recherche :", searchText, filters);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      
      <Text style={styles.headerTitle}>Zone de Test Composants</Text>

      {/* TEST 1 : Variante Mission (Défaut) */}
      <View style={styles.testSection}>
        <Text style={styles.label}>Variante 1 : Mission (Default)</Text>
        <SwitchButton 
            variant="mission" 
            onChange={(tab) => console.log("Switch Mission ->", tab)}
        />
      </View>

      {/* TEST 2 : Variante Auth (Nouvelle) */}
      <View style={styles.testSection}>
        <Text style={styles.label}>Variante 2 : Auth (Inscription/Connexion)</Text>
        <SwitchButton 
            variant="auth" 
            onChange={(tab) => console.log("Switch Auth ->", tab)}
        />
      </View>

      {/* Ton composant existant */}
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
        paddingTop: 60, // Marge pour éviter la barre de statut
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