/**
 * @file SwitchButton.tsx
 * @description Composant de navigation segmenté supportant plusieurs variantes visuelles (Mission/Auth).
 */

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { styles, THEMES } from '@/styles/components/SwitchButton.styles';

/**
 * Types de variantes disponibles.
 */
export type SwitchVariant = 'mission' | 'auth';

export interface SwitchButtonProps {
    /** La variante visuelle et contextuelle (défaut: 'mission') */
    variant?: SwitchVariant;
    /** Valeur active actuelle (mode contrôlé) */
    value?: string;
    /** Valeur par défaut si non contrôlé */
    defaultValue?: string;
    /** Callback au changement d'onglet */
    onChange?: (tab: string) => void;
    /** Style conteneur optionnel */
    style?: StyleProp<ViewStyle>;
}

export default function SwitchButton({ 
    variant = 'mission', 
    value, 
    defaultValue, 
    onChange, 
    style 
}: SwitchButtonProps) {
    
    // Configuration des labels et routes selon la variante
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
            routes: { left: '/signup', right: '/login' }, // Routes hypothétiques
            theme: THEMES.auth
        }
    };

    const currentConfig = config[variant];
    
    // Définir la valeur par défaut basée sur la config si non fournie
    const initialTab = defaultValue || currentConfig.left;

    const [internalActiveTab, setInternalActiveTab] = useState<string>(initialTab);
    const router = useRouter();

    const activeTab = value ?? internalActiveTab;

    const handlePress = (tabName: string, side: 'left' | 'right') => {
        if (value === undefined) {
            setInternalActiveTab(tabName);
        }
        
        // Appelle le callback parent s'il existe
        if (onChange) {
            onChange(tabName);
        } else {
            // Comportement par défaut : navigation automatique si pas de onChange fourni
            const route = currentConfig.routes[side];
            // @ts-ignore : router.push attend des chaînes typées spécifiques selon la config Expo, ici on reste générique
            router.push(route);
        }
    };

    // Helper pour le rendu du style conditionnel
    const getTextStyle = (isActive: boolean) => ({
        color: isActive ? currentConfig.theme.activeText : currentConfig.theme.inactiveText,
        opacity: isActive ? 1 : 0.7,
    });

    return (
        <View style={[styles.container, style]}>
            <View style={[styles.segmentedControl, { backgroundColor: currentConfig.theme.background }]}>
                
                {/* Bouton Gauche */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeTab === currentConfig.left && styles.activeButton
                    ]}
                    onPress={() => handlePress(currentConfig.left, 'left')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.text, getTextStyle(activeTab === currentConfig.left)]}>
                        {currentConfig.left}
                    </Text>
                </TouchableOpacity>

                {/* Bouton Droit */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeTab === currentConfig.right && styles.activeButton
                    ]}
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