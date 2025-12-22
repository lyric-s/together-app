/**
 * @file MobileNavigationBarStyles.ts
 * @description Définition des styles pour la barre de navigation mobile.
 * Ce fichier gère l'apparence visuelle, incluant la gestion des ombres portées
 * différenciées entre iOS et Android (système d'élévation).
 */

import { StyleSheet } from 'react-native';

/**
 * Styles pour le composant MobileNavigationBar.
 * * @constant styles
 * @category Styles
 * * @property {ViewStyle} navBar - Conteneur principal horizontal.
 * - Utilise `elevation` pour Android pour créer une ombre matérielle.
 * - Utilise les propriétés `shadow*` pour iOS pour un rendu précis du flou.
 * - La hauteur fixe de 60px assure une zone de contact tactile standard.
 * * @property {ViewStyle} tabButton - Conteneur individuel pour chaque icône.
 * - `flex: 1` permet de diviser l'espace équitablement entre tous les onglets.
 * - `position: relative` est nécessaire pour positionner l'activeIndicator de façon absolue.
 * * @property {ViewStyle} activeIndicator - Petit trait de couleur au sommet de l'onglet.
 * - Positionné en `absolute` pour ne pas décaler l'icône centrale.
 * - Les coins arrondis inférieurs créent un aspect "pilule" élégant.
 */
export const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 60,
        // Élévation pour Android (système de calques Material Design)
        elevation: 10,
        // Paramètres d'ombre pour iOS (Quartz Core)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    activeIndicator: {
        position: 'absolute',
        top: 0,
        alignSelf: 'center',
        width: 40,
        height: 4,
        backgroundColor: '#F97316',
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
});