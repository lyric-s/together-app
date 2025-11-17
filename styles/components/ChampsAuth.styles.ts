import { StyleSheet } from 'react-native';
import { COULEURS } from '@/constants/couleurs';

export default StyleSheet.create({
    champ: {
        width: '75%',
        alignSelf: 'center',
        backgroundColor: COULEURS.violet,
        borderRadius: 30,
        height: 48,
        paddingHorizontal: 24,
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 12,
    },
});
