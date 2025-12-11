import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/pages/LoginMobileStyles';

import Cross from '@/components/Cross';
import InputField from '@/components/InputField';
import ButtonAuth from '@/components/Button'; // Votre bouton réutilisable

export default function LoginMobilePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => console.log("Close login page");
    const handleLogin = () => console.log("Attempt login:", email, password);
    const handleForgotPassword = () => console.log("Navigate forgot password");
    const handleGoToRegister = () => console.log("Navigate register");

    return (
        <LinearGradient
            colors={['#FFFFFF', '#FDEFE3']}
            style={styles.gradientBackground}
        >
            <SafeAreaView style={styles.safeArea}>

                {/* Formes circulaire(orange et violet) */}
                <View style={styles.topShapesContainer}>
                    <View style={styles.orangeCircle} />
                    <View style={styles.purpleCircle} />
                    <Cross onClose={handleClose} />
                </View>

                {/* Avatar pour profile */}
                <Image
                    source={require('@/assets/images/user3.png')}
                    style={styles.avatarImage}
                />

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <View style={styles.content}>

                        {/* Formulaire de connexion */}
                        <View style={styles.formContainer}>
                            <InputField
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Adresse mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <InputField
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Mot de passe"
                                secureTextEntry
                            />
                        </View>
                        <ButtonAuth
                            text="Se connecter"
                            onPress={handleLogin}
                        />
                        <TouchableOpacity
                            onPress={handleForgotPassword}
                            style={styles.forgotPasswordButton}
                        >
                            <Text style={styles.forgotPasswordText}>
                                Mot de passe oublié
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.bottomLinksContainer}>
                            <Text style={styles.bottomText}>Un compte ?</Text>
                            <TouchableOpacity onPress={handleGoToRegister}>
                                <Text style={styles.bottomLinkText}>
                                    S&apos;inscrire
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={require('@/assets/images/logo-together.png')}
                            style={styles.footerLogo}
                        />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}
