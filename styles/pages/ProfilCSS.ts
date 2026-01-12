import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.black,
        marginLeft: 20,
        marginBottom: 2,
    },
    text:{
        fontSize: 12,
        color: Colors.grayText,
        marginBottom: 12,
        marginLeft: 20,
    },
    missionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 4,
    },
    missionDetail: {
        fontSize: 14,
        color: Colors.grayPlaceholder,
    },
    categoryContainer: {
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    actionsSection: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
    },
    buttonsContainer: {
        gap: 12,
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        minWidth: 150,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    participantsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        marginLeft: 10,
    },
    imageSection: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    participantsIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    participantsText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        textAlign: 'center',
    },
});