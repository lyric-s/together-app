import React, { useState } from 'react';
import { View } from 'react-native';
import ProfilCard from '@/components/ProfilCard';
import AlertToast from '@/components/AlertToast';

type FormData = {
    picture: any;
    lastname: string;
    firstname: string;
    email: string;
    mobile: string;
    role: string;
    codeRNA: string;
    recepisse: string;
    password: string;
    confirmPassword: string;
};

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
        password: 'hashedpassword',
        confirmPassword: '',
    };

    const showAlert = (title: string, message: string) => {
        setAlertModal({ visible: true, title, message });
    };

    const handleSave = async (data: FormData) => {
        console.log('Sauvegardé')
    };

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
                onClose={() => setAlertModal({ visible: false, title: '', message: '' })}
            />
        </View>
    );
}
