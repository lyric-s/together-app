/**
 * @file index.tsx
 * @description Page d'accueil racine de l'application.
 * Ce fichier définit la structure de base (Layout) de l'écran principal,
 * intégrant la zone de sécurité système et la barre de navigation.
 */

import { View, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '@/components/MobileNavigationBar';

/**
 * Écran principal de l'application (Index).
 * * @description
 * Ce composant agit comme une "coquille" (Shell). Il utilise `SafeAreaView` pour 
 * s'assurer que le contenu ne soit pas masqué par les encoches (notches) sur iPhone
 * ou les barres de statut sur Android.
 * * @component
 * @returns {JSX.Element} La vue principale de l'application.
 */
export default function Index() {

    return (
        <View style={styles.mainContainer}>

            {/* SafeAreaView est crucial ici pour que le padding haut 
                soit géré automatiquement selon l'appareil.
            */}
            <SafeAreaView style={styles.contentContainer}>
                {/* NOTE: Les composants de contenu spécifique à l'accueil 
                    devront être importés et placés ici. 
                */}
            </SafeAreaView>

            {/* Positionnement fixe en bas de l'écran grâce à la structure Flex du mainContainer */}
            <BottomNavBar />

        </View>
    );
}

/**
 * Configuration des options de navigation statiques.
 * * @constant options
 * @description 
 * Ces options sont lues par Expo Router pour configurer le Stack Navigator parent.
 * - `headerShown: false` permet d'utiliser notre propre design d'en-tête ou de s'en passer.
 */
(Index as any).options = {
    headerShown: false,
};

/**
 * Styles locaux à l'écran Index.
 * * @constant styles
 * @property {ViewStyle} mainContainer - Conteneur racine occupant 100% de la hauteur.
 * @property {ViewStyle} contentContainer - Espace dédié au contenu défilable ou interactif.
 * Le `paddingBottom: 80` garantit que même le contenu tout en bas ne soit pas 
 * recouvert par la BottomNavBar (qui fait 60px).
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
        paddingBottom: 80, // Marge de sécurité pour éviter le chevauchement avec la barre
    }
});