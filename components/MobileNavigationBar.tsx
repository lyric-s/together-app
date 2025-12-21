import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '@/styles/components/MobileNavigationBarStyles';

/**
 * Interface définissant la structure d'un onglet de la barre de navigation.
 * * @property id - Identifiant unique de l'onglet (utilisé pour l'état actif et le routage).
 * @property iconName - Nom de l'icône Ionicons à afficher lorsque l'onglet est actif (version pleine).
 * @property iconOutline - Nom de l'icône Ionicons à afficher lorsque l'onglet est inactif (version contour).
 */
type TabItem = {
    id: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconOutline: keyof typeof Ionicons.glyphMap;
};

/**
 * Composant de barre de navigation inférieure (Bottom Tab Bar).
 * * Ce composant gère l'affichage des icônes de navigation, l'état visuel de l'onglet 
 * sélectionné et la redirection vers les différentes pages de l'application via `expo-router`.
 * * @returns Un élément React Native View contenant les boutons de navigation.
 */
const BottomNavBar: React.FC = () => {
    /** @state activeTab - Stocke l'ID de l'onglet actuellement sélectionné par l'utilisateur. */
    const [activeTab, setActiveTab] = useState<string>('home');
    
    /** Hook pour accéder au système de navigation par fichier d'Expo Router. */
    const router = useRouter();

    /** Liste des onglets à afficher dans la barre de navigation. */
    const tabs: TabItem[] = [
        { id: 'home', iconName: 'home', iconOutline: 'home-outline' },
        { id: 'search', iconName: 'search', iconOutline: 'search-outline' },
        { id: 'library', iconName: 'book', iconOutline: 'book-outline' },
        { id: 'profile', iconName: 'person', iconOutline: 'person-outline' },
    ];

    /**
     * Gère l'événement de pression sur un onglet.
     * Met à jour l'état visuel et déclenche la navigation vers la route correspondante.
     * * @param tabId - L'identifiant de l'onglet cliqué.
     */
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
                        {/* Indicateur visuel coloré au-dessus de l'icône active */}
                        {isActive && <View style={styles.activeIndicator} />}

                        <Ionicons
                            name={isActive ? tab.iconName : tab.iconOutline}
                            size={28}
                            color="#F97316" // Couleur orange principale
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default BottomNavBar;