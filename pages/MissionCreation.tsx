import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function MissionCreation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [location, setLocation] = useState("");
  const [minVolunteers, setMinVolunteers] = useState("");
  const [maxVolunteers, setMaxVolunteers] = useState("");
  const [skills, setSkills] = useState("");

  // required field
  const handlePublish = () => {
    if (!title || !description || !category || !startDate || !location ||
        !image || !startDate || !maxVolunteers) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Création d'une mission</Text>
      <Text style={styles.subtitle}>Remplissez les informations pour créer une nouvelle mission.</Text>

      {/* Section 1 */}
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
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Sélectionnez une catégorie"
        />

        <Text style={styles.label}>Image</Text>
        <TouchableOpacity style={styles.imageButton}>
          <Text style={styles.imageButtonText}>+ Importer une image</Text>
        </TouchableOpacity>
      </View>

      {/* Section 2 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Détails pratiques</Text>

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Date début *</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowStartPicker(true)}>
              <Text>{startDate ? startDate.toLocaleString() : "Sélectionner"}</Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="datetime"
                onChange={(e, d) => {
                  setShowStartPicker(false);
                  if (d) setStartDate(d);
                }}
              />
            )}
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>Date fin</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowEndPicker(true)}>
              <Text>{endDate ? endDate.toLocaleString() : "Sélectionner"}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endDate || new Date()}
                mode="datetime"
                onChange={(e, d) => {
                  setShowEndPicker(false);
                  if (d) setEndDate(d);
                }}
              />
            )}
          </View>
        </View>

        <Text style={styles.label}>Lieu *</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation} />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Nombre minimum de bénévoles</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={minVolunteers}
              onChangeText={setMinVolunteers}
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>Nombre maximum de bénévoles</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={maxVolunteers}
              onChangeText={setMaxVolunteers}
            />
          </View>
        </View>

        <Text style={styles.label}>Compétences requises</Text>
        <TextInput style={styles.input} value={skills} onChangeText={setSkills} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.draftButton}>
          <Text style={styles.draftText}>Enregistrer le brouillon</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishText}>Publier la mission</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.requiredInfo}>* Champs obligatoires</Text>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  mainTitle: { fontSize: 28, fontWeight: "bold", color: "black", marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 20 },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  label: { fontSize: 15, marginBottom: 6 },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textArea: { height: 90 },
  row: { flexDirection: "row", gap: 15 },
  half: { flex: 1 },
  imageButton: {
    backgroundColor: "#EFEFEF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  imageButtonText: { fontWeight: "600" },
  buttonsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  draftButton: { backgroundColor: "#DDD", padding: 12, borderRadius: 8, flex: 1, marginRight: 10 },
  draftText: { textAlign: "center" },
  publishButton: { backgroundColor: "#FF8A3D", padding: 12, borderRadius: 8, flex: 1 },
  publishText: { textAlign: "center", color: "white", fontWeight: "600" },
  requiredInfo: { marginTop: 10, fontStyle: "italic", fontSize: 12 },
});
