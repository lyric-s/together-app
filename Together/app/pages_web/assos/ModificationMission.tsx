import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, Image } from 'react-native';
import { styles } from '../../../styles/ModificationMissionCSS';
import { handleSaveMission } from '../../../utils/pages_web/ModificationMissionTS';

export default function ModificationMission() {
    // Valeurs à remplacer par celles de la BD
  const [mission, setMission] = useState<string>('Mission exemple');
  const missionImageUrl = 'https://www.francebleu.fr/pikapi/images/33fe1bd1-39e9-431f-a932-0bee063e1ec9/1200x680'; // image temporaire
  const dateD = "12/11/2021 15h00"
  const dateF = "12/11/2021 18h00"
  const categMission = "Animaux"
  const lieu = "Parc des cannetons, 12 rue du Grand lac 62511 Bordeaux"
  const nbMin = 3
  const nbMax = 5
  const nbInscrit = 3
  const [description, setDescription] = useState("Promener nos 16 chiens au parc des Canetons\nChiens avec et sans laisses\nLes chiens sont adorables !\nIls ne mordent pas")

  // Mode édition
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => handleSaveMission(mission);

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <ScrollView style={styles.container}>
        {/* Titre de la page = titre de la mission (mock pour l'instant) */}
        {isEditing ? (
            <TextInput
                style={styles.input}
                placeholder={mission}
                onChangeText={setMission}
            />
            ) : (
            <Text style={styles.title}>{mission}</Text>
            )
        }

        {/* Image */}
        <Text style={styles.title_small}>Image</Text>
        <Image
            source={{ uri: missionImageUrl }}
            style={styles.image}
            resizeMode="cover"
        />
        <TextInput
            style={styles.input}
            placeholder="Nom de la mission"
            value={mission}
            onChangeText={setMission}
        />
        <Button title="Sauvegarder" onPress={handleSave} />
    </ScrollView>
  );
}
