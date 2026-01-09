// ProfilAdmin.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, useWindowDimensions, Platform, } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfileData } from '@/types/ProfileUser';
import AlertToast from '@/components/AlertToast';
import { Colors } from '@/constants/colors';
import { styles } from '@/styles/pages/ProfilCSS';
import ProfilCard from '@/components/ProfilCard';
import { adminService } from '@/services/adminService';
import { useAuth } from '@/context/AuthContext';

export default function ProfilAdmin() {
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 900;
    
    /*
    const [profileUser, setProfileUser] = useState<any>({
        id_admin: 0,
        last_name: 'Xavier',
        first_name: 'Paul',
        email: 'paul.xavier@gmail.com',
    });
    */
    // We distinguish between page loading and authentication loading
    const { user, userType, isLoading: isAuthLoading, refetchUser } = useAuth();
    
    // Local loading for profile data
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [profileUser, setProfileUser] = useState<ProfileData | null>(null);

    const [alertModal, setAlertModal] = useState({ 
        visible: false, 
        title: '', 
        message: '' 
    });

    
    useEffect(() => {
        // While the authentication is loading, we do nothing.
        if (isAuthLoading) return;

        if (userType !== 'admin') {
            const isWeb = Platform.OS === 'web';
            console.log(`⛔ Accès refusé (${userType}) -> Redirection`);
            if (!userType || userType === 'volunteer_guest') {
                router.replace('/(main)/home/AccountWithoutCo');
            }
            else if (userType === 'volunteer') {
                router.replace('/(main)/home/AccountBenevole');
            }
            else if (userType === 'association' && isWeb) {
                router.replace('/(main)/home/AccountAsso');
            }
            else {
                // Mobile asso → home (pas de profil asso mobile)
                router.replace('/(main)/home/AccountWithoutCo');
            }
        }
    }, [userType, isAuthLoading]);

    useEffect(() => {
        if (isAuthLoading) return;
        
        if (userType === 'admin' && user) {
            fetchProfile();
        }
    }, [userType, user, isAuthLoading]);

    const fetchProfile = async () => {
        setIsPageLoading(true);
        try {
            const data = await adminService.getMe();
            const profileData: ProfileData = {
                id_admin: data.id_admin,
                id_volunteer: -1, // Non utilisé pour admin
                id_asso: -1,     // Non utilisé pour admin
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                username: data.username,
                picture: null,
                phone_number: '',
                birthdate: '',
                skills: '',
                address: '',
                zip_code: '',
                bio: '',
                name: '',
                country: '',
                rna_code: '',
                company_name: '',
                password: '',
                confirmPassword: '',
            };
            setProfileUser(profileData);
        } catch (error) {
            showAlert('Erreur', 'Impossible de récupérer vos informations de profil.');
        } finally {
            setIsPageLoading(false);
        }
    };

    const handleAlertClose = useCallback(() => {
        setAlertModal({ visible: false, title: '', message: '' })
    }, []);

    const showAlert = useCallback((title: string, message: string) => {
        setAlertModal({ visible: true, title, message });
    }, []);

    const handleSave = async (data: ProfileData):Promise<void> => {
        // Here you would typically send the updated data to your backend/server
        if (!profileUser?.id_admin) return;
        try {
            const payloadAdmin = {
                last_name: data.last_name ?? profileUser.last_name,
                first_name: data.first_name ?? profileUser.first_name,
                username: data.username ?? profileUser.username,
                email: data.email ?? profileUser.email,
                ...(data.password ? { password: data.password } : {})
            }
            await adminService.updateProfile(profileUser.id_admin, payloadAdmin);
            setProfileUser(prev => prev ? ({ ...prev, ...payloadAdmin }) : null);
            await refetchUser(); // Synchro AutoContext
        } catch (error) {
            showAlert('Erreur', 'Échec de la mise à jour du profil.');
        }
    }

    if (isAuthLoading || isPageLoading || !profileUser) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
                <Text>Chargement...</Text>
            </View>
        );
    }

    return (
        <>
            <LinearGradient
                colors={[Colors.white, Colors.orangeVeryLight]}                style={{ flex: 1 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            >
            <AlertToast
                visible={alertModal.visible}
                title={alertModal.title}
                message={alertModal.message}
                onClose={handleAlertClose}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{ flex: 1 }}>
                    <ScrollView style={styles.content}>
                        <Text style={[styles.pageTitle, isSmallScreen && {paddingLeft: 40}]}>Mon profil</Text>
                        <Text style={[styles.text, isSmallScreen && {paddingLeft: 40}]}>Toutes les données vous concernant</Text>
                        <View>
                            <ProfilCard
                                userType = 'admin'
                                userData = {profileUser}
                                onSave={handleSave}
                                showAlert={showAlert}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
            </LinearGradient>
        </>
    );
}