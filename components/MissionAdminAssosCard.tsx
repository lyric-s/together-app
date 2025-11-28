import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/components/MissionAdminAssosCardStyle";

interface MissionAdminAssosCardProps {
    mission_title: string;
    association_name: string;
    date: Date;
    image: any; // require(...)
    onPressDetail: () => void;
}

export default function MissionAdminAssosCard({
    mission_title,
    association_name,
    date,
    image,
    onPressDetail,
}: MissionAdminAssosCardProps) {

    const formattedDate =
        date.toLocaleDateString("fr-FR") +
        (date.getHours() !== 0
            ? ` à ${date.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
            })}`
            : "");

    return (
        <View style={styles.card}>
            
            {/* Image */}
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
            </View>

            {/* Texte + bouton alignés */}
            <View style={styles.bottomRow}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{mission_title}</Text>
                    <Text style={styles.association}>{association_name}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>

                {/* Bouton "Voir détail" */}
                <TouchableOpacity style={styles.detailButton} onPress={onPressDetail}>
                    <Text style={styles.detailButtonText}>Voir détail</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
