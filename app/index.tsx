import React from 'react';
import BackButton from '@/components/BackButton';
import { View, Text } from 'react-native';
import MobileSearchBar from '@/components/MobileNavigationBar';

export default function Index() {
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

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <MobileSearchBar
                category_list={categoryList}
                default_city={defaultCity}   // option
                onSearch={handleSearch}
            />
        </View>
    );
}