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
/**
 * Renders an admin/association mission card.
 *
 * This card is used in the admin/association dashboard to display mission information.
 * It shows:
 *  - A fixed-size header image
 *  - The mission title
 *  - The association name
 *  - The mission date (formatted with the "fr-FR" locale)
 *  - A bottom-right "Voir détail" button
 *
 * The card is responsive and intended to be used inside a parent container
 * with horizontal layout (row + wrap) so that multiple cards can appear side by side.
 *
 * @param mission_title        Title of the mission.
 * @param association_name     Name of the association.
 * @param date                 Mission date. The time part is shown only if hour !== 0.
 * @param image                Image displayed at the top of the card (require(...)).
 * @param onPressDetail        Callback executed when the "Voir détail" button is pressed.
 *
 * @returns A styled mission card component dedicated to admin/association interfaces.
 */
export default function MissionAdminAssosCard({
    mission_title,
    association_name,
    date,
    image,
    onPressDetail,
}: MissionAdminAssosCardProps) {

    const formattedDate =
        date.toLocaleDateString("fr-FR") +
        (date.getHours() !== 0 || date.getMinutes() !== 0
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
