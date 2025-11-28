import React from 'react';
import {  View } from 'react-native';
import Cross from '@/components/Cross';
import MissionAdminAssosCard from '@/components/MissionAdminAssosCard';

export default function Connexion() {
    return (
        <View style={{ flex: 1 ,flexDirection: "row",     // aligne horizontalement
    flexWrap: "wrap",}}>
            <MissionAdminAssosCard
            mission_title='mission a la croix '
            association_name="Croix Rouge"
            date={new Date()}
            image={require("../assets/images/waste.png")}
            onPressDetail={() => console.log("Voir détail")}
            />
            <MissionAdminAssosCard
            mission_title='mission a la croix '
            association_name="Croix Rouge"
            date={new Date()}
            image={require("../assets/images/waste.png")}
            onPressDetail={() => console.log("Voir détail")}
            />
        </View>
    );
}
