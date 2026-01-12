import { View, Text, TouchableOpacity, Image, Platform, StyleSheet } from "react-native";
import CategoryLabel from "./CategoryLabel";
import { styles } from "../styles/components/MissionVolunteerCardHorizontalStyle"
import { Mission } from "@/models/mission.model";
import { Colors } from "@/constants/colors";
import { formatMissionDate } from "@/utils/date.utils";

interface MissionCardProps {
  mission: Mission;
  onPressMission: () => void;
  onPressFavorite?: () => void;
  isFavorite?: boolean;
}

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
    <TouchableOpacity
      style={[
        styles.card,
        {
          width: isWeb ? '95%' : '95%',
          alignSelf: 'center',
          flexShrink: 0,
          marginBottom: 5
        }
      ]}
      onPress={onPressMission}
      activeOpacity={0.8}
    >

      <View style={styles.leftContainer}>
        <Image source={imageSource} style={styles.image} />

        <View style={styles.categoryLabelOverlay}>
          <CategoryLabel
            text={categoryLabel}
            backgroundColor={categoryColor}
          />
        </View>

        {onPressFavorite && (
          <TouchableOpacity style={styles.heartButtonOverlay} onPress={onPressFavorite} activeOpacity={0.7}>
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

      <View style={styles.rightContainer}>
        <View style={styles.contentTop}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{mission.name}</Text>
          <Text style={styles.association} numberOfLines={1} ellipsizeMode="tail">{assoName}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
          {mission_location && <Text style={styles.city} numberOfLines={1} ellipsizeMode="tail">{mission_location}</Text>}
        </View>

        <View style={styles.peopleContainer}>
          <Text style={styles.peopleText}>
            {mission.capacity_min} / {mission.capacity_max}
          </Text>
          <Image
            source={require("../assets/images/people.png")}
            style={styles.peopleIcon}
            resizeMode="contain"
          />
        </View>
      </View>

    </TouchableOpacity>
  );
}