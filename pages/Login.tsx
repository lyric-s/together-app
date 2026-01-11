import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Image, Platform, ActivityIndicator } from 'react-native';
import SwitchButton from '../components/SwitchButton'; 
import { styles } from '../styles/pages/RegisterCSS';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/context';
import { authService } from '@/services/authService';
import AlertToast from '@/components/AlertToast';
import { Colors } from '@/constants/colors';
import Cross from '@/components/Cross';

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [authTab, setAuthTab] = useState('Connexion');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ visible: false, title: '', message: '' });
    
    const isWeb = Platform.OS === 'web';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        router.replace('/(guest)/home');
    };

    const showToast = (title: string, message: string) => {
        setToast({ visible: true, title, message });
    };

    const handleLogin = async () => {
        if (!username.trim()) {
            showToast("Erreur", "Le nom d'utilisateur est requis.");
            return;
        }
        if (!password) {
            showToast("Erreur", "Le mot de passe est requis.");
            return;
        }
        setLoading(true);
        try {
            const response = await authService.login(username, password);
            await login(response.access_token, response.refresh_token);
            console.log("✅ Connexion réussie");
        } catch (e: any) {
            console.error(e);
            showToast("Échec de la connexion", "Identifiants incorrects.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
        <View style={[styles.container, { backgroundColor: Colors.white}]} >
        <AlertToast visible={toast.visible} title={toast.title} message={toast.message} onClose={() => setToast({...toast, visible: false})} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContainer]} bounces={false} keyboardShouldPersistTaps="handled">
            <View style={[styles.mainContainer, !isWeb && styles.columnLayout]}>
                
                {isWeb && (
                    <View style={styles.leftPanel}>
                        <View style={[styles.circle, styles.circleTopPurple]} />
                        <View style={[styles.circle, styles.circleTopOrange]} />
                        <View style={[styles.circle, styles.circleBottomOrange]} />
                        <View style={[styles.circle, styles.circleBottomPurple]} />
                        
                        <Image 
                            source={require('../assets/images/splash_art.png')} 
                            style={styles.logoImg} 
                            resizeMode="contain" 
                        />
                    </View>
                )}

                <View style={styles.rightPanel}>
                    {!isWeb && <View style={styles.mobileCircleTopRight} />}
                    {!isWeb && <View style={styles.mobileCircleBottomLeft} />}
                    
                    <View style={{ width: '100%', marginBottom: 20 }}>
                        <View style={[
                            styles.headerRow, 
                            !isWeb && { marginTop: 10, justifyContent: 'flex-end' },
                            isWeb && { justifyContent: 'flex-end', width: '100%' }
                        ]}>
                            {isWeb &&
                            <>
                                <SwitchButton 
                                    variant="auth" 
                                    value={authTab}
                                    onChange={(tab) => {if (tab === 'Inscription') router.push('/(auth)/register');}}
                                />
                                <Cross
                                    onClose={handleClose}
                                    containerStyle={{ position: 'relative', top: 0, left: 0 }}
                                />
                            </>
                            }
                            {!isWeb &&
                                <Cross
                                    onClose={handleClose}
                                    containerStyle={{ position: 'absolute', top: -20, left: -20 }}
                                />
                            }
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 400 }}>
                        <View style={styles.avatarCircle}>
                            <Image 
                                source={require('../assets/images/user.png')} 
                                style={styles.avatarImage}
                                resizeMode="cover"
                            />
                        </View>

                        <View style={styles.form}>
                            <TextInput 
                                placeholder="Username *" 
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                style={styles.input}
                                value={username} onChangeText={setUsername}
                                accessibilityLabel="Nom d'utilisateur"
                                accessibilityHint="Entrez votre nom d'utilisateur"
                             
                            />
                            <TextInput 
                                placeholder="Mot de passe *" 
                                placeholderTextColor="rgba(255,255,255,0.7)" 
                                style={styles.input} 
                                secureTextEntry={true}  
                                value={password} 
                                onChangeText={setPassword}
                                accessibilityLabel="Mot de passe"
                                accessibilityHint="Entrez votre mot de passe"
                            />

                            <TouchableOpacity 
                                style={styles.submitBtn} 
                                onPress={handleLogin}
                                accessibilityLabel="Se connecter"
                                accessibilityHint="Appuyez pour vous connecter"
                                accessibilityRole="button"
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.submitBtnText}>Se connecter</Text>
                                )}
                            </TouchableOpacity>
                            
                            { !isWeb &&
                            <View style={styles.bottomLinksContainer}>
                                <Text style={styles.bottomText}> Pas de compte ?</Text>
                                <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                                    <Text style={styles.bottomLinkText}>
                                        S'inscrire
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            }
                            { !isWeb &&
                                <Image
                                    source={require('@/assets/images/logo-together.png')}
                                    style={styles.footerLogo}
                                />
                            }
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        </View>
        </KeyboardAvoidingView>
    );
}