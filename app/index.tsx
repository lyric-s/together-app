import React from 'react';
<<<<<<< HEAD
import {  View } from 'react-native';
import Cross from '@/components/Cross';

export default function Connexion() {
    return (
        <View style={{ flex: 1 }}>
            <Cross onClose={() => console.log('Fermeture')} />
=======
import { View } from 'react-native';
import ButtonAuth from "@/components/Button";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FDF7F2',
            }}
        >
            <ButtonAuth
                text="Test button"
                onPress={() => console.log('Bouton pressé')}
            />
>>>>>>> 3ba22b2d (adding component  button for web and mobile)
        </View>
    );
}
