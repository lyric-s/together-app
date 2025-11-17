import { StyleSheet } from 'react-native';
import { COULEURS } from '@/constants/couleurs';

export default StyleSheet.create({
    conteneur: {
        height: 260,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
    },
    cercleGauche: {
        position: 'absolute',
        top: -120,
        left: -80,
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: COULEURS.orange,
    },
    cercleDroit: {
        position: 'absolute',
        top: -60,
        right: -90,
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: COULEURS.violet,
    },
    boutonFermer: {
        position: 'absolute',
        top: 24,
        left: 24,
    },
    iconeFermer: {
        width: 24,
        height: 24,
        tintColor: COULEURS.violet,
    },
    avatar: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: -10,
    },
});
