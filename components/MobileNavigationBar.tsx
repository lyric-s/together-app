import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/components/MobileNavigationBarStyles';

type TabItem = {
    id: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconOutline: keyof typeof Ionicons.glyphMap;
};

const BottomNavBar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('home');

    const tabs: TabItem[] = [
        { id: 'home', iconName: 'home', iconOutline: 'home-outline' },
        { id: 'search', iconName: 'search', iconOutline: 'search-outline' },
        { id: 'library', iconName: 'book', iconOutline: 'book-outline' },
        { id: 'profile', iconName: 'person', iconOutline: 'person-outline' },
    ];

    return (
        <View style={styles.navBar}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <TouchableOpacity
                        key={tab.id}
                        style={styles.tabButton}
                        onPress={() => setActiveTab(tab.id)}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel={`${tab.id} tab`}
                        accessibilityState={{ selected: isActive }}
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
    );
}
export default BottomNavBar;