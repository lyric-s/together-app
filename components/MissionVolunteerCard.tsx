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
