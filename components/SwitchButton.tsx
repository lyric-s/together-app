/**
 * @file SwitchButton.tsx
 * @description A reusable segmented control component that supports multiple visual variants (Mission/Auth).
 * It handles navigation routing by default but supports controlled mode via callbacks.
 */

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { styles, THEMES } from '@/styles/components/SwitchButton.styles';

/**
 * Available visual variants for the switch.
 */
export type SwitchVariant = 'mission' | 'auth';

/**
 * Props for the SwitchButton component.
 */
export interface SwitchButtonProps {
    /** The visual and contextual variant (default: 'mission'). */
    variant?: SwitchVariant;
    /** Current active value (controlled mode). */
    value?: string;
    /** Default active value if uncontrolled. */
    defaultValue?: string;
    /** Callback fired when a tab is selected. */
    onChange?: (tab: string) => void;
    /** Optional container style. */
    style?: StyleProp<ViewStyle>;
}

export default function SwitchButton({ 
    variant = 'mission', 
    value, 
    defaultValue, 
    onChange, 
    style 
}: SwitchButtonProps) {
    
    // Configuration: Labels, Routes, and Themes based on the selected variant
    const config = {
        mission: {
            left: 'Mission',
            right: 'Association',
            routes: { left: '/mission', right: '/association' },
            theme: THEMES.mission
        },
        auth: {
            left: 'Inscription',
            right: 'Connexion',
            routes: { left: '/signup', right: '/login' },
            theme: THEMES.auth
        }
    };

    const currentConfig = config[variant];
    const initialTab = defaultValue || currentConfig.left;
    const [internalActiveTab, setInternalActiveTab] = useState<string>(initialTab);
    const router = useRouter();

    // Determine the active tab (controlled vs internal state)
    const activeTab = value ?? internalActiveTab;

    /**
     * Handles the press event on a tab segment.
     * Updates local state and triggers navigation or callback.
     * * @param tabName - The label of the selected tab.
     * @param side - The position of the tab ('left' or 'right').
     */
    const handlePress = (tabName: string, side: 'left' | 'right') => {
        if (value === undefined) {
            setInternalActiveTab(tabName);
        }
        
        if (onChange) {
            onChange(tabName);
        } else {
            // @ts-ignore: suppressing strict route typing for generic implementation
            router.push(currentConfig.routes[side]);
        }
    };

    /**
     * Helper to determine text style based on active state.
     */
    const getTextStyle = (isActive: boolean) => ({
        color: isActive ? currentConfig.theme.activeText : currentConfig.theme.inactiveText,
        opacity: isActive ? 1 : 0.7,
    });

    /**
     * Helper to determine button style (including dynamic background color) based on active state.
     */
    const getButtonStyle = (isActive: boolean) => {
        if (!isActive) return styles.button;
        return [
            styles.button,
            styles.activeButton,
            { backgroundColor: currentConfig.theme.activeButton }
        ];
    };

    return (
        <View style={[styles.container, style]}>
            <View style={[styles.segmentedControl, { backgroundColor: currentConfig.theme.background }]}>
                
                {/* Left Button */}
                <TouchableOpacity
                    style={getButtonStyle(activeTab === currentConfig.left)}
                    onPress={() => handlePress(currentConfig.left, 'left')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.text, getTextStyle(activeTab === currentConfig.left)]}>
                        {currentConfig.left}
                    </Text>
                </TouchableOpacity>

                {/* Right Button */}
                <TouchableOpacity
                    style={getButtonStyle(activeTab === currentConfig.right)}
                    onPress={() => handlePress(currentConfig.right, 'right')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.text, getTextStyle(activeTab === currentConfig.right)]}>
                        {currentConfig.right}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}