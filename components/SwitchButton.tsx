/**
 * @file SwitchProject.tsx
 * @description Segmented navigation component allowing to toggle between Mission and Association views.
 * Integrates Expo Router routing logic.
 */

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/styles/components/SwitchButton.styles';

/**
 * Union type defining the possible values for the active tab.
 * 'Mission' generally corresponds to ads, 'Association' to profile/association search.
 */
export type ActiveTab = 'Mission' | 'Association';

/**
 * Properties of the SwitchProject component.
 * @interface SwitchProjectProps
 * @property {ActiveTab} [value] - The current active tab (for external component control).
 * @property {ActiveTab} [defaultValue] - The default active tab if `value` is not defined (default: 'Mission').
 * @property {function} [onChange] - Callback function called when the tab changes.
 * @property {StyleProp<ViewStyle>} [style] - Allows applying custom styles (margins, positioning) to the external container.
 */
export interface SwitchProjectProps {
    value?: ActiveTab;
    defaultValue?: ActiveTab;
    onChange?: (tab: ActiveTab) => void;
    style?: StyleProp<ViewStyle>;
}

/**
 * `SwitchProject` component.
 * * @description 
 * This component displays a horizontal selection bar. It supports two modes:
 * 1. **Controlled**: If `value` is provided, the component relies on the parent for its state.
 * 2. **Uncontrolled**: Uses an internal state via `internalActiveTab`.
 * * @param {SwitchProjectProps} props - Switch configuration properties.
 * @returns {JSX.Element} The rendered segmented navigation component.
 */
export default function SwitchProject({ value, defaultValue = 'Mission', onChange, style }: SwitchProjectProps) {
    /** * @state internalActiveTab 
     * Manages local state if no 'value' prop is passed by the parent. 
     */
    const [internalActiveTab, setInternalActiveTab] = useState<ActiveTab>(defaultValue);
    
    /** Expo Router hook to handle programmatic navigation. */
    const router = useRouter();

    /** * State selection logic: prioritizes the 'value' prop (controlled mode), 
     * otherwise uses internal state (uncontrolled mode).
     */
    const activeTab = value ?? internalActiveTab;

    /**
     * Handles the click event on a segment.
     * * @async (Optional if heavy redirection)
     * @param {ActiveTab} tab - The target tab name.
     * @description
     * 1. Updates the visual state (internal or via callback).
     * 2. Navigates to the corresponding path defined in the /app folder.
     */
    const handlePress = (tab: ActiveTab) => {
        // Updating the visual state
        if (value === undefined) {
            setInternalActiveTab(tab);
        }
        onChange?.(tab);

        // Navigation to routes defined in Expo Router
        switch (tab) {
            case 'Mission':
                router.push('/mission');
                break;
            case 'Association':
                router.push('/association');
                break;
            default:
                break;
        }
    };

    return (
        <View style={[styles.container, style]}>
            <View style={styles.segmentedControl}>
                {/* Button Section: Mission */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeTab === 'Mission' && styles.activeButton
                    ]}
                    onPress={() => handlePress('Mission')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.text, activeTab === 'Mission' ? styles.activeText : styles.inactiveText]}>
                        Mission
                    </Text>
                </TouchableOpacity>

                {/* Button Section: Association */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeTab === 'Association' && styles.activeButton
                    ]}
                    onPress={() => handlePress('Association')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.text, activeTab === 'Association' ? styles.activeText : styles.inactiveText]}>
                        Association
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}