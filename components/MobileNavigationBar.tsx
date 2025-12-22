/**
 * @file MobileNavigationBar.tsx
 * @description Composant fonctionnel gérant la navigation principale en bas de l'écran.
 * Utilise Expo Router pour les transitions de pages et Ionicons pour l'aspect visuel.
 */

import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '@/styles/components/MobileNavigationBarStyles';

/**
 * Interface définissant la structure d'un onglet de la barre de navigation.
 * * @interface TabItem
 * @property {string} id - Identifiant technique unique servant de clé et de référence d'état.
 * @property {keyof typeof Ionicons.glyphMap} iconName - Version "remplie" de l'icône (état actif).
 * @property {keyof typeof Ionicons.glyphMap} iconOutline - Version "contour" de l'icône (état inactif).
 */
type TabItem = {
    id: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconOutline: keyof typeof Ionicons.glyphMap;
};

/**
 * Composant de barre de navigation inférieure (Bottom Tab Bar).
 * * Ce composant centralise la logique de navigation globale. Il permet à l'utilisateur
 * de basculer entre les sections principales de l'application.
 * * @component
 * @example
 * return (
 * <BottomNavBar />
 * )
 * * @returns {JSX.Element} Un conteneur View structuré en lignes avec des boutons tactiles.
 */
const BottomNavBar: React.FC = () => {
    /** * @state activeTab
     * @type {string}
     * Détermine quel onglet reçoit le style "actif" et l'indicateur visuel supérieur.
     * Initialisé par défaut sur 'home'.
     */
    const [activeTab, setActiveTab] = useState<string>('home');
    
    /** * @hook useRouter
     * Fourni par expo-router pour effectuer des push de routes de manière impérative.
     */
    const router = useRouter();

    /** * Configuration des onglets de navigation.
     * Chaque objet définit les icônes associées selon l'état de sélection.
     * @constant {TabItem[]} tabs
     */
    const tabs: TabItem[] = [
        { id: 'home', iconName: 'home', iconOutline: 'home-outline' },
        { id: 'search', iconName: 'search', iconOutline: 'search-outline' },
        { id: 'library', iconName: 'book', iconOutline: 'book-outline' },
        { id: 'profile', iconName: 'person', iconOutline: 'person-outline' },
    ];

    /**
     * Gère l'événement de pression (onPress) sur un onglet.
     * * Cette fonction orchestre deux actions :
     * 1. Mise à jour de l'UI locale via `setActiveTab`.
     * 2. Navigation physique vers le fichier correspondant dans le répertoire `/app`.
     * * @function handlePress
     * @param {string} tabId - L'ID correspondant à l'élément cliqué dans le tableau `tabs`.
     */
    const handlePress = (tabId: string) => {
        setActiveTab(tabId);

        // Logique de redirection basée sur l'ID de l'onglet
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
                /** @constant {boolean} isActive - Calcule si l'onglet itéré est l'onglet sélectionné. */
                const isActive = activeTab === tab.id;

                return (
                    <TouchableOpacity
                        key={tab.id}
                        style={styles.tabButton}
                        onPress={() => handlePress(tab.id)}
                        activeOpacity={0.7}
                        // Propriétés d'accessibilité pour les lecteurs d'écran (TalkBack / VoiceOver)
                        accessibilityRole="button"
                        accessibilityLabel={`Aller à l'onglet ${tab.id}`}
                        accessibilityState={{ selected: isActive }}
                    >
                        {/* Barre de soulignement active (conditionnelle) */}
                        {isActive && <View style={styles.activeIndicator} />}

                        <Ionicons
                            name={isActive ? tab.iconName : tab.iconOutline}
                            size={28}
                            color="#F97316" // Orange identitaire de l'application
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default BottomNavBar;