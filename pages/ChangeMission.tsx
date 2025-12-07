import CategoryLabel from '@/components/CategoryLabel';
import ListeBenevolesModal from '@/components/ListBenevolesModal';
import { styles } from '@/styles/pages/ChangeMissionCSS';
import { handleSaveMission, updateMissionField, handleDeleteMission } from '@/utils/ChangeMissionTS';
import { useState, useCallback } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Colors } from '@/constants/colors';
import BackButton from '@/components/BackButton';
import AlertToast from '@/components/AlertToast';
import { Mission, MissionEditable } from '@/types/Mission';
import { Benevole } from '@/types/ProfileUser';

export default function ChangeMission() {
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

  // Values to be replaced by those in the database
  const [mission, setMission] = useState<Mission>({
    id: "1",
    title: "Promenade de chiens",
    image: "https://www.francebleu.fr/pikapi/images/33fe1bd1-39e9-431f-a932-0bee063e1ec9/1200x680",
    dateStart: "12/11/2025 15h00",
    dateEnd: "12/11/2025 18h00",
    categ: "Animaux",
    nbMin: 3,
    nbMax: 5,
    nbRegistered: 3,
    place: "Parc des cannetons, 12 rue du Grand lac 62511 Bordeaux",
    description: "Promener nos 16 chiens au parc des Canetons.\nChiens avec et sans laisses.\nLes chiens sont adorables !\nIls ne mordent pas.",
  });

  const toEditable = (mission: Mission): MissionEditable => ({
    ...mission,
    nbMin: mission.nbMin.toString(),
    nbMax: mission.nbMax.toString(),
  });

  const toMission = (editable: MissionEditable): Mission => ({
    ...editable,
    nbMin: typeof editable.nbMin === 'number' ? editable.nbMin : parseInt(String(editable.nbMin)) || 0,
    nbMax: typeof editable.nbMax === 'number' ? editable.nbMax : parseInt(String(editable.nbMax)) || 0,
  });

  const [missionModifiable, setMissionModifiable] = useState<MissionEditable>(
    toEditable(mission)
  );

  // Value selected for the drop-down list for the category
  const [items, setItems] = useState([
    { label: "Animaux", value: "Animaux", backgroundColor: Colors.brightOrange },
    { label: "Végétation", value: "Végétation", backgroundColor: "#02fe41ff" },
    { label: "Accompagnement", value: "Accompagnement", backgroundColor: "#AEDDFF" },
  ]);
  const getBackgroundColorCateg = (categ : string) => {
    const item = items.find(i => i.value === categ)
    return item ? item.backgroundColor : Colors.white
  }

  // Opening the drop-down list
  const [open, setOpen] = useState(false);

  const setCateg = useCallback((valueOrCallback: string | ((prev: string) => string)) => {
    setMissionModifiable(prev => ({
      ...prev,
      categ: typeof valueOrCallback === 'function' 
        ? valueOrCallback(prev.categ) 
        : valueOrCallback
    }));
  }, []);

  // Edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Displaying the pop-up for the list of volunteers
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (field: keyof MissionEditable, value: any) => {
    setMissionModifiable(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangeNb = (field: 'nbMin' | 'nbMax', value: string) => {
    if (value === '') {
      handleChange(field, '');
    } else {
      const numericValue = parseInt(value);
      if (!isNaN(numericValue)) {
        handleChange(field, numericValue);
      }
    }
  };

  const handleListVolunteer = () => {
    setModalVisible(true);
  }

  const handleSave = () => {
    const missionToSave = toMission(missionModifiable);
    
    // Validate date format and order
   const dateStartValid = /^\d{2}\/\d{2}\/\d{4} \d{2}h\d{2}$/.test(missionToSave.dateStart);
   const dateEndValid = /^\d{2}\/\d{2}\/\d{4} \d{2}h\d{2}$/.test(missionToSave.dateEnd);
   
   if (!dateStartValid || !dateEndValid) {
     showAlert('Erreur', 'Format de date invalide. Utilisez DD/MM/YYYY HHhMM');
     return;
   }

    // Validate numeric constraints
    const min = missionToSave.nbMin
    const max = missionToSave.nbMax

    if ([min, max].some((n) => Number.isNaN(n))) {
      showAlert('Erreur', 'Les champs numériques doivent contenir des valeurs valides');
      return;
    }

    if (min > max) {
      showAlert('Erreur', 'Le nombre minimum ne peut pas être supérieur au maximum');
      return;
    }
    
    if (!missionModifiable.title.trim()) {
      showAlert('Erreur', 'Le titre est requis');
      return;
    }
    setMission(missionToSave);
    setIsEditing(false);
    handleSaveMission(missionToSave);
  };

  const handleDelete = () => {
    // Coming soon
    // Implement delete logic (API call, confirmation dialog, etc.)
    console.log('Delete mission:', mission.id);
    handleDeleteMission(mission)
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMissionModifiable(toEditable(mission));
  };

  const handleBack = () => {
    setMissionModifiable(toEditable(mission)); // Cancel modifications
    setIsEditing(false);
    setOpen(false);
  };

  const [search, setSearch] = useState('')
  const [benevoles, setBenevoles] = useState<Benevole[]>([
    {id: "1", lastname: "YAN", firstname: "Lucie"},
    {id: "2", lastname: "XU", firstname: "Irène"},
    {id: "3", lastname: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", firstname: "abcdefghijklmnopqrstuvwxyz"},
  ])

  return (
    <>
    <AlertToast
      visible={alertModal.visible}
      title={alertModal.title}
      message={alertModal.message}
      onClose={handleAlertClose}
    />
    <ScrollView style={styles.container}>
      {isEditing ? (
        <>
          <TextInput
              style={styles.input}
              value={missionModifiable.title}
              placeholder="Titre de la mission"
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
          <DropDownPicker
            open={open}
            value={missionModifiable.categ}
            items={items}
            setOpen={setOpen}
            setValue={setCateg}
            setItems={setItems}
            onChangeValue={(value) => {
              if (value !== null) {
                console.log('Catégorie sélectionnée:', value);
              }
            }}
            style={styles.input}
            placeholderStyle={styles.placeholderStyle}
            labelStyle={styles.labelStyle}
            placeholder="Choisir une catégorie"
            zIndex={1000}
          />

          <Text style={styles.label}>Lieu</Text>
          <TextInput
            style={styles.input}
            value={missionModifiable.place}
            onChangeText={(text) => handleChange("place", text)}
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
          <Text style={styles.text}>{missionModifiable.nbRegistered.toString()}</Text>

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
          <BackButton
            name_page='Mission à venir'
          />
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
          <CategoryLabel
            text = {mission.categ}
            backgroundColor = {getBackgroundColorCateg(mission.categ)}
          />

          <Text style={styles.label}>Lieu</Text>
          <Text style={styles.text}>{mission.place}</Text>

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
              <Text style={styles.text}>{mission.nbRegistered.toString()}</Text>
            </View>
            <View style={{flex: 1, marginLeft:10}}>
              <TouchableOpacity style={styles.button} onPress={handleListVolunteer}>
                <Text style={styles.buttonText}>Voir la liste des bénévoles</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ListeBenevolesModal
            visible = {modalVisible}
            onClose = {() => setModalVisible(false)}
            title = {mission.title}
            search = {search}
            setSearch = {setSearch}
            benevoles = {benevoles}
            setBenevoles = {setBenevoles}
          />
          
          <Text style={styles.label}>Description de la mission</Text>
          <Text style={styles.text}>{mission.description}</Text>

          <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
            <View style={{flex: 1, marginRight:50}}>
              <TouchableOpacity style={styles.buttonAction} onPress={handleEdit}>
                <Text style={styles.buttonText}>Modifier la mission</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, marginLeft:50}}>
              <TouchableOpacity style={[styles.buttonAction, {backgroundColor: Colors.red}]} onPress={handleDelete}>
                <Text style={styles.buttonText}>Supprimer la mission</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
        )
      }
    </ScrollView>
    </>
  );
}