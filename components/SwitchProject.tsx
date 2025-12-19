import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { styles} from '@/styles/components/SwitchProject.styles';

type ActiveTab = 'Mission' | 'Association';

/**
 * @interface SwitchProjectProps
 * Définit les props pour le composant SwitchProject, permettant
 * un comportement contrôlé ou non contrôlé (value/defaultValue).
 */
export interface SwitchProjectProps {
    value?: ActiveTab;
    defaultValue?: ActiveTab;
    onChange?: (tab: ActiveTab) => void;
    style?: StyleProp<ViewStyle>;
}

/**
 * @component SwitchProject
 * Switch à deux onglets (Mission/Association).
 */
export default function SwitchProject({ value, defaultValue = 'Mission', onChange, style }: SwitchProjectProps) {
    const [internalActiveTab, setInternalActiveTab] = useState<ActiveTab>(defaultValue);

    const activeTab = value ?? internalActiveTab;

    const handlePress = (tab: ActiveTab) => {
        if (value === undefined) {
            setInternalActiveTab(tab);
        }
        onChange?.(tab);
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