import React, { useState } from 'react';
import { router } from 'expo-router'
import MissionVolunteerCard from '@/components/MissionVolunteerCard';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { styles } from '@/styles/pages/AccountWithoutCoCSS';
import { Mission } from '@/types/Mission';

export default function AccountBenevole() {
  const { width } = useWindowDimensions();
  //const isWeb = Platform.OS === 'web';
  const isMobile = width < 768;

  //data via API
  const missions: Mission[] = [
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
  ];

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
    try {
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
    }
  };

  const handlePressFavorite = async (missionId: string, newValue: boolean) => {
    console.log('Favorite toggled:', missionId, newValue);

    // 1. Sauvegarder en base de données
    const saved = await saveFavoriteToDatabase(missionId, newValue);
    
    if (!saved) {
      // Si la sauvegarde échoue, ne pas mettre à jour l'UI
      alert('Erreur lors de la mise à jour du favori. Veuillez réessayer.');
      return;
    }

    // 2. Mettre à jour les états locaux
    if (newValue) {
      // Ajouter aux favoris
      // Chercher la mission dans le tableau missions
      const missionToAdd = missions.find(m => m.id === missionId);
      
      if (missionToAdd) {
        // Ajouter aux favoris si pas déjà présente
        if (!missionsFavorite.find(m => m.id === missionId)) {
          setMissionsFavorite(prevFavorites => [
            ...prevFavorites,
            { ...missionToAdd, favorite: true }
          ]);
        }
      } else {
        // La mission vient peut-être déjà des favoris
        setMissionsFavorite(prevFavorites =>
          prevFavorites.map(m =>
            m.id === missionId ? { ...m, favorite: true } : m
          )
        );
      }
    } else {
      // Retirer des favoris
      setMissionsFavorite(prevFavorites =>
        prevFavorites.filter(m => m.id !== missionId)
      );
    }
  };

  // Mobile version
  if (isMobile) {
    return (
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
          <View style={styles.sectionMobile}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Favoris</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </TouchableOpacity>
            </View>

            {/* List of missions */}
            {missionsFavorite.map((missionsFavorite) => (
              <View key={missionsFavorite.id} style={styles.cardWrapper}>
                <MissionVolunteerCard
                  mission_title={missionsFavorite.title}
                  association_name={missionsFavorite.association_name}
                  city={missionsFavorite.city}
                  date={missionsFavorite.date}
                  number_max_volunteers={missionsFavorite.number_max_volunteers}
                  number_of_volunteers={missionsFavorite.number_of_volunteers}
                  category_label={missionsFavorite.category}
                  category_color={missionsFavorite.categoryColor}
                  image={missionsFavorite.image}
                  favorite={missionsFavorite.favorite}
                  onPressMission={() => handlePressMission(missionsFavorite.id)}
                  onPressFavorite={(newValue) => handlePressFavorite(missionsFavorite.id, newValue)}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIconActive}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📚</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Web version
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Section Missions récentes */}
        <View style={styles.sectionWeb}>
          <Text style={styles.sectionTitleWeb}>Missions récentes</Text>

          <View style={styles.missionsGrid}>
            {missions.map((mission) => (
              <View key={mission.id} style={styles.missionCardWeb}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: mission.image }}
                    style={styles.missionImageWeb}
                    resizeMode="cover"
                  />
                  <View style={styles.categoryBadgeWeb}>
                    <Text style={styles.categoryTextWeb}>{mission.category}</Text>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.missionTitleWeb}>{mission.title}</Text>
                  <Text style={styles.missionDateWeb}>{mission.date.getDate().toString().padStart(2, '0') + '/' + (mission.date.getMonth() + 1).toString().padStart(2, '0') + '/' + mission.date.getFullYear() + ' - ' + mission.date.getHours().toString().padStart(2, '0') + 'h' + mission.date.getMinutes().toString().padStart(2, '0')}</Text>

                  <View style={styles.cardFooter}>
                    <View style={styles.participantsContainer}>
                      <Text style={styles.participantsIcon}>👥</Text>
                      <Text style={styles.participantsText}>
                        {mission.number_of_volunteers}/{mission.number_max_volunteers}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <Text style={styles.detailLink}>Voir détail →</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* Section Missions favorites */}
        <View style={styles.sectionWeb}>
          <Text style={styles.sectionTitleWeb}>Missions favorites</Text>

            <View style={styles.missionsGrid}>
          {missionsFavorite.map((missionsFavorite) => (
              <View key={missionsFavorite.id} >
                <MissionVolunteerCard
                  mission_title={missionsFavorite.title}
                  association_name={missionsFavorite.association_name}
                  city={missionsFavorite.city}
                  date={missionsFavorite.date}
                  number_max_volunteers={missionsFavorite.number_max_volunteers}
                  number_of_volunteers={missionsFavorite.number_of_volunteers}
                  category_label={missionsFavorite.category}
                  category_color={missionsFavorite.categoryColor}
                  image={missionsFavorite.image}
                  favorite={missionsFavorite.favorite}
                  onPressMission={() => handlePressMission(missionsFavorite.id)}
                  onPressFavorite={(newValue) => handlePressFavorite(missionsFavorite.id, newValue)}
                />
              </View>
            ))}
            </View>
        </View>
      </ScrollView>
    </View>
  );
};