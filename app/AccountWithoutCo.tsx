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
  Platform,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { styles } from '@/styles/pages/AccountWithoutCo';
import { Mission } from '@/types/Mission';
import Sidebar from '@/components/SideBar';
import { useRouter } from 'expo-router';

export default function AccountWithoutCo() {
  const { width } = useWindowDimensions();
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
  const isSmallScreen = width < 900;

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

  const handlePressMission = (missionId: string) => {
    console.log('Mission pressed:', missionId);
    // Navigation toward détails of the mission
  };

  const handlePressFavorite = (missionId: string, newValue: boolean) => {
    console.log('Favorite toggled:', missionId, newValue);
    // Mise à jour du favori dans l'état ou l'API
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

          {/* Section Bénévole */}
          <View style={styles.ctaSectionMobile}>
            <Text style={styles.ctaTitleMobile}>
              Vous êtes un(e) bénévole, ou vous souhaitez en devenir un(e) !
            </Text>
            <Text style={styles.ctaDescriptionMobile}>
              Envie d'agir et de donner un peu de votre temps ?{'\n'}
              <Text style={styles.boldText}>Together</Text> vous met en lien avec des associations proches de chez vous et des missions qui correspondent à vos envies.
            </Text>
            <TouchableOpacity style={styles.ctaButtonMobile}>
              <Text style={styles.ctaButtonText}>
                REJOINDRE TOGETHER EN{'\n'}TANT QUE BÉNÉVOLE
              </Text>
            </TouchableOpacity>
          </View>

          {/* Section Association */}
          <View style={[styles.ctaSectionMobile, styles.ctaSectionLavender]}>
            <Text style={styles.ctaTitleMobile}>
              Vous êtes une association et vous cherchez des bénévoles !
            </Text>
            <Text style={styles.ctaDescriptionMobile}>
              Besoin de renfort pour vos actions ?{'\n'}
              Avec <Text style={[styles.boldText, {color: Colors.inputBackground }]}>Together</Text>, vous publiez facilement vos missions et trouvez rapidement des bénévoles motivé(e)s.
            </Text>
            <TouchableOpacity style={[styles.ctaButtonMobile, styles.ctaButtonLavender]}>
              <Text style={styles.ctaButtonText}>
                REJOINDRE TOGETHER EN{'\n'}TANT QU'ASSOCIATION
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    );
  }

  // Web version
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
    <Sidebar
      userType='volunteer_guest'
      userName='Invité'
      onNavigate={(route: string) => {router.push(('/' + route) as any)}}
    />
    <View style={styles.container}>
      <ScrollView>
        {/* Section Missions récentes */}
        <View style={styles.sectionWeb}>
          <Text style={[styles.sectionTitleWeb, isSmallScreen && {paddingLeft: 35}]}>Missions récentes</Text>

          <View style={styles.missionsGrid}>
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
        </View>

        {/* Section Bénévole */}
        <View style={styles.ctaSectionWeb}>
          <Text style={styles.ctaTitleWeb}>
            Vous êtes un(e) bénévole, ou vous souhaitez en devenir un(e) !
          </Text>
          <Text style={styles.ctaDescriptionWeb}>
            Envie d'agir et de donner un peu de votre temps ?{'\n'}
            <Text style={styles.boldText}>Together</Text> vous met en lien avec des associations proches de chez vous et des missions qui correspondent à vos envies.{'\n'}
            Rejoignez une communauté engagée et passez à l'action en quelques clics.
          </Text>
          <TouchableOpacity style={styles.ctaButtonWeb} onPress={() => router.push('/ChangeMission' as any)}>
            <Text style={styles.ctaButtonTextWeb}>
              REJOINDRE TOGETHER EN TANT QUE BÉNÉVOLE
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section Association */}
        <View style={[styles.ctaSectionWeb, styles.ctaSectionLavender]}>
          <Text style={styles.ctaTitleWeb}>
            Vous êtes une association et vous cherchez des bénévoles !
          </Text>
          <Text style={styles.ctaDescriptionWeb}>
            Besoin de renfort pour vos actions ?{'\n'}
            Avec <Text style={[styles.boldText, {color: Colors.inputBackground}]}>Together</Text>, publiez facilement vos missions et trouvez rapidement des bénévoles motivés. Gagnez en visibilité, mobilisez plus efficacement, et concentrez-vous sur ce qui compte : votre impact.
          </Text>
          <TouchableOpacity style={[styles.ctaButtonWeb, styles.ctaButtonBlueWeb]}>
            <Text style={styles.ctaButtonTextWeb}>
              REJOINDRE TOGETHER EN TANT QU'ASSOCIATION
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </View>
  );
};