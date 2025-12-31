/**
 * @file index.tsx
 * @description Root entry point for the application's home screen. 
 * This file defines the layout structure, featuring a centered navigation component.
 */

import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '@/components/MobileNavigationBar';

/**
 * The Index component serves as the primary view for the home screen.
 * It utilizes a flexbox layout to vertically center the navigation bar
 * between two empty expandable sections.
 * * @returns {JSX.Element} The rendered Home Screen component.
 */
export default function Index() {
    return (
        <>

            {/* Main container wrapped in SafeAreaView to handle device notches/safe areas */}
            <SafeAreaView style={styles.mainContainer}>
                
                {/* Top expandable section providing vertical spacing */}
                <View style={styles.topSection}>
                </View>

                {/* Central section where the navigation component is positioned */}
                <View style={styles.centerSection}>
                    <BottomNavBar />
                </View>

                {/* Bottom expandable section providing vertical spacing */}
                <View style={styles.bottomSection}>
                </View>

            </SafeAreaView>
        </>
    );
}

/**
 * StyleSheet for the Index component.
 * Uses Flexbox to distribute space and center the UI elements.
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    topSection: {
        flex: 1, // Occupies the top half of the available space
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerSection: {
        // Wraps the component without flexible expansion to maintain its natural height
        width: '100%',
        alignItems: 'center', 
    },
    bottomSection: {
        flex: 1, // Occupies the bottom half of the available space
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
    }
});