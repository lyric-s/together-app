import { StyleSheet } from 'react-native';
import { COULEURS } from '@/constants/couleurs';

export default StyleSheet.create({
    bouton: {
        marginTop: 98,
        alignSelf: 'center',
        width: '56%',
        height: 50,
        borderRadius: 30,
        backgroundColor: COULEURS.orange,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texte: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '500',
    },
});
