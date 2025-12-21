import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SwitchProject from '@/components/SwitchProject'; 

/**
 * Type représentant les deux onglets disponibles dans le contrôle segmenté.
 */
type ActiveTab = 'Mission' | 'Association';

/**
 * Composant d'écran `SegmentedControlScreen`.
 * * Affiche un écran centré contenant le composant `SwitchProject` pour basculer entre "Mission" et "Association".
 * Ce composant gère l'état local `activeTab` et le synchronise avec le sélecteur via les props `value` et `onChange`.
 * * @returns {JSX.Element} Un élément React Native représentant l'écran de contrôle.
 */
export default function SegmentedControlScreen() {
    /** @state activeTab - État local contrôlant l'onglet actif, initialisé à 'Mission'. */
    const [activeTab, setActiveTab] = useState<ActiveTab>('Mission');

    return (
        <View style={styles.screenContainer}>
            <SwitchProject 
                value={activeTab} 
                onChange={setActiveTab} 
            />
        </View>
    );
}

/**
 * Styles pour l'écran SegmentedControlScreen.
 * @property screenContainer - Centre le contenu verticalement et horizontalement avec un fond gris clair.
 */
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
    },
});