/**
 * @file MobileNavigationBar.tsx
 * @description Functional component managing the main navigation at the bottom of the screen.
 * Uses Expo Router for page transitions and Ionicons for the visual aspect.
 */

import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '@/styles/components/MobileNavigationBarStyles';

/**
 * Interface defining the structure of a navigation bar tab.
 * * @interface TabItem
 * @property {string} id - Unique technical identifier serving as a key and state reference.
 * @property {keyof typeof Ionicons.glyphMap} iconName - "Filled" version of the icon (active state).
 * @property {keyof typeof Ionicons.glyphMap} iconOutline - "Outline" version of the icon (inactive state).
 */
type TabItem = {
    id: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconOutline: keyof typeof Ionicons.glyphMap;
};

/**
 * Bottom Navigation Bar component (Bottom Tab Bar).
 * * This component centralizes global navigation logic. It allows the user
 * to switch between the main sections of the application.
 * * @component
 * @example
 * return (
 * <BottomNavBar />
 * )
 * * @returns {JSX.Element} A View container structured in rows with tactile buttons.
 */
const BottomNavBar: React.FC = () => {
    /** * @state activeTab
     * @type {string}
     * Determines which tab receives the "active" style and the top visual indicator.
     * Default initialized to 'home'.
     */
    const [activeTab, setActiveTab] = useState<string>('home');
    
    /** * @hook useRouter
     * Provided by expo-router to perform imperative route pushes.
     */
    const router = useRouter();

    /** * Navigation tabs configuration.
     * Each object defines the associated icons according to the selection state.
     * @constant {TabItem[]} tabs
     */
    const tabs: TabItem[] = [
        { id: 'home', iconName: 'home', iconOutline: 'home-outline' },
        { id: 'search', iconName: 'search', iconOutline: 'search-outline' },
        { id: 'library', iconName: 'book', iconOutline: 'book-outline' },
        { id: 'profile', iconName: 'person', iconOutline: 'person-outline' },
    ];

    /**
     * Handles the press event (onPress) on a tab.
     * * This function orchestrates two actions:
     * 1. Updating the local UI via `setActiveTab`.
     * 2. Physical navigation to the corresponding file in the `/app` directory.
     * * @function handlePress
     * @param {string} tabId - The ID corresponding to the element clicked in the `tabs` array.
     */
    const handlePress = (tabId: string) => {
        setActiveTab(tabId);

        // Redirection logic based on tab ID
        switch (tabId) {
            case 'home':
                router.push('/');
                break;
            case 'search':
                router.push('/recherche');
                break;
            case 'library':
                router.push('/annonces'); 
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
                /** @constant {boolean} isActive - Calculates if the iterated tab is the selected tab. */
                const isActive = activeTab === tab.id;

                return (
                    <TouchableOpacity
                        key={tab.id}
                        style={styles.tabButton}
                        onPress={() => handlePress(tab.id)}
                        activeOpacity={0.7}
                        // Accessibility properties for screen readers (TalkBack / VoiceOver)
                        accessibilityRole="button"
                        accessibilityLabel={`Go to tab ${tab.id}`}
                        accessibilityState={{ selected: isActive }}
                    >
                        {/* Active underline bar (conditional) */}
                        {isActive && <View style={styles.activeIndicator} />}

                        <Ionicons
                            name={isActive ? tab.iconName : tab.iconOutline}
                            size={28}
                            color="#F97316" // Application identity orange
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default BottomNavBar;