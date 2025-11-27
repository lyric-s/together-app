import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Colors } from "../constants/colors";
import CategoryLabel from "./CategoryLabel";
import { styles } from "../styles/components/MissionVolunteerCardStyle"



interface MissionCardProps {
  mission_title: string;
  association_name: string;
  city?: string;
  date: Date;
  number_max_volunteers: number;
  number_of_volunteers: number;
  onPressMission: () => void;
  favorite?: boolean;
  onPressFavorite?: (newFavoriteValue: boolean) => void;
  category_label: string;
  category_color: string;
  image: any; // require(...)
}

/**
 * Renders a touchable mission card with image, category badge, optional favorite toggle, mission details, and volunteer counts.
 *
 * Displays the provided image with an overlaid category label and an optional heart button that toggles local favorite state and calls the provided callback. Shows title, association name, date (formatted for "fr-FR" and includes time when hours ≠ 0), optional city, and current/maximum volunteers.
 *
 * @param mission_title - Mission title shown as the card heading
 * @param association_name - Name of the association or organizer
 * @param city - Optional city name; rendered only when provided
 * @param date - Date of the mission; formatted using the "fr-FR" locale (date plus time if hours ≠ 0)
 * @param number_max_volunteers - Maximum number of volunteers for the mission
 * @param number_of_volunteers - Current number of volunteers signed up
 * @param onPressMission - Callback invoked when the card is pressed
 * @param favorite - Initial favorite state for the heart toggle (defaults to false)
 * @param onPressFavorite - Optional callback invoked with the new favorite value when the heart is toggled
 * @param category_label - Text shown inside the category badge
 * @param category_color - Background color passed to the category badge component
 * @param image - Image source displayed at the top of the card
 * @returns The rendered mission card component
 */
export default function MissionVolunteerCard({
  mission_title,
  association_name,
  city,
  date,
  number_max_volunteers,
  number_of_volunteers,
  onPressMission,
  favorite = false,
  onPressFavorite,
  category_label,
  category_color,
  image,
}: MissionCardProps) {
  
  const [isFavorite, setIsFavorite] = useState(favorite);

  const toggleFavorite = () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);

    if (onPressFavorite) {
        onPressFavorite(newValue);
    }
  };


  // date format → jj/mm/aaaa hh:mm
  const formattedDate =
    date.toLocaleDateString("fr-FR") +
    (date.getHours() !== 0 ? ` à ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}` : "");

  return (
    <TouchableOpacity style={styles.card} onPress={onPressMission}>
      
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />

        {/* Category label */}
        <TouchableOpacity style={styles.categoryLabel}>
          <CategoryLabel
            text = {category_label}
            backgroundColor = {category_color}
          />
        </TouchableOpacity>

        {/* Heart  (optional) */}
        { favorite !== undefined && onPressFavorite && (
            <TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
                <Image
                    source={
                    isFavorite
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
        <Text style={styles.title}>{mission_title}</Text>
        <Text style={styles.association}>{association_name}</Text>
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
          {number_of_volunteers}/{number_max_volunteers}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// How to use
{/* <MissionVolunteerCard
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
      /> */}