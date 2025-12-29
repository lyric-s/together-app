/**
 * @file SwitchButton.styles.ts
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

// Définition des palettes de couleurs pour chaque variante
export const THEMES = {
    mission: {
        background: Colors.lightOrange || '#FFD8B1', // Fallback si Colors.lightOrange n'est pas chargé
        activeText: Colors.black,
        inactiveText: Colors.black,
    },
    auth: {
        background: '#E9E4F0', // Un violet très clair (exemple)
        activeText: '#4A0072', // Un violet foncé
        inactiveText: '#4A0072',
    }
};

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmentedControl: {
        flexDirection: 'row',
        borderRadius: 100,
        padding: 4,
        width: 300,
        height: 50,
        // La couleur de background est maintenant gérée dynamiquement
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        // La couleur de background est héritée ou transparente
    },
    activeButton: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    }
});