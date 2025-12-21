// ProfilAdmin.tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import Sidebar from '@/components/SideBar';
import { FormData } from '@/types/ProfileUser';
import AlertToast from '@/components/AlertToast';
import { Colors } from '@/constants/colors';
import { styles } from '@/styles/pages/ProfilCSS';
import ProfilCard from '@/components/ProfilCard';

export default function ProfilAdmin() {
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 900;

    const [profileUser, setProfilUSer] = useState<any>({
        lastname: 'Xavier',
        firstname: 'Paul',
        email: 'paul.xavier@gmail.com',
        mobile: '06 12 34 56 78',
        role: 'Administrateur',
        password: '********',
        confirmPassword: '********',
    });

    const [alertModal, setAlertModal] = useState({ 
        visible: false, 
        title: '', 
        message: '' 
    });

    const handleAlertClose = useCallback(() => {
        setAlertModal({ visible: false, title: '', message: '' })
    }, []);

    const showAlert = useCallback((title: string, message: string) => {
        setAlertModal({ visible: true, title, message });
    }, []);

    const handleSave = async (data: FormData):Promise<void> => {
        // Here you would typically send the updated data to your backend/server
        // For this example, we'll just update the local state
        try {
            // await saveToBackend(data); // Décommente quand backend prêt
            setProfilUSer(data);
            showAlert('Succès', 'Les informations du profil ont été mises à jour avec succès.');
        } catch (error) {
            showAlert('Erreur', 'Échec de la mise à jour du profil.');
        }
    }

    return (
        <>
            <AlertToast
                visible={alertModal.visible}
                title={alertModal.title}
                message={alertModal.message}
                onClose={handleAlertClose}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Sidebar
                userType='admin'
                userName='Paul'
                onNavigate={(route: string) => {router.push(('/' + route) as any)}}
                />

                <View style={{ flex: 1 }}>
                    {isSmallScreen ? (
                        <ScrollView style={styles.content}>
                            <Text style={[styles.pageTitle, {paddingLeft : 40}]}>Mon profil</Text>
                            <Text style={[styles.text, {paddingLeft : 40}]}>Toutes les données vous concernant</Text>
                            <View>
                                <ProfilCard
                                    userType = 'admin'
                                    userData = {profileUser}
                                    onSave={handleSave}
                                    showAlert={showAlert}
                                />
                            </View>
                        </ScrollView>
                    ) : (

                        <ScrollView style={styles.content}>
                            <Text style={styles.pageTitle}>Mon profil</Text>
                            <Text style={styles.text}>Toutes les données vous concernant</Text>
                            <View>
                                <ProfilCard
                                    userType = 'admin'
                                    userData = {profileUser}
                                    onSave={handleSave}
                                    showAlert={showAlert}
                                />
                            </View>
                        </ScrollView>
                    )}
                </View>
            </View>
        </>
    );
}