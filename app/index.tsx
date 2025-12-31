import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RelativePathString, router, Stack } from 'expo-router';
import BottomNavBar from '@/components/MobileNavigationBar';
import ButtonAuth from '@/components/Button';

/**
 * The Index component serves as the primary view for the home screen.
 * It utilizes a flexbox layout to vertically center the navigation bar
 * between two empty expandable sections.
 * * @returns {JSX.Element} The rendered Home Screen component.
 */
export default function Index() {
    return (
        <>
            {/* Configure screen options to hide the default header */}
            <Stack.Screen options={{ headerShown: false }} />

            {/* Main container wrapped in SafeAreaView to handle device notches/safe areas */}
            <SafeAreaView style={styles.mainContainer}>
                

                {/* Central section where the navigation component is positioned */}
                <View style={styles.centerSection}>
                    <ButtonAuth text="Modifier Profil" onPress={
                        () => router.push("/profil/profil_modification" as RelativePathString)}/>
                </View>

                <BottomNavBar />

            </SafeAreaView>
        </>
    );
}

/**
 * Static navigation options for the Index route.
 */
(Index as any).options = {
    headerShown: false,
};

/**
 * StyleSheet for the Index component.
 * Uses Flexbox to distribute space and center the UI elements.
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
   
    centerSection: {
        flex: 1,
        alignItems: 'center', 
    },
    
    text: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
    }
});