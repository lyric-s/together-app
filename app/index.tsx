/**
 * @file index.tsx
 * @description Point d'entrée de l'écran de démonstration du Segmented Control.
 * Ce fichier illustre comment intégrer le composant SwitchProject dans une vue parente.
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SwitchProject from '@/components/SwitchProject'; 

/**
 * Type local utilisé pour typer l'état de l'écran. 
 * Assure la cohérence avec les types attendus par le composant SwitchProject.
 */
type ActiveTab = 'Mission' | 'Association';

/**
 * Composant d'écran `SegmentedControlScreen`.
 * * @description
 * Cet écran agit comme un "Wrapper". Il maintient l'état de vérité (`activeTab`) 
 * et le transmet au composant `SwitchProject`. C'est un exemple typique de "Lifting State Up".
 * * @component
 * @returns {JSX.Element} Une vue centrée affichant le sélecteur.
 */
export default function SegmentedControlScreen() {
    /** * @state activeTab
     * État source de l'écran, synchronisé avec le Switch.
     */
    const [activeTab, setActiveTab] = useState<ActiveTab>('Mission');

    return (
        <View style={styles.screenContainer}>
            {/* Injection du composant SwitchProject.
                On lui passe la valeur actuelle et la fonction de mise à jour.
            */}
            <SwitchProject 
                value={activeTab} 
                onChange={setActiveTab} 
            />
        </View>
    );
}

/**
 * Styles de mise en page pour l'écran de contrôle.
 * * @constant styles
 * @property {ViewStyle} screenContainer - Utilise Flexbox pour occuper tout l'écran 
 * et placer le switch exactement au centre.
 */
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5', // Couleur de fond neutre pour faire ressortir le composant orange.
    },
});