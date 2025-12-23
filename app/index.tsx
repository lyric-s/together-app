/**
 * @file index.tsx
 * @description Root home page of the application.
 * This file defines the base structure (Layout) of the main screen,
 * integrating the system safe area and the navigation bar.
 */

import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router'; // Added to manage screen-specific options
import BottomNavBar from '@/components/MobileNavigationBar';

/**
 * Application Main Screen (Index).
 * @description
 * This component acts as a "shell". It uses `SafeAreaView` to 
 * ensure that content is not hidden by notches on iPhone
 * or status bars on Android.
 * @component
 * @returns {JSX.Element} The main view of the application.
 */
export default function Index() {
    return (
        <>
            {/* Stack.Screen allows declarative configuration of the navigation header.
                Setting headerShown to false hides the default top navigation bar.
            */}
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.mainContainer}>

                {/* SafeAreaView is crucial here so that the top padding 
                    is automatically managed according to the device.
                */}
                <SafeAreaView style={styles.contentContainer}>
                    {/* NOTE: Home-specific content components 
                        should be imported and placed here. 
                    */}
                </SafeAreaView>

                {/* Fixed positioning at the bottom of the screen thanks to the mainContainer Flex structure */}
                <BottomNavBar />

            </View>
        </>
    );
}

/**
 * Static navigation options configuration.
 * @constant options
 * @description 
 * These options are read by Expo Router to configure the parent Stack Navigator.
 * - `headerShown: false` allows using our own header design or omitting it.
 */
(Index as any).options = {
    headerShown: false,
};

/**
 * Local styles for the Index screen.
 * @constant styles
 * @property {ViewStyle} mainContainer - Root container occupying 100% of the height.
 * @property {ViewStyle} contentContainer - Dedicated space for scrollable or interactive content.
 * The `paddingBottom: 80` ensures that even content at the very bottom is not 
 * covered by the BottomNavBar (which is 60px high).
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 80, // Safety margin to avoid overlapping with the bar
    }
});