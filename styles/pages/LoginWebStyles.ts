import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },

    root: {
        flex: 1,
        position: 'relative',
    },

    /* DÉCORS */
    decoPurpleTopLeft: {
        position: 'absolute',
        top: -55,
        left: -55,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.violet,
    },

    decoOrangeTopLeft: {
        position: 'absolute',
        top: 35,
        left: -85,
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: Colors.orange,
    },

    decoOrangeTopCenter: {
        position: 'absolute',
        top: -75,
        left: '50%',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: Colors.orange,
        transform: [{ translateX: -75 }],
    },

    decoOrangeBottom: {
        position: 'absolute',
        bottom: -95,
        left: '34%',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: Colors.orange,
    },

    decoPurpleBottom: {
        position: 'absolute',
        bottom: -120,
        left: '42%',
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: Colors.violet,
    },

    /* TOP BAR */
    topBar: {
        position: 'absolute',
        top: 24,
        right: 24,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        zIndex: 20,
    },

    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3E7DE',
        borderRadius: 999,
        overflow: 'hidden',
    },

    tabItem: {
        paddingHorizontal: 16,
        paddingVertical: 7,
        minWidth: 92,
        alignItems: 'center',
    },

    tabItemActive: {
        backgroundColor: Colors.violet,
        borderRadius: 999,
    },

    tabText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.violet,
    },

    tabTextActive: {
        color: '#FFFFFF',
    },

    /* LAYOUT */
    layout: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 120,
        paddingHorizontal: 40,
    },

    leftZone: {
        width: 560,
        alignItems: 'center',
    },

    /* LOGO TOGETHER */
    logo: {
        width: 456,
        height: 456,
        resizeMode: 'contain',
        transform: [{ translateX: -60 }],
    },

    rightZone: {
        width: 340,
        alignItems: 'center',
    },

    /* SWITCH RÔLE */
    roleSwitch: {
        flexDirection: 'row',
        backgroundColor: '#F3E7DE',
        borderRadius: 999,
        overflow: 'hidden',
        marginBottom: 18,
    },

    roleItem: {
        paddingHorizontal: 16,
        paddingVertical: 7,
        minWidth: 92,
        alignItems: 'center',
    },

    roleItemActive: {
        backgroundColor: Colors.orange,
        borderRadius: 999,
    },

    roleText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.orange,
    },

    roleTextActive: {
        color: '#FFFFFF',
    },

    /* AVATAR – 256px */
    avatar: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 24,
    },

    form: {
        width: '100%',
        gap: 12,
        marginBottom: 18,
    },

    forgot: {
        marginTop: 12,
        fontSize: 12,
        color: Colors.violet,
        textDecorationLine: 'underline',
    },
});
