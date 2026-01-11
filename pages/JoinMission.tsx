/**
 * @file JoinMissionPage.tsx
 * @description Mission details page (Guest and Volunteer compatible)
 */
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Href, router, useLocalSearchParams } from 'expo-router';
import BackButton from "@/components/BackButton";
import ButtonAuth from "@/components/Button";
import CategoryLabel from "@/components/CategoryLabel";
import { styles } from "@/styles/pages/JoinMissionStyle";
import { isMissionFinished } from '@/utils/mission.utils';
import { volunteerService } from '@/services/volunteerService';
import { missionService } from '@/services/missionService';
import { useAuth } from "@/context/AuthContext"; 
import { Mission } from "@/models/mission.model";
import { Colors } from "@/constants/colors";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AlertToast from "@/components/AlertToast";

export default function JoinMissionPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isSmallScreenWeb = isWeb && width < 900;
  const { userType } = useAuth();

  const insets = useSafeAreaInsets();

  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  const [error, setError] = useState(false);

  // FETCH MISSION
  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      setMission(null);
      return;
    }
    const numericId = Number(id);
   if (isNaN(numericId)) {
      setError(true);
      setLoading(false);
      setMission(null);
      return;
   }
    const fetchMission = async () => {
      setLoading(true);
      setError(false);
      setMission(null);
      try {
        const data = await missionService.getById(numericId);
        if (!data) throw new Error('Mission not found');
        setMission(data);
        if (userType === 'volunteer') {
          const favorites = await volunteerService.getFavorites();
          const isAlreadyFavorite = favorites.some(fav => fav.id_mission === numericId);
          setIsFavorite(isAlreadyFavorite);
        }
      } catch (e) {
        console.error("Erreur chargement mission:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMission();
  }, [id, userType]);

  const showToast = useCallback((title: string, message: string) => {
    setToast({ visible: true, title, message });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.orange} />
      </View>
    );
  }

  if (!mission) {
    return (
        <View>
            <View style={[
                styles.header,
                isSmallScreenWeb && { paddingLeft: 70 },
                isWeb && { paddingTop: 25 }
            ]}>
                <BackButton name_page="Retour" />
            </View>
            <View>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>{error ? "Erreur lors du chargement. Réessayez." : "Mission introuvable"}</Text>
            </View>
        </View>
    );
  }

  const finished = isMissionFinished(mission);
  const mission_category = mission.category?.label || "Général";
  const mission_category_color = Colors.orange; 
  const locationParts = [mission.location?.zip_code, mission.location?.country].filter(Boolean);
  const mission_location = locationParts.length > 0 
  ? locationParts.join(', ') 
  : "Lieu non précisé";

  const formatDateRange = (startStr: string, endStr: string) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const date = start.toLocaleDateString("fr-FR");
    const startHour = start.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    const endHour = end.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    return `${date} de ${startHour} à ${endHour}`;
  };

  // HANDLERS (LOGIQUE GUEST)
  const checkAuthAndRedirect = () => {
    if (!userType || userType === 'volunteer_guest') {
      showToast("Connexion requise", "Vous devez être connecté pour effectuer cette action.");
      return false;
    }
    return true;
  };

  const handleJoinMission = async () => {
    if (!checkAuthAndRedirect()) return;

    try {
      await volunteerService.applyToMission(mission.id_mission);
      showToast("Succès", "Candidature envoyée avec succès !");
    } catch (e: any) {
      showToast("Erreur", e.message || "Une erreur est survenue.");
    }
  };

  const toggleFavorite = async () => {
    if (!checkAuthAndRedirect()) return;

    try {
      if (isFavorite) {
        await volunteerService.removeFavorite(mission.id_mission);
        setIsFavorite(false);
      } else {
        await volunteerService.addFavorite(mission.id_mission);
        setIsFavorite(true);
      }
    } catch (e: any) {
      showToast("Erreur", e.message || "Impossible de modifier les favoris.");
    }
  };

  const goToAssociation = () => {
      if (mission.id_asso) {
        const route = (userType === 'volunteer_guest' 
          ? `/(guest)/search/association/${mission.id_asso}`
          : `/(volunteer)/search/association/${mission.id_asso}`) as Href; 
          router.push(route);
      };
  };

  return (
    <View style={[styles.container, { paddingTop: isWeb ? 0 : insets.top, backgroundColor: Colors.white}]} >
      <AlertToast 
        visible={toast.visible} 
        title={toast.title} 
        message={toast.message} 
        onClose={() => setToast(t => ({ ...t, visible: false }))}
      />

      {/* HEADER */}
      <View style={[
          styles.header,
          !isWeb && { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 50 },
          isWeb && { flexDirection: 'column', alignItems: 'flex-start', paddingTop: 25, gap: 2 },
          isSmallScreenWeb && { paddingLeft: 60 }
      ]}>
          <View style={!isWeb ? { position: 'absolute', left: 0, zIndex: 10 } : {}}>
              <BackButton name_page="" />
          </View>
          <Text 
              style={[ styles.headerTitle, isWeb && { fontSize: 24, marginLeft: 0 }, !isWeb && { textAlign: 'center', maxWidth: '70%' }]}
              numberOfLines={2}
          >
              {mission.name}
          </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isWeb && styles.scrollContentWeb, !isWeb && { paddingTop: 0 }]}
      >
        <View style={isWeb ? styles.webTopSection : undefined}>
          <Image 
            source={mission.image_url ? { uri: mission.image_url } : require("@/assets/images/volunteering_img.jpg")} 
            style={styles.missionImage}
          />

          <View style={isWeb ? styles.webInfoColumn : undefined}>
            <View style={styles.row}>
              <Text style={styles.label}>Catégorie :</Text>
              <CategoryLabel text={mission_category} backgroundColor={mission_category_color} />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Nombre de bénévoles :</Text>
              <View style={styles.volunteerRow}>
                <Text style={styles.volunteerText}>{mission.capacity_min} / {mission.capacity_max}</Text>
                <Image source={require("@/assets/images/people.png")} style={styles.peopleIcon} />
              </View>
            </View>
          </View>
        </View>

        {/* DETAILS */}
        <View style={styles.bottomCard}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
            <Text style={styles.infoLine}>
                <Text style={styles.infoLabel}>Association :</Text> {mission.association?.name}
            </Text>
            <TouchableOpacity onPress={goToAssociation} style={{ marginLeft: 5 }}>
                <Text style={{ color: Colors.orange, textDecorationLine: 'underline', fontWeight: '600' }}>
                    (Voir profil)
                </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Date :</Text> {formatDateRange(mission.date_start, mission.date_end)}
          </Text>

          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Lieu :</Text> {mission_location}
          </Text>

          <Text style={styles.infoLabel}>Description :</Text>
          <Text style={styles.description}>{mission.description}</Text>
        </View>

        {/* ACTIONS BUTTONS */}
        <View style={styles.actionsRow}>
            {!finished ? (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <View style={{flex: 1, marginRight: 10}}>
                        <ButtonAuth text="Rejoindre la mission" onPress={handleJoinMission} />
                    </View>
                    <TouchableOpacity
                      onPress={toggleFavorite}
                      accessibilityRole="button"
                      accessibilityLabel={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                      accessibilityState={{ checked: isFavorite }}
                    >
                        <Image
                            source={isFavorite ? require("@/assets/images/red_heart.png") : require("@/assets/images/gray_heart.png")}
                            style={styles.heartIcon}
                            accessibilityIgnoresInvertColors
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={{color: 'gray', fontStyle: 'italic', textAlign: 'center'}}>Cette mission est terminée.</Text>
            )}
        </View>
      </ScrollView>
    </View>
  );
}