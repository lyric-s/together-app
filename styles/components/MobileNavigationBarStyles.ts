import { StyleSheet } from 'react-native';

/**
 * Styles pour le composant MobileNavigationBar.
 * * @constant styles
 * @property navBar - Conteneur principal horizontal avec ombre portée pour l'élévation.
 * @property tabButton - Conteneur individuel pour chaque icône, centrant le contenu.
 * @property activeIndicator - Barre horizontale décorative affichée au sommet de l'onglet actif.
 */
export const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 60,
        // Élévation pour Android
        elevation: 10,
        // Paramètres d'ombre pour iOS
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