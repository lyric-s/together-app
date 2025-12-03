import { View } from 'react-native';
import MissionVolunteerCard from '@/components/MissionVolunteerCard';

export default function Index() {

    return (
        <View style={{ flex: 1 ,flexDirection: "row",     // aligne horizontalement
        flexWrap: "wrap", alignItems: 'center'}}>
            <MissionVolunteerCard
            mission_title="Nettoyage de la plage"
            association_name="Ocean Protect"
            city="Marseille"
            date={new Date("2025-04-23T09:00:00")}
            number_max_volunteers={20}
            number_of_volunteers={7}
            favorite={false}
            category_label="Nature"
            category_color="red"
            image={require("../assets/images/dogs_img.png")}
            onPressMission={() => console.log("Mission 1 clicked")}
            onPressFavorite={(fav) => console.log("Favorite 1:", fav)}
        />

        </View>
    );
}
