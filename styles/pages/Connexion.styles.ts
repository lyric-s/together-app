import { StyleSheet } from 'react-native';
import { COULEURS } from '@/constants/couleurs';

export default StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: COULEURS.fondHaut,
    },

    contenu: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
    },

    lienBleu: {
        marginTop: 18,
        textAlign: 'center',
        color: COULEURS.texteViolet,
        fontSize: 16,
    },

    ligneBas: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 22,
    },

    texteBas: {
        color: COULEURS.texteGris,
        fontSize: 16,
    },

    zoneLogo: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 32,
    },

    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
});
