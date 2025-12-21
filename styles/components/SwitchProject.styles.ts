import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

/**
 * Définition des styles pour le composant SwitchProject.
 * * @constant styles
 * @property container - Conteneur global centré.
 * @property segmentedControl - Le fond de la barre de sélection (forme pillule, couleur orange clair).
 * @property button - Style de base des deux options cliquables.
 * @property activeButton - Style appliqué à l'option sélectionnée (fond blanc pour le contraste).
 * @property text - Style de police partagé pour les labels.
 * @property activeText - Couleur du texte pour l'onglet actif.
 * @property inactiveText - Opacité réduite pour le texte de l'onglet non sélectionné.
 */
export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: Colors.lightOrange, // Utilise la constante de couleur globale
        borderRadius: 100, // Forme arrondie de type "pilule"
        padding: 4,
        width: 300,
        height: 50,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: Colors.lightOrange,
    },
    activeButton: {
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    activeText: {
        color: Colors.black,
    },
    inactiveText: {
        color: Colors.black,
        opacity: 0.7, // Effet visuel de désactivation
    }
});