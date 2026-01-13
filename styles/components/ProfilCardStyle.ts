import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/colors'

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: 15, // Un peu plus arrondi pour un look moderne
        shadowColor: Colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        // On retire maxHeight fixe pour laisser le contenu grandir si nécessaire
        // On retire margin: 20 car c'est géré par le parent ou le width dynamique
        maxHeight: '85%', // Laisse un peu d'espace en haut et en bas de l'écran
        marginTop: 20,
        marginBottom: 20,
    },
    scrollContent: {
        alignItems: 'center',
        flexGrow: 1,
        // margin: 40 supprimé et remplacé par padding dynamique dans le composant
        paddingBottom: 20,
    },
    photoContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    photo: {
        width: 120, // Légèrement réduit pour gagner de la place sur petits écrans
        height: 120,
        borderRadius: 60, // Doit être la moitié de width/height pour être rond
        backgroundColor: Colors.whiteLittleGray, // Couleur de fond si pas d'image
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center', // Centrer verticalement
        marginBottom: 12, // Espacement vertical entre les lignes
        width: '100%',
    },
    labelContainer: {
        flex: 1, // Prend 1 part de l'espace (environ 30-35%)
        paddingRight: 10,
        justifyContent: 'center',
    },
    inputWrapper: {
        flex: 2, // Prend 2 parts de l'espace (environ 65-70%) - Plus flexible que width: '65%'
    },
    label: {
        fontWeight: "600",
        fontSize: 13, // Un peu plus petit pour éviter le retour à la ligne
        color: Colors.violet,
        textAlign: 'left',
    },
    text: {
        fontSize: 14,
        paddingVertical: 8,
        textAlign: 'center', // Changé à left pour meilleure lisibilité ? Ou center selon design
        color: Colors.black,
    },
    separator: {
        height: 1, // Un peu plus épais pour visibilité
        backgroundColor: Colors.violet,
        opacity: 0.5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0', // Couleur plus douce
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8, // Zone de touche plus confortable
        fontSize: 14,
        width: '100%',
        backgroundColor: '#FAFAFA', // Léger fond pour indiquer champ éditable
    },
    // Boutons
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Écarte les boutons
        marginTop: 30,
        width: '100%',
        gap: 10, // Espace entre les boutons (React Native 0.71+)
    },
    buttonWrapper: {
        flex: 1, // Chaque bouton prend 50% de l'espace disponible
        alignItems: 'center',
    },
    responsiveButton: {
        width: '100%', // Le bouton remplit son wrapper
        maxWidth: 140, // Mais ne dépasse pas 140px sur grands écrans
        height: 40,    // Hauteur standard tactile
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.white,
        borderRadius: 20,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    editIcon: {
        fontSize: 18,
    },
});