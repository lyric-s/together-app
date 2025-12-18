import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/pages/LoginWebStyles';

import Cross from '@/components/Cross';
import InputField from '@/components/InputField';
import ButtonAuth from '@/components/Button';

type Role = 'benevole' | 'association';
type Tab = 'connexion' | 'inscription';

export default function LoginWebPage() {
    const [role, setRole] = useState<Role>('benevole');
    const [tab, setTab] = useState<Tab>('connexion');

    const [email, setEmail] = useState('');
    const [rna, setRna] = useState('');
    const [password, setPassword] = useState('');

    const isConnexion = tab === 'connexion';
    const isAssociation = role === 'association';

    return (
        <LinearGradient colors={['#FFFFFF', '#FDEFE3']} style={styles.gradientBackground}>
            <View style={styles.root}>
                {/* Décors */}
                <View style={styles.decoPurpleTopLeft} />
                <View style={styles.decoOrangeTopLeft} />
                <View style={styles.decoOrangeTopCenter} />
                <View style={styles.decoOrangeBottom} />
                <View style={styles.decoPurpleBottom} />

                {/* TOP BAR */}
                <View style={styles.topBar}>
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            onPress={() => setTab('inscription')}
                            style={[styles.tabItem, tab === 'inscription' && styles.tabItemActive]}
                        >
                            <Text style={[styles.tabText, tab === 'inscription' && styles.tabTextActive]}>
                                Inscription
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setTab('connexion')}
                            style={[styles.tabItem, tab === 'connexion' && styles.tabItemActive]}
                        >
                            <Text style={[styles.tabText, tab === 'connexion' && styles.tabTextActive]}>
                                Connexion
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Cross
                        onClose={() => console.log('close')}
                        containerStyle={{ position: 'relative', top: 0, left: 0 }}
                    />
                </View>

                {/* CONTENU */}
                <View style={styles.layout}>
                    {/* GAUCHE */}
                    <View style={styles.leftZone}>
                        <Image
                            source={require('@/assets/images/Togetherlogologin.png')}
                            style={styles.logo}
                        />
                    </View>

                    {/* DROITE */}
                    <View style={styles.rightZone}>
                        {/* Switch rôle */}
                        <View style={styles.roleSwitch}>
                            <TouchableOpacity
                                onPress={() => setRole('benevole')}
                                style={[styles.roleItem, role === 'benevole' && styles.roleItemActive]}
                            >
                                <Text style={[styles.roleText, role === 'benevole' && styles.roleTextActive]}>
                                    Bénévole
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setRole('association')}
                                style={[styles.roleItem, role === 'association' && styles.roleItemActive]}
                            >
                                <Text style={[styles.roleText, role === 'association' && styles.roleTextActive]}>
                                    Association
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Avatar */}
                        <Image
                            source={require('@/assets/images/user3.png')}
                            style={styles.avatar}
                        />

                        <View style={styles.form}>
                            {isConnexion && isAssociation ? (
                                <InputField
                                    value={rna}
                                    onChangeText={setRna}
                                    placeholder="Code RNA"
                                    autoCapitalize="characters"
                                />
                            ) : (
                                <InputField
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Adresse mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            )}

                            <InputField
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Mot de passe"
                                secureTextEntry
                            />
                        </View>

                        <ButtonAuth text="Se connecter" onPress={() => console.log('login')} />

                        <TouchableOpacity>
                            <Text style={styles.forgot}>Mot de passe oublié</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}
