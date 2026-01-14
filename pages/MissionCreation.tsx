import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import DatePickerField from "@/components/DatePickerFields"; 
import {styles} from "@/styles/pages/CreationMissionStyle";
import {associationService} from "@/services/associationService";
import { router } from "expo-router";


export default function MissionCreation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null); 
  const [location, setLocation] = useState("");
  const [minVolunteers, setMinVolunteers] = useState("");
  const [maxVolunteers, setMaxVolunteers] = useState("");
  const [skills, setSkills] = useState("");
  // const [imageName, setImageName] = useState<string | null>(null);
  const categories = ["Environnement", "Social", "Sport", "Santé", "Animaux"] //TODO  


  // --- Image Picker ---
// const pickImage = async () => {
//   try {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       quality: 1,
//       allowsEditing: false,
//       mediaTypes: ["images"],
//     });

//     if (result.canceled) return;

//     const asset = result.assets?.[0];
//     if (!asset) return;

//     const uri = asset.uri;

//     const safeFileName: string =
//     asset.fileName ??
//     (uri ? uri.split("/").pop() || "image" : "image");

//     setImage(uri);
//     setImageName(safeFileName);

//   } catch (error) {
//     console.error("Erreur lors du choix d'image :", error);
//   }
// };

  const toIsoDate = (date: Date) => date.toISOString().split("T")[0];




  const handlePublish = async () => {
  if (
    !title ||
    !description ||
    !category ||
    !startDate ||
    !location ||
    !maxVolunteers
  ) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  if (endDate && endDate < startDate) {
    alert("La date de fin doit être après la date de début.");
    return;
  }

  const min = parseInt(minVolunteers || "0");
  const max = parseInt(maxVolunteers);

  if (isNaN(max) || max <= 0) {
    alert("Le nombre maximum de bénévoles doit être un nombre valide supérieur à 0.");
    return;
  }

  if (minVolunteers && min > max) {
    alert("Le nombre minimum de bénévoles ne peut pas dépasser le maximum.");
    return;
  }

  const now = new Date();
  if (startDate < now) {
    alert("La date de début ne peut pas être dans le passé.");
    return;
  }

  try {
    const payload = {
      name: title,
      description,
      skills,
      capacity_min: min,
      capacity_max: max,
      date_start: toIsoDate(startDate),
      date_end: endDate ? toIsoDate(endDate) : toIsoDate(startDate),

      // ⚠️ TODO : à brancher dynamiquement plus tard
      id_location: 1,
      id_categ: 1,
      id_asso: 1,
    };

    const mission = await associationService.createMission(payload);

    alert("Mission créée avec succès !");
    console.log("Mission créée :", mission);

    // Go back to home page
    router.replace("/(association)/home");
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la création de la mission.");
  }
};


  return (
    <ScrollView style={styles.container}>
      <View >
        <Text style={styles.mainTitle}>Création d'une mission</Text>
        <Text style={styles.subtitle}>
          Remplissez les informations pour créer une nouvelle mission.
        </Text>

        {/* SECTION 1 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informations générales</Text>

          <Text style={styles.label}>Titre de la mission *</Text>
          <TextInput
            style={styles.input}
            maxLength={100}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Description de la mission *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            maxLength={500}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Catégorie *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
              style={styles.picker}
            >
              <Picker.Item label="Sélectionnez une catégorie" value="" />

              {categories.map((c, i) => (
                <Picker.Item key={i} label={c} value={c} />
              ))}
            </Picker>
          </View>


          {/* <Text style={styles.label}>Image *</Text>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>+ Importer une image</Text>
          </TouchableOpacity>
          {image && (
            <Text style={{ fontSize: 12, marginTop: 4 }}>{imageName}</Text>
          )} */}

        </View>

        {/* SECTION 2 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Détails pratiques</Text>

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Date début *</Text>
              <DatePickerField
                date={startDate}
                onChange={setStartDate}
              />
            </View>

            <View style={styles.half}>
              <Text style={styles.label}>Date fin</Text>
              <DatePickerField
                date={endDate}
                onChange={setEndDate}
              />
            </View>
          </View>

          <Text style={styles.label}>Lieu *</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Nombre minimum bénévoles</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={minVolunteers}
                onChangeText={(t) => setMinVolunteers(t.replace(/[^0-9]/g, ""))}
              />
            </View>

            <View style={styles.half}>
              <Text style={styles.label}>Nombre maximum bénévoles *</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={maxVolunteers}
                onChangeText={(t) => setMaxVolunteers(t.replace(/[^0-9]/g, ""))}
              />
            </View>
          </View>

          <Text style={styles.label}>Compétences requises</Text>
          <TextInput
            style={styles.input}
            value={skills}
            onChangeText={setSkills}
          />
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonsRow}>
          {/* // TODO or delete */}
          {/* <TouchableOpacity style={styles.draftButton}>
            <Text style={styles.draftText}>Enregistrer le brouillon</Text>
          </TouchableOpacity> */}

          
          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.publishText}>Publier la mission</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.requiredInfo}>* Champs obligatoires</Text>
      </View>
    </ScrollView>
  );
}


