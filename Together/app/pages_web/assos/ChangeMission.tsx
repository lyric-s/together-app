import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity, Image, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../../../styles/ChangeMissionCSS';
import { handleSaveMission, updateMissionField } from '../../../utils/pages_web/ChangeMissionTS';

export default function ChangeMission() {
    // Valeurs à remplacer par celles de la BD
    /**
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
*/
  const [mission, setMission] = useState({
    title: "Promenade de chiens",
    image: "https://www.francebleu.fr/pikapi/images/33fe1bd1-39e9-431f-a932-0bee063e1ec9/1200x680",
    dateStart: "12/11/2025 15h00",
    dateEnd: "12/11/2025 18h00",
    categ: "Animaux",
    nbMin: 3,
    nbMax: 5,
    nbInscrit: 3,
    lieu: "Parc des cannetons, 12 rue du Grand lac 62511 Bordeaux",
    description: "Promener nos 16 chiens au parc des Canetons.\nChiens avec et sans laisses.\nLes chiens sont adorables !\nIls ne mordent pas.",
  });
  const [missionModifiable, setMissionModifiable] = useState(mission);

  const benevoles = ["Irène XU", "Lucie YAN"]

  // Valeur selectionné pour la liste déroulante concernant la catégorie
  const [selectedCategory, setSelectedCategory] = useState(mission.categ);
  const [items, setItems] = useState([
    { label: "Animaux", value: "Animaux" },
    { label: "Végétation", value: "Végétation" },
    { label: "Accompagnement", value: "Accompagnement" },
    //{ label: "Ajouter une nouvelle catégorie", value: "__add__" }, // Option spéciale
  ]);

  // Ouverture de la liste déroulante
  const [open, setOpen] = useState(false);

  // Met à jour la mission quand la catégorie change
  const onCategoryChange = (value: string) => {
    if (value === "__add__") {
      // Logique pour ajouter une nouvelle catégorie, par exemple ouvrir un modal ou input
      console.log("Ouvrir modal pour ajouter catégorie");
      // On peut fermer la liste aussi
      setIsEditing(false);
    } else {
      setSelectedCategory(value);
      handleChange("categ", value);
    }
  };

  // Mode édition
  const [isEditing, setIsEditing] = useState(false);

  // Affichage du pop-up pour la liste des bénévoles
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (field: any, value: any) => {
    setMissionModifiable(updateMissionField(missionModifiable, field, value));
  };

  const handleChangeNb = (field: any, value: any) => {
    if (value === ''){
      setMissionModifiable(updateMissionField(missionModifiable, field, ''));
    }
    else{
      const numericValue = parseInt(value);
      if (!isNaN(numericValue)) {
        setMissionModifiable({...missionModifiable, nbMin: numericValue});
      }
    }
  }

  const handleListVolunteer = () => {
    setModalVisible(true);
  }

  const handleSave = () => {
    setMission(missionModifiable);
    setIsEditing(false);
    handleSaveMission(missionModifiable);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBack = () => {
    setMissionModifiable(mission); // Annule modifications
    setIsEditing(false);
  };

  if (!mission) {
    return <Text>Chargement...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
        {/* Titre de la page = titre de la mission (mock pour l'instant) */}
        {isEditing ? (
          <>
            <TextInput
                style={styles.input}
                placeholder={missionModifiable.title}
                onChangeText={(text) => handleChange("title", text)}
            />

            <Text style={styles.label}>Image</Text>
            <Image
              source={{ uri: missionModifiable.image }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
              <View style={{flex: 1, marginRight:10}}>
                <Text style={styles.label}>Date début</Text>
                <TextInput
                  style={styles.input}
                  value={missionModifiable.dateStart}
                  onChangeText={(text) => handleChange("dateStart", text)}
                />
              </View>

              <View style={{flex: 1, marginLeft:10}}>
                <Text style={styles.label}>Date fin</Text>
                <TextInput
                  style={styles.input}
                  value={missionModifiable.dateEnd}
                  onChangeText={(text) => handleChange("dateEnd", text)}
                />
              </View>
            </View>

            <Text style={styles.label}>Catégorie de la mission</Text>
            <TextInput
              style={styles.input}
              value={missionModifiable.categ}
              onChangeText={(text) => handleChange("categ", text)}
            />
            <DropDownPicker
              open={open}
              value={missionModifiable.categ}
              items={items}
              setOpen={setOpen}
              setValue={(callback) => {
                const value = callback(selectedCategory);
                setSelectedCategory(value);
                handleChange("categ", value);
              }}
              setItems={setItems}
              style={styles.input}
              placeholderStyle={styles.placeholderStyle}
              labelStyle={styles.labelStyle}
              placeholder="Choisir une catégorie"
              zIndex={1000}  // Important pour que le dropdown passe au-dessus d'autres éléments
            />

            <Text style={styles.label}>Lieu</Text>
            <TextInput
              style={styles.input}
              value={missionModifiable.lieu}
              onChangeText={(text) => handleChange("lieu", text)}
            />

            <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
              <View style={{flex: 1, marginRight:10}}>
                <Text style={styles.label}>Nombre de bénévoles minimum</Text>
                <TextInput
                  style={styles.input}
                  value={missionModifiable.nbMin.toString()}
                  onChangeText={(text) => handleChangeNb("nbMin", text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={{flex: 1, marginRight:10}}>
                <Text style={styles.label}>Nombre de bénévoles maximum</Text>
                <TextInput
                  style={styles.input}
                  value={missionModifiable.nbMax.toString()}
                  onChangeText={(text) => handleChangeNb("nbMax", text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.label}>Nombre de bénévoles inscrit</Text>
            <TextInput
              style={styles.input}
              value={missionModifiable.nbInscrit.toString()}
              onChangeText={(text) => handleChangeNb("nbInscrit", text)}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Description de la mission</Text>
            <TextInput
              style={[styles.input, {textAlignVertical: 'top', height: 150}]}
              multiline={true}
              scrollEnabled={true}
              value={missionModifiable.description}
              onChangeText={(text) => handleChange("description", text)}
            />

            <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
              <View style={{flex: 1, marginRight:50}}>
                <TouchableOpacity style={[styles.buttonAction, {backgroundColor: '#FF2626'}]} onPress={handleBack}>
                  <Text style={styles.buttonText}>Retour</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, marginLeft:50}}>
                <TouchableOpacity style={styles.buttonAction} onPress={handleSave}>
                  <Text style={styles.buttonText}>Enregistrer la mission</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
          ) : (
          <>
            <Text style={styles.title}>{mission.title}</Text>

            <Text style={styles.label}>Image</Text>
            <Image
              source={{ uri: mission.image }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
              <View style={{flex: 1, marginRight:10}}>
                <Text style={styles.label}>Date début</Text>
                <Text style={styles.text}>{mission.dateStart}</Text>
              </View>

              <View style={{flex: 1, marginLeft:10}}>
                <Text style={styles.label}>Date fin</Text>
                <Text style={styles.text}>{mission.dateEnd}</Text>
              </View>
            </View>

            <Text style={styles.label}>Catégorie de la mission</Text>
            <Text style={styles.text}>{mission.categ}</Text>

            <Text style={styles.label}>Lieu</Text>
            <Text style={styles.text}>{mission.lieu}</Text>

            <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
              <View style={{flex: 1, marginRight:10}}>
                <Text style={styles.label}>Nombre de bénévoles minimum</Text>
                <Text style={styles.text}>{mission.nbMin.toString()}</Text>
              </View>

              <View style={{flex: 1, marginLeft:10}}>
                <Text style={styles.label}>Nombre de bénévoles maximum</Text>
                <Text style={styles.text}>{mission.nbMax.toString()}</Text>
              </View>
            </View>

            <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
              <View style={{flex: 1, marginRight:10}}>
                <Text style={styles.label}>Nombre de bénévoles inscrit</Text>
                <Text style={styles.text}>{mission.nbInscrit.toString()}</Text>
              </View>
              <View style={{flex: 1, marginLeft:10}}>
                <TouchableOpacity style={styles.button} onPress={handleListVolunteer}>
                  <Text style={styles.buttonText}>Voir la liste des bénévoles</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Modal visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)' }}>
                <View style={{ width:300, padding:20, backgroundColor:'white', borderRadius:10 }}>
                  <Text style={styles.title}>{mission.title}</Text>
                  {benevoles.map((b, index) => (
                    <Text key={index}>{b}</Text>
                  ))}
                  <TouchableOpacity style={[styles.button, {backgroundColor: '#FF2626'}]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Fermer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            
            <Text style={styles.label}>Description de la mission</Text>
            <Text style={styles.text}>{mission.description}</Text>

            <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
              <View style={{flex: 1, marginRight:50}}>
                <TouchableOpacity style={styles.buttonAction} onPress={handleEdit}>
                  <Text style={styles.buttonText}>Modifier la mission</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, marginLeft:50}}>
                <TouchableOpacity style={[styles.buttonAction, {backgroundColor: '#FF2626'}]} onPress={handleSave}>
                  <Text style={styles.buttonText}>Supprimer la mission</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
          )
        }
    </ScrollView>
  );
}