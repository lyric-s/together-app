import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ORANGE_LIGHT = '#FFE4C4';
const ORANGE_DARK = 'black';

type ActiveTab = 'Mission' | 'Association';

export default function SegmentedControl() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('Mission');

    return (
        <View style={styles.container}>
            <View style={styles.segmentedControl}>

                <TouchableOpacity
                    style={[
                        styles.button,
                        activeTab === 'Mission' && styles.activeButton
                    ]}
                    onPress={() => setActiveTab('Mission')}
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
                    onPress={() => setActiveTab('Association')}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: ORANGE_LIGHT,
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
        backgroundColor: ORANGE_LIGHT,
    },
    activeButton: {
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    activeText: {
        color: ORANGE_DARK,
    },
    inactiveText: {
        color: ORANGE_DARK,
        opacity: 0.7,
    }
});