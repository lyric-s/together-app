import React from 'react';
import { View, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '@/components/MobileNavigationBar';

/**
 * Écran principal de l'application (Index).
 * * Ce composant sert de layout racine pour la page d'accueil. Il organise l'écran en deux parties :
 * 1. Une zone de contenu sécurisée (`SafeAreaView`) qui évite les encoches et barres système.
 * 2. Une barre de navigation persistante en bas de l'écran.
 * * @returns Le composant de structure de l'écran Home.
 */
export default function Index() {

    return (
        <View style={styles.mainContainer}>

            {/* Zone de contenu principal, protégée par SafeAreaView pour la compatibilité iOS/Android */}
            <SafeAreaView style={styles.contentContainer}>
                {/* Le contenu de la page viendra s'insérer ici */}
            </SafeAreaView>

            {/* Barre de navigation fixée en bas du mainContainer */}
            <BottomNavBar />

        </View>
    );
}

/**
 * Configuration des options de navigation pour cet écran.
 * Désactive l'en-tête par défaut d'Expo Router.
 */
(Index as any).options = {
    headerShown: false,
};

/**
 * Styles spécifiques à l'écran Index.
 * * @property mainContainer - Prend toute la place disponible et définit le fond gris clair.
 * @property contentContainer - Zone de contenu avec padding interne, incluant un paddingBottom 
 * important (80) pour ne pas être caché par la BottomNavBar.
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 80, // Espace réservé pour la barre de navigation
    }
});