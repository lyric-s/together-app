import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import CategoryLabel from "./CategoryLabel";
import { styles } from "../styles/components/MissionVolunteerCardStyle"
import { Mission } from "@/models/mission.model";
import { Colors } from "@/constants/colors";

interface MissionCardProps {
  mission: Mission; 
  onPressMission: () => void;
  onPressFavorite?: (missionId: number, newFavoriteValue: boolean) => void;
  isFavorite?: boolean;
}

/**
 * Renders a touchable mission card with image, category badge, optional favorite toggle, mission details, and volunteer counts.
 *
 * Displays the provided image with an overlaid category label and an optional heart button that toggles local favorite state and calls the provided callback. Shows title, association name, date (formatted for "fr-FR" and includes time when hours ≠ 0), optional city, and current/maximum volunteers.
 */

export default function MissionVolunteerCard({
  mission,
  onPressMission,
  isFavorite = false,
  onPressFavorite,
}: MissionCardProps) {

  const defaultImage = require("../assets/images/volunteering_img.jpg");
  const imageSource = mission.image_url 
    ? { uri: mission.image_url } 
    : defaultImage;

  const [favoriteState, setFavoriteState] = useState(isFavorite);
  
  useEffect(() => {
    setFavoriteState(isFavorite);
  }, [isFavorite]);

  const toggleFavorite = () => {
    if (!onPressFavorite) return;

    const newValue = !favoriteState;
    setFavoriteState(newValue);
    onPressFavorite(mission.id_mission, newValue);
  };

  // date format → jj/mm/aaaa hh:mm
  const dateObj = new Date(mission.date_start);
  const isValidDate = !isNaN(dateObj.getTime());
  const formattedDate =
    isValidDate ?
    dateObj.toLocaleDateString("fr-FR") +
    (dateObj.getHours() !== 0 || dateObj.getMinutes() !== 0 
      ? ` à ${dateObj.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}` 
      : ""
    ) : "Date non disponible";

  const assoName = mission.association?.name || "Association inconnue";
  const city = mission.location?.zip_code || "";
  const categoryLabel = mission.category?.label || "Général";
  const categoryColor = Colors.orange;

  return (
    <TouchableOpacity style={styles.card} onPress={onPressMission}>
      
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />

        {/* Category label */}
        <View style={styles.categoryLabel}>
          <CategoryLabel
            text={categoryLabel}
            backgroundColor={categoryColor}
          />
        </View>

        {/* Heart  (optional) */}
        {onPressFavorite && (
            <TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
                <Image
                    source={
                        favoriteState
                            ? require("../assets/images/red_heart.png")
                            : require("../assets/images/gray_heart.png")
                    }
                    style={styles.heartIcon}
                />
            </TouchableOpacity>
        )}
      </View>

      {/* Text */}
      <View style={styles.content}>
        <Text style={styles.title}>{mission.name}</Text>
        <Text style={styles.association}>{assoName}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        {city && <Text style={styles.city}>{city}</Text>}
      </View>

      {/* Number of ppl */}
      <View style={styles.peopleContainer}>
        <Image
          source={require("../assets/images/people.png")}
          style={styles.peopleIcon}
        />
        <Text style={styles.peopleText}>
          {mission.capacity_min} / {mission.capacity_max}
        </Text>
      </View>
    </TouchableOpacity>
  );
}