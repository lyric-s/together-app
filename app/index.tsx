/**
 * @file index.tsx
 * @description Root entry point for the application's home screen. 
 * This file defines the layout structure, featuring a centered navigation component.
 */

import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MissionVolunteerCard from '@/components/MissionVolunteerCard';
import Footer from '@/components/Footer';


/**
 * Renders the home screen layout that vertically centers the bottom navigation bar between two flexible spacer sections.
 *
 * The layout is wrapped in a SafeAreaView so content respects device safe areas.
 *
 * @returns The JSX element for the home screen layout.
 */
export default function Index() {
    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* Main container wrapped in SafeAreaView to handle device notches/safe areas */}
            <ScrollView style={styles.mainContainer}>

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

                <Footer 
                    isAuthenticated={true}
                />

            </ScrollView>
            
        </SafeAreaView>
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
        width: '100%',
        alignItems: 'center', 
    },
   
    text: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
    }
});