import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import ProfilCard from '@/components/ProfilCard';
import AlertToast from '@/components/AlertToast';
import { FormData } from '@/types/profile'; 

export default function Index() {

    const [alertModal, setAlertModal] = useState({ 
        visible: false, 
        title: '', 
        message: '' 
    });

    const userData: FormData = {
        picture: '',
        lastname: 'Dupont',
        firstname: 'Jean',
        email: 'jean.dupont@example.com',
        mobile: '0612345678',
        role: 'Administrateur',
        codeRNA: '',
        recepisse: '',
        password: 'testPassword123', // Demo data only
        confirmPassword: '',
    };

    const showAlert = useCallback((title: string, message: string) => {
        setAlertModal({ visible: true, title, message });
    }, []);

    const handleSave = async (data: FormData) => {
        console.log('Sauvegardé')
    };

    const handleAlertClose = useCallback(() => {
        setAlertModal({ visible: false, title: '', message: '' })
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ProfilCard
                userType="admin"
                userData={userData}
                onSave={handleSave}
                showAlert={showAlert}
            />
            <AlertToast
                visible={alertModal.visible}
                title={alertModal.title}
                message={alertModal.message}
                onClose={handleAlertClose}
            />
        </View>
    );
}
