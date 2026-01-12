import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  Platform,
  useWindowDimensions,
  Text,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/styles/pages/SearchMissionStyles';
import { Colors } from '@/constants/colors';
// Components
import MobileSearchBar from '@/components/MobileSearchBar';
import SearchBar from '@/components/SearchBar';
import MissionVolunteerCard from '@/components/MissionVolunteerCard';
import MissionVolunteerCardHorizontal from '@/components/MissionVolunteerCardHorizontal'
import AlertToast from '@/components/AlertToast';

// Services & Models
import { missionService } from '@/services/missionService';
import { volunteerService } from '@/services/volunteerService';
import { useAuth } from '@/context/AuthContext';
import { Mission } from '@/models/mission.model';

export default function ResearchMission() {
  const router = useRouter();
  const { userType } = useAuth();
  const isWeb = Platform.OS === 'web';
  const { width } = useWindowDimensions();
  const isSmallSreen = width < 900;

  // --- DATA ---
  const [allMissions, setAllMissions] = useState<Mission[]>([]);
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  const CATEGORIES = ['Social', 'Environnement', 'Éducation', 'Santé', 'Sport', 'Culture'];

  useEffect(() => {
    loadData();
  }, [userType]);

  const loadData = async () => {
    setLoading(true);
    try {
      const missionsData = await missionService.getAll();
      setAllMissions(missionsData || []);
      setFilteredMissions(missionsData || []);

      if (userType === 'volunteer') {
        const favoritesData = await volunteerService.getFavorites();
        const ids = favoritesData.map((m) => m.id_mission);
        setFavoriteIds(ids);
      } else {
        setFavoriteIds([]);
      }
    } catch (error) {
      console.error(error);
      setToast({ visible: true, title: "Erreur", message: "Impossible de charger les missions." });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logique de filtrage unifiée
   * @param text - Texte de recherche (nom de la mission)
   * @param filters - Objet contenant category, zipCode, date
   */
  const performFilter = (text: string, filters: { category?: string | null, zipCode?: string | null, date?: Date | null }) => {
    const lowerText = text.toLowerCase();

    const filtered = allMissions.filter(mission => {
      const matchText = (mission.name || "").toLowerCase().includes(lowerText) || 
                        (mission.description || "").toLowerCase().includes(lowerText);

      let matchCategory = true;
      if (filters.category && filters.category !== '-') {
        matchCategory = mission.category?.label === filters.category;
      }

      let matchZip = true;
      if (filters.zipCode) {
        matchZip = mission.location?.zip_code === filters.zipCode;
      }

      let matchDate = true;
      if (filters.date) {
        const filterDate = new Date(filters.date);
        filterDate.setHours(0,0,0,0);
        const missionStart = new Date(mission.date_start);
        missionStart.setHours(0,0,0,0);

        matchDate = missionStart >= filterDate; 
      }

      return matchText && matchCategory && matchZip && matchDate;
    });

    setFilteredMissions(filtered);
  };

  // --- HANDLER WEB ---
  const handleWebSearch = (text: string, filters: { category: string | null, zipCode: string | null, date: Date | null }) => {
    performFilter(text, filters);
  };

  // --- HANDLER MOBILE ---
  const handleMobileSearch = (text: string, filters: any) => {
    performFilter(text, filters);
  };

  const showToast = useCallback((title: string, message: string) => {
    setToast({ visible: true, title, message });
  }, []);
  
  const checkAuthAndRedirect = () => {
    if (!userType || userType === 'volunteer_guest') {
      showToast("Connexion requise", "Vous devez être connecté pour effectuer cette action.");
      return false;
    }
    return true;
  };

  // --- FAVORITES & NAV ---
  const handleToggleFavorite = useCallback(async (missionId: number) => {
    if (!checkAuthAndRedirect()) return;

    const isFav = favoriteIds.includes(missionId);
    setFavoriteIds(prev => isFav ? prev.filter(id => id !== missionId) : [...prev, missionId]);
    
    try {
      if (isFav) {
        await volunteerService.removeFavorite(missionId);
        console.log(`Mission ${missionId} retirée des favoris`);
      } else {
        await volunteerService.addFavorite(missionId);
        console.log(`Mission ${missionId} ajoutée aux favoris`);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du favori", error);
      setFavoriteIds(prev => 
        isFav 
          ? [...prev, missionId] 
          : prev.filter(id => id !== missionId)
      );
      showToast("Erreur", "Impossible de mettre à jour les favoris.");
    }
  }, [userType, favoriteIds, isWeb]);

  const handlePressMission = useCallback((missionId: number) => {
    const rootPath = userType === 'volunteer' ? '/(volunteer)' : '/(guest)';
    // @ts-ignore
    router.push(`${rootPath}/search/mission/${missionId}`);
  }, [userType, router]);

  if (loading && allMissions.length === 0) {
    return (
      <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color={Colors.orange} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: Colors.white }]} >
      <AlertToast 
        visible={toast.visible} title={toast.title} message={toast.message} 
        onClose={() => setToast({...toast, visible: false})} 
      />

      {!isWeb && (
            <View style={styles.headerMobile}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    />
                </View>
            </View>
        )}

      <View style={{ width: '100%', alignItems: 'flex-start' }}>
        <Text style={[
          styles.titre,
          {
            paddingLeft: isWeb ? (isSmallSreen ? 60 : 0) : 20,
            marginTop: isWeb && isSmallSreen ? 40 : 10,
            textAlign: 'left',
          }
        ]}>
          Rechercher une mission
        </Text>
      </View>

      {/* --- SWITCH BARRES DE RECHERCHE --- */}
      <View style={styles.searchbar}>
        {isWeb ? (
          <SearchBar
            categories={CATEGORIES}
            onSearch={handleWebSearch}
          />
        ) : (
          <MobileSearchBar
            category_list={CATEGORIES}
            onSearch={handleMobileSearch}
          />
        )}
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {!isWeb ? (
        <FlatList
        data={filteredMissions}
        numColumns={1}
        key={`flatlist-${1}`}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id_mission.toString()}
        contentContainerStyle={{
            ...styles.listContent,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 20,
            paddingHorizontal: isWeb ? 20 : 0,
            justifyContent: isWeb ? 'flex-start' : 'center',
        }}
        renderItem={({ item }) => (
            <View 
                style={{ 
                    flex: 1,
                    marginBottom: 5,
                }}
            >
                <MissionVolunteerCard
                    mission={item}
                    isFavorite={favoriteIds.includes(item.id_mission)}
                    onPressMission={() => handlePressMission(item.id_mission)}
                    onPressFavorite={
                    userType === 'volunteer' 
                        ? () => handleToggleFavorite(item.id_mission) 
                        : () => checkAuthAndRedirect()
                    }
                />
          </View>
        )}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 50, color: 'gray'}}>Aucune mission trouvée.</Text>
        }
      />
        ) : (
            <FlatList
        data={filteredMissions}
        numColumns={1}
        key={`flatlist-${1}`}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id_mission.toString()}
        contentContainerStyle={{
            ...styles.listContent,
            gap: 20,
            paddingHorizontal: isWeb ? 20 : 0,
            justifyContent: isWeb ? 'flex-start' : 'center',
        }}
        renderItem={({ item }) => (
            <View 
                style={{ 
                    flex: 1,
                    marginBottom: 5,
                }}
            >
                <MissionVolunteerCardHorizontal
                    mission={item}
                    isFavorite={favoriteIds.includes(item.id_mission)}
                    onPressMission={() => handlePressMission(item.id_mission)}
                    onPressFavorite={
                    userType === 'volunteer' 
                        ? () => handleToggleFavorite(item.id_mission) 
                        : () => checkAuthAndRedirect()
                    }
                />
          </View>
        )}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 50, color: 'gray'}}>Aucune mission trouvée.</Text>
        }
        />
      )}
      </KeyboardAvoidingView>
    </View>
  );
}