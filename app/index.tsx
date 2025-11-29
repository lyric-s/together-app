import React from 'react';
import BackButton from '@/components/BackButton';
import { View, Text } from 'react-native';
import MobileSearchBar from '@/components/MobileSearchBar';
import { useState } from "react";


/**
 * Renders a search UI with a category-enabled MobileSearchBar and a simple results count.
 *
 * The component maintains a local `results` state and passes `handleSearch` to the search bar; `handleSearch` is invoked when the user submits a search (currently logs inputs and is a placeholder for fetching or filtering results).
 *
 * @returns The React Native view containing the MobileSearchBar and a text element showing the number of results.
 */
export default function Index() {
    const [results, setResults] = useState([]);
  
  const categoryList = [
    "Environnement",
    "Social",
    "Éducation",
    "Culture",
    "Animaux",
  ];

  // ⬅ ville pré-remplie (optionnelle)
  const defaultCity = "Paris";

  // Appelé quand l’utilisateur appuie sur la loupe
  const handleSearch = (searchText: string, filters: any) => {
    console.log("Recherche lancée !");
    console.log("Texte :", searchText);
    console.log("Filtres :", filters);

    // Ici tu lances la requête API ou ton filtrage
    // fetch(...)
    // setResults(...)
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      
      <MobileSearchBar
        category_list={categoryList}
        default_city={defaultCity}   // option
        onSearch={handleSearch}
      />

      {/* Exemple d'affichage des résultats */}
      <Text style={{ marginTop: 20 }}>Résultats : {results.length}</Text>

    </View>
  );
}