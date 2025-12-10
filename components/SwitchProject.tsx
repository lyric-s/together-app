import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';

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

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: Colors.lightOrange,
        borderRadius: 100,
        padding: 4,
        width: 300,
        height: 50,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: Colors.lightOrange,
    },
    activeButton: {
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    activeText: {
        color: Colors.black,
    },
    inactiveText: {
        color: Colors.black,
        opacity: 0.7,
    }
});