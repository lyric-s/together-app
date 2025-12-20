import CategoryLabel from '@/components/CategoryLabel';
import ListeBenevolesModal from '@/components/ListBenevolesModal';
import { styles } from '@/styles/pages/ChangeMissionCSS';
import { useState, useCallback } from 'react';
import { Modal, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Colors } from '@/constants/colors';
import BackButton from '@/components/BackButton';
import AlertToast from '@/components/AlertToast';
import Sidebar from '@/components/SideBar';
import { useRouter } from 'expo-router';

export default function ChangeMission() {
  const router = useRouter();
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
  const [mission, setMission] = useState({
    id: "1",
    title: "Promenade de chiens",
    image: "https://www.francebleu.fr/pikapi/images/33fe1bd1-39e9-431f-a932-0bee063e1ec9/1200x680",
    dateStart: "12/11/2025 - 15h00",
    dateEnd: "12/11/2025 - 18h00",
    categ: "Animaux",
    nbMin: 3,
    nbMax: 5,
    nbRegistered: 3,
    place: "Parc des cannetons, 12 rue du Grand lac 62511 Bordeaux",
    description: "Promener nos 16 chiens au parc des Canetons.\nChiens avec et sans laisses.\nLes chiens sont adorables !\nIls ne mordent pas.",
  });

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

  // Displaying the pop-up for the list of volunteers
  const [modalVisible, setModalVisible] = useState(false);

  const handleListVolunteer = () => {
    setModalVisible(true);
  }

  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleDelete = () => {
    console.log('handleDelete cliquée !'); 
    setConfirmVisible(true);
  };

  const [search, setSearch] = useState('')
  const [benevoles, setBenevoles] = useState([
    {id: "1", lastname: "YAN", firstname: "Lucie"},
    {id: "2", lastname: "XU", firstname: "Irène"},
    {id: "3", lastname: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", firstname: "abcdefghijklmnopqrstuvwxyz"},
  ])

  return (
        <ScrollView>
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
              <TouchableOpacity style={styles.buttonAction}>
                <Text style={styles.buttonText}>Modifier la mission</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, marginLeft:50}}>
              <TouchableOpacity style={[styles.buttonAction, {backgroundColor: Colors.red}]} onPress={handleDelete}>
                <Text style={styles.buttonText}>Supprimer la mission</Text>
              </TouchableOpacity>
            </View>
          </View>
    </ScrollView>
  );
}