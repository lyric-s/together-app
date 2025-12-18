import React from 'react';
import BackButton from '@/components/BackButton';
import { View, Text } from 'react-native';
import MobileSearchBar from '@/components/MobileSearchBar';
import { useState } from "react";
import { useRouter } from "expo-router";
import ButtonAuth from '@/components/Button';


export default function Index() {
    const [results, setResults] = useState([]);
  
  const categoryList = [
    "Environnement",
    "Social",
    "Éducation",
    "Culture",
    "Animaux",
  ];

  const defaultCity = "Paris";

  const handleSearch = (searchText: string, filters: any) => {
    console.log("Recherche lancée !");
    console.log("Texte :", searchText);
    console.log("Filtres :", filters);

  };

  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      
      <MobileSearchBar
        category_list={categoryList}
        default_city={defaultCity}   // option
        onSearch={handleSearch}
      />

      <ButtonAuth text="Modifier Profil" onPress={() => router.push("/profil_modification")}/>

    </View>
  );
}
