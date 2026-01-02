import React, { useState, useCallback } from 'react';
import { router } from 'expo-router'
import MissionVolunteerCard from '@/components/MissionVolunteerCard';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { styles } from '@/styles/pages/AccountWithoutCoCSS';
import { Mission } from '@/types/Mission';
import AlertToast from '@/components/AlertToast';
import Sidebar from '@/components/SideBar';

export default function AccountBenevole() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 900;
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  const [alertModal, setAlertModal] = useState({ 
    visible: false, 
    title: '', 
    message: '' 
  });

  const showAlert = useCallback((title: string, message: string) => {
    setAlertModal({ visible: true, title, message });
  }, []);

  const handleAlertClose = useCallback(() => {
    setAlertModal({ visible: false, title: '', message: '' })
  }, []);

  //data via API
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Animation dans un centre',
      association_name: 'Centre La Roseraie',
      city: 'Lyon',
      category: 'Social',
      categoryColor: Colors.brightOrange,
      date: new Date('2024-12-24T14:00:00'),
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      number_of_volunteers: 5,
      number_max_volunteers: 10,
      favorite: false,
    },
    {
      id: '2',
      title: 'Promenade de chiens',
      association_name: 'SPA',
      city: 'Bordeaux',
      category: 'Animaux',
      date: new Date('2024-12-25T15:00:00'),
      categoryColor: Colors.brightOrange,
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
      number_of_volunteers: 3,
      number_max_volunteers: 5,
      favorite: false,
    },
    {
      id: '3',
      title: 'Animation dans un centre',
      association_name: 'Centre La Roseraie',
      city: 'Lyon',
      date: new Date('2024-12-26T10:00:00'),
      category: 'Accompagnement',
      categoryColor: '#AEDDFF',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      number_of_volunteers: 3,
      number_max_volunteers: 10,
      favorite: false,
    },
  ]);

  const [missionsFavorite, setMissionsFavorite] = useState<Mission[]>([
    {
      id: '5',
      title: 'Promenade de chiens',
      association_name: 'SPA',
      city: 'Bordeaux',
      category: 'Animaux',
      date: new Date('2024-12-25T15:00:00'),
      categoryColor: Colors.brightOrange,
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
      number_of_volunteers: 3,
      number_max_volunteers: 5,
      favorite: true,
    },
    {
      id: '6',
      title: 'Animation dans un centre',
      association_name: 'Centre La Roseraie',
      city: 'Lyon',
      date: new Date('2024-12-26T10:00:00'),
      category: 'Accompagnement',
      categoryColor: '#AEDDFF',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      number_of_volunteers: 3,
      number_max_volunteers: 10,
      favorite: true,
    },
  ]);

  const handlePressMission = (missionId: string) => {
    console.log('Mission pressed:', missionId);
    // Navigation toward détails of the mission
  };

  const saveFavoriteToDatabase = async (missionId: string, isFavorite: boolean) => {
    /*try {
      const response = await fetch(`https://your-api.com/missions/${missionId}/favorite`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${yourAuthToken}`, // Si nécessaire
        },
        body: JSON.stringify({ favorite: isFavorite }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde du favori');
      }

      const data = await response.json();
      console.log('Favori sauvegardé:', data);
      return true;
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
      return false;
    }*/
   return true
  };

  const handlePressFavorite = async (missionId: string, newValue: boolean) => {
    console.log('Favorite toggled:', missionId, newValue);

    // 1. Save in BD
    const saved = await saveFavoriteToDatabase(missionId, newValue);
    
    if (!saved) {
        // If saving failed
        showAlert('Erreur', 'Erreur lors de la mise à jour du favori. Veuillez réessayer.');
        return;
    }

    if (newValue) {
    // Pass in favorite
    const missionFromList = missions.find(m => m.id === missionId);
    const missionFromFavorites = missionsFavorite.find(m => m.id === missionId);
    const missionToAdd = missionFromList || missionFromFavorites;

    if (missionToAdd) {
      setMissions(mis =>
        mis.map(m =>
          m.id === missionId ? { ...m, favorite: true } : m
        )
      );

      setMissionsFavorite(prev =>
        prev.some(m => m.id === missionId)
          ? prev.map(m =>
              m.id === missionId ? { ...m, favorite: true } : m
            )
          : [...prev, { ...missionToAdd, favorite: true }]
      );
    }
  } else {
    // Remove favorite
    setMissions(mis =>
      mis.map(m =>
        m.id === missionId ? { ...m, favorite: false } : m
      )
    );

    setMissionsFavorite(prev =>
      prev.filter(m => m.id !== missionId)
    );
  }
  };

  // Mobile version
  if (isMobile) {
    return (
        <>
        <AlertToast 
            visible={alertModal.visible}
            title={alertModal.title}
            message={alertModal.message}
            onClose={handleAlertClose}
        />
      <View style={styles.container}>
        {/* Header Mobile */}
        <View style={styles.headerMobile}>
          <View style={styles.logoContainer}>
            <Image
              source={ require('../assets/images/logo.png')}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ 
          alignItems: 'center', 
          paddingVertical: 5}}
          showsVerticalScrollIndicator={false}>
          {/* Section Récent */}
          <View style={styles.sectionMobile}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Récent</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </TouchableOpacity>
            </View>

            {/* List of missions */}
            
            {missions.map((mission) => (
              <View key={mission.id} style={styles.cardWrapper}>
                <MissionVolunteerCard
                  mission_title={mission.title}
                  association_name={mission.association_name}
                  city={mission.city}
                  date={mission.date}
                  number_max_volunteers={mission.number_max_volunteers}
                  number_of_volunteers={mission.number_of_volunteers}
                  category_label={mission.category}
                  category_color={mission.categoryColor}
                  image={mission.image}
                  favorite={mission.favorite}
                  onPressMission={() => handlePressMission(mission.id)}
                  onPressFavorite={(newValue) => handlePressFavorite(mission.id, newValue)}
                />
              </View>
            ))}

          </View>
          {/* Section Favorite */}
          {missionsFavorite.length > 0 && (
          <View style={styles.sectionMobile}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Favoris</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </TouchableOpacity>
            </View>

            {/* List of missions */}
            {missionsFavorite.map((mission) => (
            <View key={mission.id} style={styles.cardWrapper}>
              <MissionVolunteerCard
                mission_title={mission.title}
                association_name={mission.association_name}
                city={mission.city}
                date={mission.date}
                number_max_volunteers={mission.number_max_volunteers}
                number_of_volunteers={mission.number_of_volunteers}
                category_label={mission.category}
                category_color={mission.categoryColor}
                image={mission.image}
                favorite={mission.favorite}
                onPressMission={() => handlePressMission(mission.id)}
                onPressFavorite={(newValue) => handlePressFavorite(mission.id, newValue)}
              />
            </View>
          ))}
          </View>
        )}
        </ScrollView>
      </View>
    </>
    );
  }

  // Web version
  return (
    <>
    <AlertToast 
        visible={alertModal.visible}
        title={alertModal.title}
        message={alertModal.message}
        onClose={handleAlertClose}
    />
    <View style={{ flex: 1, flexDirection: 'row' }}>
    <Sidebar
      userType='volunteer'
      userName='Pascal'
      onNavigate={(route: string) => {router.push(('/' + route) as any)}}
    />
    <View style={styles.container}>
      <ScrollView>
        {/* Section Missions récentes */}
        <View style={styles.sectionWeb}>
          <Text style={[styles.sectionTitleWeb, isSmallScreen && {paddingLeft:35}]}>Missions récentes</Text>

          <View style={styles.missionsGrid}>
            {missions.map((mission) => (
              <View key={mission.id} >
                <MissionVolunteerCard
                  mission_title={mission.title}
                  association_name={mission.association_name}
                  city={mission.city}
                  date={mission.date}
                  number_max_volunteers={mission.number_max_volunteers}
                  number_of_volunteers={mission.number_of_volunteers}
                  category_label={mission.category}
                  category_color={mission.categoryColor}
                  image={mission.image}
                  favorite={mission.favorite}
                  onPressMission={() => handlePressMission(mission.id)}
                  onPressFavorite={(newValue) => handlePressFavorite(mission.id, newValue)}
                />
              </View>
            ))}
          </View>
        </View>
        {/* Section Missions favorites */}
        {missionsFavorite.length > 0 && (
        <View style={styles.sectionWeb}>
          <Text style={[styles.sectionTitleWeb, isSmallScreen && {paddingLeft:35}]}>Missions favorites</Text>

            <View style={styles.missionsGrid}>
          {missionsFavorite.map((mission) => (
              <View key={mission.id} >
                <MissionVolunteerCard
                  mission_title={mission.title}
                  association_name={mission.association_name}
                  city={mission.city}
                  date={mission.date}
                  number_max_volunteers={mission.number_max_volunteers}
                  number_of_volunteers={mission.number_of_volunteers}
                  category_label={mission.category}
                  category_color={mission.categoryColor}
                  image={mission.image}
                  favorite={mission.favorite}
                  onPressMission={() => handlePressMission(mission.id)}
                  onPressFavorite={(newValue) => handlePressFavorite(mission.id, newValue)}
                />
              </View>
            ))}
            </View>
        </View>
        )}
      </ScrollView>
    </View>
    </View>
    </>
  );
};