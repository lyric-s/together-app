// ActivityAssos.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import CategoryLabel from '@/components/CategoryLabel';
import { Colors } from '@/constants/colors';
import { styles } from '@/styles/pages/ActivityAssosCSS';
import ListeBenevolesModal from '@/components/ListBenevolesModal';
import { Mission } from '@/models/mission.model';
import { Volunteer } from '@/models/volunteer.model';
import { router } from 'expo-router';

export default function ActivityAssos() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 900;

  // Mock missions plus représentatives
  const [missions, setMissions] = useState<Mission[]>([
    {
      id_mission: 101,
      name: 'Promenade de chiens',
      date_start: '2026-01-20T15:00',
      date_end: '2026-01-20T17:00',
      skills: 'Animal care',
      description: 'Aider à promener les chiens de l’association locale.',
      capacity_min: 1,
      capacity_max: 5,
      id_location: 12,
      id_categ: 3,
      id_asso: 7,
      // attributs optionnels non définis : image_url, location, category, association
    },
    {
      id_mission: 102,
      name: 'Distribution alimentaire',
      date_start: '2026-01-22T10:00',
      date_end: '2026-01-22T14:00',
      skills: 'Organization, communication',
      description: 'Aider à préparer et distribuer des repas aux personnes en difficulté.',
      capacity_min: 2,
      capacity_max: 6,
      id_location: 15,
      id_categ: 2,
      id_asso: 5,
    },
    {
      id_mission: 103,
      name: 'Jardinage communautaire',
      date_start: '2026-01-25T09:00',
      date_end: '2026-01-25T12:00',
      skills: 'Gardening, teamwork',
      description: 'Participer à l’entretien des espaces verts de la ville.',
      capacity_min: 1,
      capacity_max: 4,
      id_location: 18,
      id_categ: 4,
      id_asso: 3,
    },
  ]);

  // Displaying the pop-up for the list of volunteers
  const [modalVisible, setModalVisible] = useState(false);
  const [missionClick, setMissionClick] = useState<Mission | null>(null);
  const [search, setSearch] = useState('');
  
  // Mock volunteers plus réalistes
  const [benevoles, setBenevoles] = useState<Volunteer[]>([
    {
      id_volunteer: 1,
      id_user: 101,
      last_name: 'YAN',
      first_name: 'Lucie',
      phone_number: '0612345678',
      birthdate: '1995-06-12',
      skills: 'Animal care, Communication',
      bio: 'Amoureuse des animaux, aime aider les associations locales.',
      active_missions_count: 2,
      finished_missions_count: 5,
    },
    {
      id_volunteer: 2,
      id_user: 102,
      last_name: 'XU',
      first_name: 'Irène',
      phone_number: '0698765432',
      birthdate: '1990-02-25',
      skills: 'Organization, Teamwork',
      bio: 'Volontaire motivée et organisée, disponible le weekend.',
      active_missions_count: 1,
      finished_missions_count: 8,
    },
    {
      id_volunteer: 3,
      id_user: 103,
      last_name: 'DUPONT',
      first_name: 'Marie',
      phone_number: '0623456789',
      birthdate: '1988-11-05',
      skills: 'Gardening, Cooking',
      bio: 'Passionnée de jardinage et de cuisine, adore les missions collectives.',
      active_missions_count: 3,
      finished_missions_count: 10,
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Charge volunteers according to clicked mission
  const loadBenevoles = async (missionId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://ton-api.com/missions/${missionId}/benevoles`);
      const data = await response.json();
      setBenevoles(data);
    } catch (error) {
      console.error('Erreur chargement bénévoles:', error);
      setBenevoles([]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (mission: Mission) => {
    setMissionClick(mission);
    //await loadBenevoles(mission.id_mission); // Charge volunteers of the clicked mission

    setSearch(''); // Reset search field
    setModalVisible(true);
  };

  const handleViewVolunteers = (missionId: number) => {
    console.log('Voir bénévoles:', missionId);
    const mission = missions.find(m => m.id_mission === missionId);
    if (mission) {
      openModal(mission);
    }
  };

  const renderMissionCard = (mission: Mission) => (
    <View key={mission.id_mission} style={styles.missionCard}>
      {/* Left Section - Mission Info */}
      <View style={styles.missionInfo}>
        <Text style={styles.missionTitle}>{mission.name}</Text>
        <Text style={styles.missionDetail}>
          {mission.date_start} au {mission.date_end}
        </Text>
        <View style={[styles.categoryContainer, { marginVertical: -2, marginLeft: -10 }]}>
          <CategoryLabel
            text={`Catégorie ${mission.id_categ}`}
            backgroundColor={Colors.brightOrange}
          />
        </View>
      </View>

      {/* Right Section - Actions */}
      <View style={styles.actionsSection}>
        {/* Left Part - Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#E8D5FF' }]}
            onPress={() => router.push(`/(association)/library/upcoming/${mission.id_mission.toString()}`)}
          >
            <Text style={[styles.buttonText, { color: '#7C3AED' }]}>Voir la mission</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#D1FAE5' }]}
            onPress={() => handleViewVolunteers(mission.id_mission)}
          >
            <Text style={[styles.buttonText, { color: '#059669' }]}>Voir les bénévoles</Text>
          </TouchableOpacity>
        </View>

        {/* Right Part - Participants */}
        <View style={styles.imageSection}>
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsText}>
              {mission.capacity_min} / {mission.capacity_max}
            </Text>
            <Image source={require('@/assets/images/people.png')} style={styles.participantsIcon} />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: Colors.darkerWhite }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.content}>
          <Text style={[styles.pageTitle, isSmallScreen && { paddingLeft: 55 }]}>
            Missions à venir
          </Text>
          <View style={styles.missionsList}>
            {missions.map((mission) => renderMissionCard(mission))}
          </View>
        </ScrollView>
      </View>
      <ListeBenevolesModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={missionClick?.name || ''}
        search={search}
        setSearch={setSearch}
        benevoles={benevoles}
        setBenevoles={setBenevoles}
      />
    </View>
  );
}
