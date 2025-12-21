import React from 'react';
import { View, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '@/components/MobileNavigationBar';

/**
 * Screen component that renders a padded safe content area and a bottom navigation bar.
 *
 * The component provides the screen layout: a full-height container with a SafeAreaView
 * for page content and a persistent BottomNavBar at the bottom.
 *
 * @returns The root React element for this screen containing the safe content area and the bottom navigation bar.
 */
export default function Index() {

    return (
        <View style={styles.mainContainer}>

            <SafeAreaView style={styles.contentContainer}>
            </SafeAreaView>

            <BottomNavBar />

        </View>
    );
}

(Index as any).options = {
    headerShown: false,
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 80,
    }
});