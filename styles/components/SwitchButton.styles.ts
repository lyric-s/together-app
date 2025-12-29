import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

/**
 * Configuration des thèmes de couleurs.
 * - Mission : Bouton actif Orange (#FF9A66)
 * - Auth : Bouton actif Violet (#A9A7ED)
 * - Le fond (track) reste Orange pour les deux.
 */
export const THEMES = {
    mission: {
        background: '#FF7630', // Couleur du fond de la barre
        activeButton: '#FF9A66',        // Couleur du bouton sélectionné
        activeText: Colors.white,
        inactiveText: Colors.white,
    },
    auth: {
        background: '#6A66B8', // Même fond que mission
        activeButton: '#A9A7ED',        // Couleur violette spécifique
        activeText: Colors.white,
        inactiveText: Colors.white,
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
        // backgroundColor est géré dynamiquement par le composant
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    activeButton: {
        // backgroundColor est surchargé dynamiquement par le composant
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