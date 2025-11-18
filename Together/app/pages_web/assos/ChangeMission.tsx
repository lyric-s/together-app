import { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../../../styles/ChangeMissionCSS';
import { handleSaveMission, updateMissionField } from '../../../utils/pages_web/ChangeMissionTS';

type Mission = {
  id: string,
  title: string,
  image: string,
  dateStart: string,
  dateEnd: string,
  categ: string,
  nbMin: number,
  nbMax: number,
  nbRegistered: number,
  place: string,
  description: string,
};

type Benevole = {
  id: string,
  lastname: string,
  firstname: string,
}

export default function ChangeMission() {
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
  const [missionModifiable, setMissionModifiable] = useState(mission);

  // Value selected for the drop-down list for the category
  const [selectedCategory, setSelectedCategory] = useState(mission.categ);
  const [items, setItems] = useState([
    { label: "Animaux", value: "Animaux" },
    { label: "Végétation", value: "Végétation" },
    { label: "Accompagnement", value: "Accompagnement" },
    //{ label: "Ajouter une nouvelle catégorie", value: "__add__" }, // Option spéciale
  ]);

  // Opening the drop-down list
  const [open, setOpen] = useState(false);

  // Updates the mission when the category changes
  const onCategoryChange = (value: string) => {
    if (value === "__add__") {
      // Logic for adding a new category, for example opening a modal or input
      console.log("Ouvrir modal pour ajouter catégorie");
      // You can also close the list
      setIsEditing(false);
    } else {
      setSelectedCategory(value);
      handleChange("categ", value);
    }
  };

  // Edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Displaying the pop-up for the list of volunteers
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
    setMissionModifiable(mission); // Cancel modifications
    setIsEditing(false);
  };

  const [search, setSearch] = useState('')
  const [benevoles, setBenevoles] = useState<Benevole[]>([
    {id: "1", lastname: "YAN", firstname: "Lucie"},
    {id: "2", lastname: "XU", firstname: "Irène"},
    {id: "3", lastname: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", firstname: "abcdefghijklmnopqrstuvwxyz"},
  ])

  // Research function
  const filteredBenevoles = benevoles.filter(b =>
    (b.lastname + ' ' + b.firstname).toLowerCase().includes(search.toLowerCase())
  );

  // Delete function
  const removeBenevole = (id: string) => {
    setBenevoles(benevoles.filter(b => b.id !== id));
  };

  const renderItem = ({ item }: { item: Benevole }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.benevoleText}>{item.lastname} {item.firstname}</Text>
      <TouchableOpacity
        style={styles.croixCircle}
        onPress={() => removeBenevole(item.id)}
      >
        <Text style={styles.croixText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  if (!mission) {
    return <Text>Chargement...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
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
          {/*
          <TextInput
            style={styles.input}
            value={missionModifiable.categ}
            onChangeText={(text) => handleChange("categ", text)}
          />
          */}
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
            value={missionModifiable.place}
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
            value={missionModifiable.nbRegistered.toString()}
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

          <Modal visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)' }}>
              <View style={{ padding:20, backgroundColor:'white', borderRadius:10 }}>
                <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
                  <Text style={styles.title}>{mission.title}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={[styles.croixText, {fontSize: 50, color: '#FF2626'}]}>×</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.searchBar, { flexDirection : 'row', alignItems: 'center'}]}>
                  <Image
                    source = {require('./../../../assets/images/loupe.png')}
                    style = {styles.icon}
                  />
                  <TextInput
                    placeholder="Recherche un bénévole"
                    value={search}
                    onChangeText={setSearch}
                    style={{flex: 1, fontSize: 16, padding: 0, margin: 0, borderWidth: 0, outlineWidth: 0 }}
                  />
                </View>
                <FlatList
                  data={filteredBenevoles}
                  keyExtractor={item => item.id}
                  renderItem={renderItem}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
                <TouchableOpacity style={[styles.button, {backgroundColor: '#584EAF', marginRight: 50, marginLeft: 50, marginTop: 100}]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Envoyer un mail aux bénévoles</Text>
                </TouchableOpacity>
                {/*
                <TouchableOpacity style={[styles.button, {backgroundColor: '#FF2626'}]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Fermer</Text>
                </TouchableOpacity>
                */}
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