/**
 * @file SwitchProject.styles.ts
 * @description Définition des styles stylisés pour le sélecteur de projet.
 * Ce module utilise le système de design de l'application basé sur la palette de couleurs centralisée.
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

/**
 * Définition des styles pour le composant SwitchProject.
 * * @constant styles
 * @property {ViewStyle} container - Conteneur global centré pour aligner le switch dans son parent.
 * @property {ViewStyle} segmentedControl - Fond de la barre de sélection. Utilise un `borderRadius` élevé pour l'aspect "pilule".
 * @property {ViewStyle} button - Style de base des deux options. Utilise `flex: 1` pour occuper 50% de l'espace chacune.
 * @property {ViewStyle} activeButton - Style de surbrillance pour l'onglet actif, créant un contraste avec le fond orange.
 * @property {TextStyle} text - Configuration de la typographie de base pour les labels des boutons.
 * @property {TextStyle} activeText - Couleur noire pleine pour une lisibilité maximale sur fond blanc.
 * @property {TextStyle} inactiveText - Applique une opacité de 70% pour signifier visuellement l'état non-sélectionné.
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