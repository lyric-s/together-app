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
import { router } from 'expo-router';
import Sidebar from '@/components/SideBar';
import CategoryLabel from '@/components/CategoryLabel';
import { Colors } from '@/constants/colors';
import { styles } from '@/styles/pages/ActivityAssosCSS';
import ListeBenevolesModal from '@/components/ListBenevolesModal';

type Mission = {
    id: string;
    title: string;
    dateStart: string;
    dateEnd: string;
    city: string;
    category: string;
    categoryColor: string;
    nbRegistered: number;
    nbMax: number;
};

interface Benevole {
    id: string;
    lastname: string;
    firstname: string;
}

export default function ActivityAssos() {
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 900;

    const [missions, setMissions] = useState<Mission[]>([
        {
            id: '1',
            title: 'Promenade de chiens',
            dateStart: '12/11/2025 de 15h à 17h',
            dateEnd: '12/11/2025 17h',
            city: 'Bordeaux',
            category: 'Animaux',
            categoryColor: Colors.brightOrange,
            nbRegistered: 2,
            nbMax: 5,
        },
        {
            id: '2',
            title: 'Promenade de chiens',
            dateStart: '12/11/2025 de 15h à 17h',
            dateEnd: '12/11/2025 17h',
            city: 'Bordeaux',
            category: 'Animaux',
            categoryColor: Colors.brightOrange,
            nbRegistered: 2,
            nbMax: 5,
        },
        {
            id: '3',
            title: 'Promenade de chiens',
            dateStart: '12/11/2025 de 15h à 17h',
            dateEnd: '12/11/2025 17h',
            city: 'Bordeaux',
            category: 'Animaux',
            categoryColor: Colors.brightOrange,
            nbRegistered: 2,
            nbMax: 5,
        },
        {
            id: '4',
            title: 'Promenade de chiens',
            dateStart: '12/11/2025 de 15h à 17h',
            dateEnd: '12/11/2025 17h',
            city: 'Bordeaux',
            category: 'Animaux',
            categoryColor: Colors.brightOrange,
            nbRegistered: 2,
            nbMax: 5,
        },
    ]);

    // Displaying the pop-up for the list of volunteers
    const [modalVisible, setModalVisible] = useState(false);
    const [missionClick, setMissionClick] = useState<Mission | null>(null);
    const [search, setSearch] = useState('');
    //const [benevoles, setBenevoles] = useState<Benevole[]>([]);
    const [benevoles, setBenevoles] = useState<Benevole[]>([
        {id: "1", lastname: "YAN", firstname: "Lucie"},
        {id: "2", lastname: "XU", firstname: "Irène"},
        {id: "3", lastname: "DUPONT", firstname: "Marie"},
    ]);
    const [loading, setLoading] = useState(false);

    /*
    const handleViewMission = (missionId: string) => {
        console.log('Voir mission:', missionId);
        router.push({
        pathname: '/ChangeMission',
        params: { missionId }
        });
    };
    */

    // Charge volunteer according to clicked mission
    const loadBenevoles = async (missionId: string) => {
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
        //await loadBenevoles(mission.id); // Charge volunteers of the clicked mission

        setSearch(''); // Reset search field
        setModalVisible(true);
    };

    const handleViewVolunteers = (missionId: string) => {
        console.log('Voir bénévoles:', missionId);
        const mission = missions.find(m => m.id === missionId);
        if (mission) {
            openModal(mission);
        }
    };

    const renderMissionCard = (mission: Mission) => (
        <View key={mission.id} style={styles.missionCard}>
        {/* Left Section - Mission Info */}
        <View style={styles.missionInfo}>
            <Text style={styles.missionTitle}>{mission.title}</Text>
            <Text style={styles.missionDetail}>{mission.dateStart}</Text>
            <Text style={styles.missionDetail}>{mission.city}</Text>
            <View style={[styles.categoryContainer, { marginVertical: -2, marginLeft: -10 }]}>
            <CategoryLabel
                text={mission.category}
                backgroundColor={mission.categoryColor}
            />
            </View>
        </View>

        {/* Right Section - Actions */}
        <View style={styles.actionsSection}>
            {/* Left Part - Buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                style={[styles.button, {backgroundColor: '#E8D5FF'}]}
                //onPress={() => handleViewMission(mission.id)}
                >
                <Text style={[styles.buttonText, {color: '#7C3AED'}]}>Voir la mission</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={[styles.button, {backgroundColor: '#D1FAE5'}]}
                onPress={() => handleViewVolunteers(mission.id)}
                >
                <Text style={[styles.buttonText, {color: '#059669'}]}>Voir les bénévoles</Text>
                </TouchableOpacity>
            </View>
            {/* Right Part - Image + Participants */}
            <View style={styles.imageSection}>
                <View style={styles.participantsContainer}>
                <Text style={styles.participantsText}>
                    {mission.nbRegistered} / {mission.nbMax}
                </Text>
                <Image source={require('@/assets/images/people.png')} style={styles.participantsIcon} />
                </View>
            </View>
        </View>
        </View>
    );

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Sidebar
            userType='association'
            userName='SPA'
            onNavigate={(route: string) => {router.push(('/' + route) as any)}}
            />

            <View style={{ flex: 1 }}>
                <ScrollView style={styles.content}>
                    <Text style={[styles.pageTitle, isSmallScreen && {paddingLeft: 55}]}>
                        Mission à venir
                    </Text>
                    <View style={styles.missionsList}>
                        {missions.map((mission) => renderMissionCard(mission))}
                    </View>
                </ScrollView>
            </View>
            <ListeBenevolesModal
                visible = {modalVisible}
                onClose = {() => setModalVisible(false)}
                title = {missionClick?.title || ''}
                search = {search}
                setSearch = {setSearch}
                benevoles = {benevoles}
                setBenevoles = {setBenevoles}
            />
        </View>
    );
}