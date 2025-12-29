import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { styles, THEMES } from '@/styles/components/SwitchButton.styles';

export type SwitchVariant = 'mission' | 'auth';

export interface SwitchButtonProps {
    variant?: SwitchVariant;
    value?: string;
    defaultValue?: string;
    onChange?: (tab: string) => void;
    style?: StyleProp<ViewStyle>;
}

export default function SwitchButton({ 
    variant = 'mission', 
    value, 
    defaultValue, 
    onChange, 
    style 
}: SwitchButtonProps) {
    
    // Configuration : Textes, Routes et Thèmes
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

    const activeTab = value ?? internalActiveTab;

    const handlePress = (tabName: string, side: 'left' | 'right') => {
        if (value === undefined) {
            setInternalActiveTab(tabName);
        }
        
        if (onChange) {
            onChange(tabName);
        } else {
            // @ts-ignore
            router.push(currentConfig.routes[side]);
        }
    };

    // Helper pour la couleur du texte
    const getTextStyle = (isActive: boolean) => ({
        color: isActive ? currentConfig.theme.activeText : currentConfig.theme.inactiveText,
        opacity: isActive ? 1 : 0.7,
    });

    // Helper pour le style du bouton actif (couleur dynamique)
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
                
                {/* Bouton Gauche */}
                <TouchableOpacity
                    style={getButtonStyle(activeTab === currentConfig.left)}
                    onPress={() => handlePress(currentConfig.left, 'left')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.text, getTextStyle(activeTab === currentConfig.left)]}>
                        {currentConfig.left}
                    </Text>
                </TouchableOpacity>

                {/* Bouton Droit */}
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