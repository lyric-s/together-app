import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import BottomNavBar from '@/components/MobileNavigationBar';
import ButtonAuth from '@/components/Button';
import MissionVolunteerCard from '@/components/MissionVolunteerCard';

/**
 * Renders the home screen layout that vertically centers the bottom navigation bar between two flexible spacer sections.
 *
 * The layout is wrapped in a SafeAreaView so content respects device safe areas.
 *
 * @returns The JSX element for the home screen layout.
 */
export default function Index() {
    return (
        <>

            {/* Main container wrapped in SafeAreaView to handle device notches/safe areas */}
            <SafeAreaView style={styles.mainContainer}>

                {/* Central section where the navigation component is positioned */}
                <View style={styles.centerSection}>
                    <MissionVolunteerCard
                        mission_title="Donner des repas"
                        association_name="Croix Rouge"
                        date={new Date()}
                        number_of_volunteers={3}
                        number_max_volunteers={10}
                        category_label="Social"
                        category_color="orange"
                        favorite={false}
                        onPressMission={() => console.log("MISSION")}
                        onPressFavorite={(fav) => console.log("Favorite :", fav)}
                        
                    />
                </View>
                <ButtonAuth
                    text="Rejoindre la mission"
                    onPress={() => router.push(("/join_mission") as any )}
                  />
                <BottomNavBar />

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
  
    centerSection: {
        // Wraps the component without flexible expansion to maintain its natural height
        flex: 1,
        alignItems: 'center', 
    },
   
    text: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
    }
});
