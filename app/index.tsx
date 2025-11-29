import React from 'react';
import BackButton from '@/components/BackButton';
import { View, Text } from 'react-native';
import MobileSearchBar from '@/components/MobileSearchBar';
import { useState } from "react";


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
