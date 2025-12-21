import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import du router
import { styles } from '@/styles/components/MobileNavigationBarStyles';


type TabItem = {
    id: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconOutline: keyof typeof Ionicons.glyphMap;
};


const BottomNavBar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('home');
    const router = useRouter(); // Hook pour la navigation

    const tabs: TabItem[] = [
        { id: 'home', iconName: 'home', iconOutline: 'home-outline' }, // Assure-toi que la route /home existe, sinon c'est souvent '/'
        { id: 'search', iconName: 'search', iconOutline: 'search-outline' },
        { id: 'library', iconName: 'book', iconOutline: 'book-outline' },
        { id: 'profile', iconName: 'person', iconOutline: 'person-outline' },
    ];

 
    const handlePress = (tabId: string) => {
        setActiveTab(tabId);

        
        switch (tabId) {
            case 'home':
                router.push('/');
                break;
            case 'search':
                router.push('/recherche');
                break;
            case 'library':
                router.push('annonces'); 
                break;
            case 'profile':
                router.push('/profil');
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.navBar}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <TouchableOpacity
                        key={tab.id}
                        style={styles.tabButton}
                        onPress={() => handlePress(tab.id)}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel={`Aller à l'onglet ${tab.id}`}
                        accessibilityState={{ selected: isActive }}
                    >
                        {isActive && <View style={styles.activeIndicator} />}

                        <Ionicons
                            name={isActive ? tab.iconName : tab.iconOutline}
                            size={28}
                            color="#F97316"
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default BottomNavBar;