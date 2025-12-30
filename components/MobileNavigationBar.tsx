import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname, RelativePathString } from 'expo-router';
import { styles } from '@/styles/components/MobileNavigationBarStyles';
import {Colors} from "@/constants/colors"

/**
 * Type definition for a bottom navigation tab.
 *
 * @typedef TabItem
 * @property {string} id - Unique identifier for the tab.
 * @property {string} route - Route path associated with the tab.
 * @property {keyof typeof Ionicons.glyphMap} iconName - Icon displayed when the tab is active.
 * @property {keyof typeof Ionicons.glyphMap} iconOutline - Icon displayed when the tab is inactive.
 */
type TabItem = {
  id: string;
  route: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
};

/**
 * BottomNavBar component.
 *
 * Displays a fixed bottom navigation bar with multiple tabs.
 * The active tab is automatically highlighted based on the current route.
 * Pressing a tab triggers navigation to the associated route.
 *
 * @component
 * @returns {JSX.Element} The rendered bottom navigation bar.
 */
const BottomNavBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs: TabItem[] = [
    { id: 'home', route: '/', iconName: 'home', iconOutline: 'home-outline' },
    { id: 'search', route: '/join_mission', iconName: 'search', iconOutline: 'search-outline' },
    { id: 'library', route: '/annonces', iconName: 'book', iconOutline: 'book-outline' },
    { id: 'profile', route: '/profil', iconName: 'person', iconOutline: 'person-outline' },
  ];

  return (
    <View style={styles.navBar}>
      {tabs.map((tab) => {
        const isActive = tab.route === '/' 
          ? pathname === '/' 
          : pathname.startsWith(tab.route);
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() => router.push(tab.route as RelativePathString)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={ "Go to ${tab.id}"} 
            accessibilityState={{ selected: isActive }}
          >
            {isActive && <View style={styles.activeIndicator} />}

            <Ionicons
              name={isActive ? tab.iconName : tab.iconOutline}
              size={28}
              color={isActive ? Colors.brightOrange : Colors.black}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavBar;
