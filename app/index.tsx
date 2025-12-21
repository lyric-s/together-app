import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SwitchProject from '@/components/SwitchProject'; 

type ActiveTab = 'Mission' | 'Association';

/**
 * Render a centered screen containing a SwitchProject segmented control for selecting between "Mission" and "Association".
 *
 * Manages local `activeTab` state and supplies it to the SwitchProject component via `value` and `onChange`.
 *
 * @returns A React element representing the segmented control screen.
 */
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