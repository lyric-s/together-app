import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({

    gradientBackground: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
    },

    /* -------------------------
       FORMES DÉCORATIVES(les DEUX cercles)
    --------------------------*/
    topShapesContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },


    orangeCircle: {
        position: 'absolute',
        top: -140,
        left: -140,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: Colors.orange,
    },


    purpleCircle: {
        position: 'absolute',
        top: -230,
        right: -170,
        width: 380,
        height: 380,
        borderRadius: 190,
        backgroundColor: Colors.violet,
    },

    /* -------------------------
       Profile (SON ICONE)
    --------------------------*/
    avatarImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 145,
        zIndex: 20,
    },

    /* -------------------------
        FORMULAIRE DE CONNEXION
    --------------------------*/
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingTop: 20,
        zIndex: 5,
    },

    formContainer: {
        width: '100%',
        marginTop: 40,
        gap: 14,
    },

    /* -------------------------
       BOUTON SE CONNECTER
    --------------------------*/
    loginButton: {
        marginTop: 20,
        borderRadius: 30,
        height: 44,
        paddingHorizontal: 45,
        backgroundColor: Colors.orange,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    loginButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },

    /* -------------------------
       Mot de passe oublié
    --------------------------*/
    forgotPasswordButton: {
        marginTop: 16,
    },

    forgotPasswordText: {
        fontSize: 13,
        color: Colors.violet,
        textDecorationLine: 'underline',
    },

    /* -------------------------
       BAS DE PAGE
    --------------------------*/
    bottomLinksContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
        gap: 6,
    },

    bottomText: {
        fontSize: 13,
        color: Colors.grayText,
    },

    bottomLinkText: {
        fontSize: 13,
        color: Colors.violet,
        textDecorationLine: 'underline',
    },

    /* -------------------------
       LOGO TOGETHER
    --------------------------*/
    footerLogo: {
        width: 52,
        height: 52,
        resizeMode: 'contain',
        marginTop: 28,
        marginBottom: 20,
    },
});
