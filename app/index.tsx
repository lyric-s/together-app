import React from 'react';
import {  View } from 'react-native';
import Cross from '@/components/Cross';

export default function Connexion() {
    return (
        <View style={{ flex: 1 }}>
            <Cross onClose={() => console.log('Fermeture')} />
        </View>
    );
}
