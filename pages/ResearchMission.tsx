/**
 * @file ResearchMission.tsx
 * @description Mission research page for discovering volunteer opportunities.
 *              Responsive design for mobile and web platforms with infinite scroll.
 *              Displays mission cards in grid layout (1-3 columns based on screen width).
 */

import React, { useState } from 'react';
import {
  View,
  FlatList,
  Platform,
  useWindowDimensions,
  Text
} from 'react-native';
import { useRouter } from 'expo-router';
import {styles} from '@/styles/pages/ResearchMissionStyle'

import MobileSearchBar from '@/components/MobileSearchBar';
import MissionVolunteerCard from '@/components/MissionVolunteerCard';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';

//TODO
const MOCK_MISSIONS = Array.from({ length: 30 }).map((_, i) => ({
  id: `mission-${i}`,
  mission_title: `Mission ${i + 1}`,
  association_name: 'Croix Rouge',
  date: new Date(),
  number_of_volunteers: Math.floor(Math.random() * 5),
  number_max_volunteers: 10,
  category_label: 'Social',
  category_color: 'orange',
  favorite: false,
  image: null,
}));


export default function ResearchMission() {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';

  const { width } = useWindowDimensions();

    const getNumColumns = () => {
    if (!isWeb) return 1;

    if (width >= 1400) return 3;
    if (width >= 1100) return 2;
    if (width >= 800) return 1;
    return 1;
    };
    const PAGE_SIZE = getNumColumns() * 2;


  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const missionsToDisplay = MOCK_MISSIONS.slice(0, visibleCount);

  // lazy loading
  const loadMore = () => {
    if (visibleCount < MOCK_MISSIONS.length) {
      setVisibleCount(prev => prev + PAGE_SIZE); // TODO: lazy loading
    }
  };

  return (
    <SafeAreaView style={styles.page}>

      <Text style={styles.titre} >
        Rechercher une mission 
      </Text>

      {/* SEARCH BAR */}
      <View style={styles.searchbar}>
        <MobileSearchBar
        category_list={['Social', 'Environnement', 'Éducation']} // TODO
        onSearch={(text, filters) => {
          console.log('SEARCH:', text, filters);
        }}
      />
      </View>
      

      {/* MISSIONS LIST */}
      <FlatList
        data={missionsToDisplay}
        key={getNumColumns()} 
        numColumns={getNumColumns()}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={isWeb && getNumColumns() > 1 ? styles.webRow : undefined}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <MissionVolunteerCard
            {...item}
            onPressMission={() =>
              router.push('/join_mission') //TODO
            }
            onPressFavorite={() => {}}
          />
        )}
      />

     
    </SafeAreaView>
  );
}

