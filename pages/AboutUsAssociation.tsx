import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Platform, useWindowDimensions, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import BackButton from '@/components/BackButton';
import { styles } from '@/styles/pages/AboutAssociationStyle';
import { Association } from '@/models/association.model';
import { associationService } from '@/services/associationService';
import { Colors } from '@/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AboutUsAssociation() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isSmallScreenWeb = isWeb && width < 900;
    
  const [association, setAssociation] = useState<Association | null>(null);
  const [loading, setLoading] = useState(true);
  
   const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!id) return;
  
    const fetchAssociation = async () => {
      setLoading(true);
      try {
        const data = await associationService.getById(Number(id));
        setAssociation(data);
      } catch (e) {
        console.error("Erreur chargement association:", e);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAssociation();
  }, [id]);
  
  if (loading) {
    return (
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color={Colors.orange} />
        </View>
    );
  }

  if (!association) {
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
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Association introuvable</Text>
            </View>
        </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: isWeb ? 0 : insets.top, backgroundColor: Colors.white}]} >

        <View style={[
            styles.header,
            !isWeb && { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 50, paddingHorizontal: 10 },
            isWeb && { flexDirection: 'column', alignItems: 'flex-start', paddingTop: 25, gap: 2 },
            isSmallScreenWeb && { paddingLeft: 60 }
        ]}>
            <View style={!isWeb ? { position: 'absolute', left: 0, zIndex: 10 } : {}}>
                <BackButton name_page="" />
            </View>
            <Text 
                style={[ 
                    styles.headerTitle,
                    isWeb && { fontSize: 24, marginLeft: 0 },
                    !isWeb && { textAlign: 'center' }
                ]}
                numberOfLines={2}
            >
                {association.name}
            </Text>
        </View>
        {/* Content */}
        <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, isWeb && styles.scrollContentWeb, !isWeb && { paddingTop: 0 }]}
              >
            <View style={styles.content}>
          {/* Description box */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Description</Text>
            <Text style={styles.text}>
                {association.description || "Aucune description disponible pour le moment."}
            </Text>
          </View>

          {/* Informations box */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Informations</Text>

            <View style={{gap: 10}}>
                <Text style={styles.infoText}>
                    <Text style={styles.label}>Nom :</Text> {association.name}
                </Text>

                {association.address ? (
                    <Text style={styles.infoText}>
                        <Text style={styles.label}>Adresse :</Text> {association.address}
                    </Text>
                ) : null}

                {association.zip_code ? (
                    <Text style={styles.infoText}>
                        <Text style={styles.label}>Code postal :</Text> {association.zip_code}
                    </Text>
                ) : null}

                {association.phone_number ? (
                    <Text style={styles.infoText}>
                        <Text style={styles.label}>Téléphone :</Text> {association.phone_number}
                    </Text>
                ) : null}
            </View>
          </View>
          </View>
        </ScrollView>
    </View>
  );
}