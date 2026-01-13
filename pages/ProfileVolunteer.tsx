import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AlertToast from '@/components/AlertToast';
import { Colors } from '@/constants/colors';
import { styles } from '@/styles/pages/ProfilCSS';
import{styles1} from '@/styles/pages/ProfileVolunteerCSS';
import ProfilCard from '@/components/ProfilCard';
import ImageButton from '@/components/ImageButton';
import { useAuth } from '@/context/AuthContext';
import { volunteerService } from '@/services/volunteerService';
import { Volunteer } from '@/models/volunteer.model';
import { Mission } from '@/models/mission.model';
// Importez les types définis pour ProfilCard
import { VolunteerProfile } from '@/types/ProfileUser'; 
import { UserType } from '@/models/enums';

const MOCK_VOLUNTEER_DATA: Volunteer = {
    id_volunteer: 101,
    id_user: 900,
    first_name: "Thomas",
    last_name: "Anderson",
    phone_number: "0612345678",
    birthdate: "1999-03-31", // Format YYYY-MM-DD
    address: "10 rue de la Matrice",
    zip_code: "75000",
    bio: '',
    //bio: "J'aime aider mon prochain et hacker des systèmes.",
    skills: "Informatique, Kung-fu, Jardinage",
    active_missions_count: 2,
    finished_missions_count: 42, // Pour tester le compteur de stats
    user: {
        id_user: 900,
        username: "Neo_Béné",
        email: "neo@matrix.com",
        user_type: "volunteer" as UserType,
        date_creation: "2024-01-01"
    }
};

// Simule la réponse de GET /volunteers/me/missions?target_date=...
const MOCK_MISSIONS_DAY: Mission[] = [
    {
        id_mission: 501,
        name: "Distribution de repas",
        date_start: "2024-01-01T12:00:00",
        date_end: "2024-01-01T14:00:00",
        skills: "Service",
        description: "Distribution...",
        capacity_min: 2, capacity_max: 5, volunteers_enrolled: 2, available_slots: 3, is_full: false,
        id_location: 1, id_categ: 1, id_asso: 1,
        // Les champs imbriqués sont optionnels pour le calendrier mais on les met pour la forme
    },
    {
        id_mission: 502,
        name: "Tri de vêtements",
        date_start: "2024-01-01T16:30:00",
        date_end: "2024-01-01T18:00:00",
        skills: "Organisation",
        description: "Tri...",
        capacity_min: 2, capacity_max: 5, volunteers_enrolled: 2, available_slots: 3, is_full: false,
        id_location: 1, id_categ: 1, id_asso: 1,
    }
];

// Interface locale pour l'affichage du calendrier
interface MissionDay {
  id: string; // Changé en string pour matcher souvent les IDs de listes React
  time: string;
  title: string;
  image?: any;
}

export default function ProfilVolunteer() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 900;
  const isVerySmallScreen = width < 768;
  const isMobile = Platform.OS !== 'web';

  const { refetchUser } = useAuth();
  
  const [profileUser, setProfilUSer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState(true);
  const [alertModal, setAlertModal] = useState({ visible: false, title: '', message: '' });

  // Calendrier
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [missionsToday, setMissionsToday] = useState<MissionDay[]>([]);
  const [noEventsMessage, setNoEventsMessage] = useState(false);
  const [loadingCalendar, setLoadingCalendar] = useState(false);

  const missionsAccomplies = profileUser?.finished_missions_count || 0;

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const volunteerData = MOCK_VOLUNTEER_DATA//await volunteerService.getMe();
      setProfilUSer(volunteerData);
      loadMissionsForDay(new Date()); 
    } catch (e) {
      console.error(e);
      setAlertModal({ visible: true, title: 'Erreur', message: 'Impossible de charger le profil.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleAlertClose = () => setAlertModal(prev => ({ ...prev, visible: false }));
  const showAlert = (title: string, message: string) => setAlertModal({ visible: true, title, message });

  const handleSave = async (updatedData: any): Promise<void> => {
    if (!profileUser) return;
    try {
      // Construction du payload pour l'API
      const payload = {
        first_name: updatedData.first_name,
        last_name: updatedData.last_name,
        phone_number: updatedData.phone_number,
        birthdate: updatedData.birthdate,
        address: updatedData.address,
        zip_code: updatedData.zip_code,
        skills: updatedData.skills,
        bio: updatedData.bio,
      };

      const result = await volunteerService.updateMe(profileUser.id_volunteer, payload);
      setProfilUSer(result);
      await refetchUser();
      showAlert('Succès', 'Profil mis à jour avec succès.');
    } catch (error) {
      console.error(error);
      showAlert('Erreur', 'Échec de la mise à jour.');
    }
  };

  const loadMissionsForDay = async (date: Date) => {
    setLoadingCalendar(true);
    setNoEventsMessage(false);
    setMissionsToday([]);
    
    try {
      const dateStr = date.toISOString().split('T')[0];
      const missions = MOCK_MISSIONS_DAY //await volunteerService.getMyMissions(dateStr);

      if (missions && missions.length > 0) {
        // CORRECTION DU MAPPING ICI
        const formattedMissions: MissionDay[] = missions.map((m: Mission) => ({
            id: m.id_mission.toString(), // Conversion number -> string
            time: new Date(m.date_start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            title: m.name, // 'name' vient du modèle Mission, 'title' va vers MissionDay
            image: m.image_url ? { uri: m.image_url } : undefined
        }));
        setMissionsToday(formattedMissions);
      } else {
        setNoEventsMessage(true);
      }
    } catch (error) {
      console.error(error);
      setNoEventsMessage(true);
    } finally {
      setLoadingCalendar(false);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay(); // 0 Dimanche
    
    const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    const handleDayPress = (dayNum: number) => {
        if (dayNum > 0 && dayNum <= daysInMonth) {
            const clickedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dayNum);
            setSelectedDay(clickedDate);
            loadMissionsForDay(clickedDate);
        }
    };

    const isSelectedDay = (dayNum: number) => {
        if (dayNum <= 0) return false;
        const d = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dayNum);
        return d.toDateString() === selectedDay.toDateString();
    };

    const isToday = (dayNum: number) => {
        if (dayNum <= 0 || dayNum > daysInMonth) return false;
            const dayDate = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                dayNum
        );
        const today = new Date();
        return (
            dayDate.getFullYear() === today.getFullYear() &&
            dayDate.getMonth() === today.getMonth() &&
            dayDate.getDate() === today.getDate()
        );
    };

    return (
        <View style={styles.calendar}>
            <View style={styles.calendarHeader}>
                <Text style={styles.calendarMonth}>{monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</Text>
            </View>
            <View style={styles.calendarWeekDays}>
                {weekDays.map((day, i) => <Text key={i} style={styles.weekDay}>{day}</Text>)}
            </View>
            <View style={styles.calendarDays}>
                {Array.from({ length: 35 }, (_, i) => {
                    const dayNum = i - firstDayOfMonth + 1;
                    const isValidDay = dayNum > 0 && dayNum <= daysInMonth;
                    return (
                        <TouchableOpacity
                            key={i}
                            style={[
                                styles.calendarDay,
                                !isValidDay && styles.calendarDayEmpty,
                                isToday(dayNum) && styles.calendarDayToday,      
                                isSelectedDay(dayNum) && styles.calendarDaySelected,
                            ]}
                            onPress={() => handleDayPress(dayNum)}
                        >
                            <Text style={[styles.calendarDayText, isValidDay && isSelectedDay(dayNum) && {color:'white', fontWeight:'bold'}]}>
                                {isValidDay ? dayNum : ''}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={styles.missionsSection}>
                {noEventsMessage ? (
                    <Text style={styles.noEventsText}>
                        Pas de choses prévues ce jour
                    </Text>
                ) : missionsToday.length > 0 ? (
                    missionsToday.map((mission, index) => (
                        <View key={index} style={styles.calendarEvent}>
                            <Text style={styles.eventTime}>{mission.time}</Text>
                            <Text style={styles.eventTitle}>{mission.title}</Text>
                        </View>
                    ))
                ) : (
                        <Text style={styles.loadingText}>Chargement...</Text>
                    )}
            </View>
        </View>
    );
  };

  if (loading || !profileUser) {
      return (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator size="large" color={Colors.orange} />
              <Text style={{marginTop:10, color:'gray'}}>Chargement du profil...</Text>
          </View>
      );
  }

  // --- CORRECTION DU TYPE ICI ---
  // On type explicitement userDataForCard en VolunteerProfile
  const userDataForCard: VolunteerProfile = {
      // Champs BaseProfile
      username: profileUser.user?.username || '',
      email: profileUser.user?.email || '',
      
      // Champs VolunteerProfile
      // IMPORTANT : 'as const' ou typage explicite pour dire que c'est bien "volunteer" et pas string
      type: 'volunteer', 
      id_volunteer: profileUser.id_volunteer,
      first_name: profileUser.first_name,
      last_name: profileUser.last_name,
      phone_number: profileUser.phone_number,
      birthdate: profileUser.birthdate,
      
      // Champs Optionnels
      address: profileUser.address,
      zip_code: profileUser.zip_code,
      skills: profileUser.skills,
      bio: profileUser.bio,
      
      // Champs pour le formulaire (vides par défaut pour ne pas afficher de mots de passe)
      password: '',
      confirmPassword: ''
  };

  if (isMobile) {
    return (
        <ScrollView style={[styles.content, {backgroundColor: Colors.white}]} contentContainerStyle={{ paddingVertical: 20 }} showsVerticalScrollIndicator={false}>
            <View style={{alignItems: 'center'}}>
                <Image source={require('@/assets/images/profil-picture.png')} style={styles.profilIcon} />
                <Text style={[styles.menuLabel, {marginVertical: 10, fontSize: 25, fontWeight: 'bold'}]}>
                    {profileUser.first_name} {profileUser.last_name}
                </Text>
            </View>

            <View style={styles.separatorLine} />

            <View style={styles.statsCardMobile}>
                <Text style={[styles.menuLabel, {marginVertical: 10, marginTop: 50, fontSize: 17, fontWeight: 'bold'}]}>MISSIONS{'\n'}ACCOMPLIES</Text>
                <Text style={styles.statsNumber}>{missionsAccomplies}</Text>
            </View>

            <View style={styles.menuGrid}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                    <TouchableOpacity style={styles.menuCard} >
                        <View style={styles.menuIconContainer}>
                            <Image
                                source={require('@/assets/images/award.png')}
                                style={styles.menuIcon}
                            />
                            <Text style={styles.menuLabel}>Mes récompenses</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuCard}>
                        <View style={[styles.menuIconContainer, { backgroundColor: Colors.lightPurple }]}>
                            <Image
                                source={require('@/assets/images/edit_profil.png')}
                                style={styles.menuIcon}
                            />
                            <Text style={styles.menuLabel}>Mes informations</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                    <TouchableOpacity style={styles.menuCard}>
                        <View style={[styles.menuIconContainer, { backgroundColor: Colors.lightPurple }]}>
                            <Image
                                source={require('@/assets/images/calender.png')}
                                style={styles.menuIcon}
                            />
                            <Text style={styles.menuLabel}>Mon calendrier</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuCard}>
                        <View style={styles.menuIconContainer}>
                            <Image
                                source={require('@/assets/images/parameters.png')}
                                style={styles.menuIcon}
                            />
                            <Text style={styles.menuLabel}>Paramètres</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        );
    }

  return (
    <LinearGradient
        colors={[Colors.white, Colors.orangeVeryLight]}
        style={{ flex: 1 }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
    >
        <AlertToast
            visible={alertModal.visible}
            title={alertModal.title}
            message={alertModal.message}
            onClose={handleAlertClose}
        />
        <ScrollView 
            contentContainerStyle={styles1.scrollContent} 
            showsVerticalScrollIndicator={false}
        >
            <View style={styles1.headerContainer}>
                <Text style={[styles1.pageTitle, isSmallScreen && {paddingLeft : 40}]}>Mon profil</Text>
                <Text style={[styles1.headerSubtitle, isSmallScreen && {paddingLeft : 40}]}>Toutes les données vous concernant</Text>
            </View>
            <View style={[styles1.mainLayout, { flexDirection: isVerySmallScreen ? 'column' : 'row' }]}></View>
                <View style={[styles1.leftColumn, { width: isVerySmallScreen ? '100%' : 380 }]}>
                    <ProfilCard
                        userType = 'volunteer'
                        userData = {userDataForCard}
                        onSave={handleSave}
                        showAlert={showAlert}
                    />
                </View>
                <View style={[styles1.rightColumn, { 
                    width: isVerySmallScreen ? '100%' : 'auto',
                    flex: isVerySmallScreen ? 0 : 1 
                }]}>
                    {/* Calendar */}
                    <View style={styles1.sectionContainer}>
                        <Text style={styles1.sectionTitle}>Mon calendrier</Text>
                        {renderCalendar()}
                    </View>

                    {/* Missions Stats */}
                    <View style={[styles1.statsCard]}>
                        <View style={styles1.statsContent}>
                            <Text style={styles1.statsLabel}>
                                MISSIONS{'\n'}ACCOMPLIES
                            </Text>
                            <Text style={styles1.statsNumber}>{missionsAccomplies}</Text>
                        </View>
                        <ImageButton image={require('@/assets/images/reward.png')} />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}