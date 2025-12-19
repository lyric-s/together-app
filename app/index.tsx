import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SwitchProject from '@/components/SwitchProject'; 

type ActiveTab = 'Mission' | 'Association';

export default function SegmentedControlScreen() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('Mission');

    return (
        <View style={styles.screenContainer}>
            <SwitchProject 
                value={activeTab} 
                onChange={setActiveTab} 
            />

        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
    },
});