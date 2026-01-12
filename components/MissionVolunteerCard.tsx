import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import CategoryLabel from "./CategoryLabel";
import { styles } from "../styles/components/MissionVolunteerCardStyle"
import { Mission } from "@/models/mission.model";
import { Colors } from "@/constants/colors";
import { formatMissionDate } from "@/utils/date.utils";

interface MissionCardProps {
  mission: Mission; 
  onPressMission: () => void;
  onPressFavorite?: () => void;
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

  const isWeb = Platform.OS === 'web';
  const defaultImage = require("../assets/images/volunteering_img.jpg");
  const imageSource = mission.image_url 
    ? { uri: mission.image_url } 
    : defaultImage;
  
  const formattedDate = formatMissionDate(mission.date_start);

  const assoName = mission.association?.name || "Association inconnue";
  const categoryLabel = mission.category?.label || "Général";
  const categoryColor = Colors.orange;

  const locationParts = [mission.location?.zip_code, mission.location?.country].filter(Boolean);
  const mission_location = locationParts.length > 0 
  ? locationParts.join(', ') 
  : "Lieu non précisé";

  return (
    <TouchableOpacity style={[styles.card, { alignSelf: isWeb ? 'center' : 'auto',}]} onPress={onPressMission}>
      
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
            <TouchableOpacity style={styles.heartButton} onPress={onPressFavorite} activeOpacity={0.7}>
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

      <View style={styles.content}>
        <Text style={styles.title}>{mission.name}</Text>
        <Text style={styles.association}>{assoName}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.city}>{mission_location}</Text>
      </View>

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