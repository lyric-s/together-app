/**
 * @file index.tsx
 * @description Entry point for the Segmented Control demonstration screen.
 * This file illustrates how to integrate the SwitchProject component into a parent view.
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SwitchProject from '@/components/SwitchProject'; 

/**
 * Local type used to type the screen state. 
 * Ensures consistency with the types expected by the SwitchProject component.
 */
type ActiveTab = 'Mission' | 'Association';

/**
 * `SegmentedControlScreen` screen component.
 * * @description
 * This screen acts as a "Wrapper". It maintains the source of truth (`activeTab`) 
 * and passes it to the `SwitchProject` component. This is a typical example of "Lifting State Up".
 * * @component
 * @returns {JSX.Element} A centered view displaying the selector.
 */
export default function SegmentedControlScreen() {
    /** * @state activeTab
     * Screen source state, synchronized with the Switch.
     */
    const [activeTab, setActiveTab] = useState<ActiveTab>('Mission');

    return (
        <View style={styles.screenContainer}>
            {/* Injection of the SwitchProject component.
                We pass it the current value and the update function.
            */}
            <SwitchProject 
                value={activeTab} 
                onChange={setActiveTab} 
            />
        </View>
    );
}

/**
 * Layout styles for the control screen.
 * * @constant styles
 * @property {ViewStyle} screenContainer - Uses Flexbox to occupy the entire screen 
 * and place the switch exactly in the center.
 */
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5', // Neutral background color to make the orange component stand out.
    },
});