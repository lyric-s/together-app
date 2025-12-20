import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

import BackButton from "@/components/BackButton";
import ButtonAuth from "@/components/Button";
import CategoryLabel from "@/components/CategoryLabel";
import { Colors } from "@/constants/colors";
import { styles } from "@/styles/pages/JoinMissionPageStyle";

type Mission = {
  title: string;
  category: string;
  categoryColor: string;
  image: ImageSourcePropType;
  associationName: string;
  dateStart: Date;
  dateEnd: Date;
  location: string;
  description: string;
  volunteersJoined: number;
  volunteersMax: number;
};

export default function JoinMissionPage() {
  const [isFavorite, setIsFavorite] = useState(false);

  // ---- MOCK MISSION DATA ----
  const mission: Mission = {
    title: "Collecte alimentaire",
    category: "Solidarité",
    categoryColor: Colors.orange,
    image: require("@/assets/images/dogs_img.png"),
    associationName: "Restos du Cœur",
    dateStart: new Date("2025-11-12T15:00:00"),
    dateEnd: new Date("2025-11-12T17:00:00"),
    location: "Paris 12e",
    description:
      "Participez à une collecte alimentaire pour aider les familles dans le besoin.",
    volunteersJoined: 5,
    volunteersMax: 10,
  };

  // ---- HELPERS ----
  const formatDateRange = (start: Date, end: Date) => {
    const date = start.toLocaleDateString("fr-FR");
    const startHour = start.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endHour = end.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${date} de ${startHour} à ${endHour}`;
  };

  // ---- HANDLERS ----
  const handleJoinMission = () => {
    // TODO: join mission
  };

  const toggleFavorite = () => {
    // TODO: add/remove mission from favorites
    setIsFavorite((prev) => !prev);
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <BackButton name_page="" />
        <Text style={styles.headerTitle}>{mission.title}</Text>
      </View>

      {/* MISSION IMAGE */}
      <Image source={mission.image} style={styles.missionImage} />

      {/* CATEGORY */}
      <View style={styles.row}>
        <Text style={styles.label}>Catégorie :</Text>
        <CategoryLabel
          text={mission.category}
          backgroundColor={mission.categoryColor}
        />
      </View>

      {/* VOLUNTEERS */}
      <View style={styles.row}>
        <Text style={styles.label}>Nombre de bénévoles :</Text>
        <View style={styles.volunteerRow}>
          <Text style={styles.volunteerText}>
            {mission.volunteersJoined} / {mission.volunteersMax}
          </Text>
          <Image
            source={require("@/assets/images/people.png")}
            style={styles.peopleIcon}
          />
        </View>
      </View>

      {/* BOTTOM CARD */}
      <View style={styles.bottomCard}>
        <Text style={styles.associationName}>
          {mission.associationName}
        </Text>

        <Text style={styles.date}>
          {formatDateRange(mission.dateStart, mission.dateEnd)}
        </Text>

        <Text style={styles.location}>{mission.location}</Text>

        <Text style={styles.description}>{mission.description}</Text>

        {/* ACTIONS */}
        <View style={styles.actionsRow}>
          <ButtonAuth
            text="Rejoindre la mission"
            onPress={handleJoinMission}
          />

          <TouchableOpacity onPress={toggleFavorite}>
            <Image
              source={
                isFavorite
                  ? require("@/assets/images/red_heart.png")
                  : require("@/assets/images/gray_heart.png")
              }
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
