import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/colors'

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        margin: 20,
        borderRadius: 8,
        shadowColor: Colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        maxHeight: '80%',
        width: Math.min(screenWidth - 60, 420),
        maxWidth: '100%',
    },
    scrollContent: {
        padding: 20,
        alignItems: 'center',
        flexGrow: 1,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        width: '100%',
    },

    inputWrapper: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '100%',
    },

    buttonWrapper: {
        alignItems: 'center',
    },
    photo: {
        width: 150,
        height: 150,
        borderRadius: 30,
        backgroundColor: Colors.white,
    },
    labelContainer: {
        width: '35%',
        alignItems: 'flex-start',
        paddingRight: 10,
    },
    label: {
        fontWeight: "500",
        marginTop: 10,
        marginBottom: 10,
        color: Colors.violet,
        textAlign: 'left',
    },
    text: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        color: Colors.black,
    },
    separator: {
        height: 0.5,
        backgroundColor: Colors.violet,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.whiteLittleGray,
        borderRadius: 8,
        paddingLeft: 8,
        paddingVertical: 4,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 14,
        width: '100%',
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.white,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    editIcon: {
        fontSize: 20,
    },
});