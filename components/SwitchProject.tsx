import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Import du router
import { styles } from '@/styles/components/SwitchProject.styles';

type ActiveTab = 'Mission' | 'Association';

export interface SwitchProjectProps {
    value?: ActiveTab;
    defaultValue?: ActiveTab;
    onChange?: (tab: ActiveTab) => void;
    style?: StyleProp<ViewStyle>;
}

/**
 * @component SwitchProject
 * Switch à deux onglets (Mission/Association) avec navigation intégrée.
 */
export default function SwitchProject({ value, defaultValue = 'Mission', onChange, style }: SwitchProjectProps) {
    const [internalActiveTab, setInternalActiveTab] = useState<ActiveTab>(defaultValue);
    const router = useRouter();

    const activeTab = value ?? internalActiveTab;

    const handlePress = (tab: ActiveTab) => {
        // 1. Mise à jour de l'état (visuel)
        if (value === undefined) {
            setInternalActiveTab(tab);
        }
        onChange?.(tab);

        // 2. Gestion de la navigation (Redirections)
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

                <TouchableOpacity
                    style={[
                        styles.button,
                        activeTab === 'Mission' && styles.activeButton
                    ]}
                    onPress={() => handlePress('Mission')}
                    activeOpacity={0.8}
                >
                    <Text
                        style={[
                            styles.text,
                            activeTab === 'Mission' ? styles.activeText : styles.inactiveText
                        ]}
                    >
                        Mission
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.button,
                        activeTab === 'Association' && styles.activeButton
                    ]}
                    onPress={() => handlePress('Association')}
                    activeOpacity={0.8}
                >
                    <Text
                        style={[
                            styles.text,
                            activeTab === 'Association' ? styles.activeText : styles.inactiveText
                        ]}
                    >
                        Association
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}