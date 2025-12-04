import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TabItem = {
    id: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconOutline: keyof typeof Ionicons.glyphMap;
};

export default function BottomNavBar() {
    const [activeTab, setActiveTab] = useState<string>('home');

    const tabs: TabItem[] = [
        { id: 'home', iconName: 'home', iconOutline: 'home-outline' },
        { id: 'search', iconName: 'search', iconOutline: 'search-outline' },
        { id: 'library', iconName: 'book', iconOutline: 'book-outline' },
        { id: 'profile', iconName: 'person', iconOutline: 'person-outline' },
    ];

    return (
        <View style={styles.container}>

            <View style={styles.navBar}>

                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <TouchableOpacity
                            key={tab.id}
                            style={styles.tabButton}
                            onPress={() => setActiveTab(tab.id)}
                            activeOpacity={0.7}
                        >
                            {isActive && <View style={styles.activeIndicator} />}

                            <Ionicons
                                name={isActive ? tab.iconName : tab.iconOutline}
                                size={28}
                                color="#F97316"
                            />
                        </TouchableOpacity>
                    );
                })}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#E5E5E5',
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 80,
        paddingBottom: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    activeIndicator: {
        position: 'absolute',
        top: 0,
        width: 40,
        height: 4,
        backgroundColor: '#F97316',
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
});