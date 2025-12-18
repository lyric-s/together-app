import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

import BackButton from "@/components/BackButton";
import ProfilePicture from "@/components/ProfilPicture";
import ButtonAuth from "@/components/Button";
import {styles} from "@/styles/pages/ProfilModificationStyle"
import * as ImagePicker from "expo-image-picker";


/**
 * ProfilModificationPage
 *
 * Mobile screen that displays the user's personal information and allows
 * editing it in a controlled way.
 *
 * Features:
 * - Profile picture displayed at the center of the screen
 * - Read-only input fields (last name, first name, email, profil picture) by default
 * - “Edit” button to enable form editing
 * - “Cancel” button to restore initial values
 * - “Save” button to persist changes 
 * - Keyboard-aware layout to avoid inputs being hidden on mobile devices
 *
 * This page is designed for mobile usage and follows a simple
 * view → edit → confirm/cancel workflow.
 */
export default function ProfilModificationPage() {
  // ---- STATE ----
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(
    require("@/assets/images/profil-picture.png"));
  const [lastName, setLastName] = useState("Dupont");
  const [firstName, setFirstName] = useState("Jean");
  const [email, setEmail] = useState("jean.dupont@email.com");

  // Backup values (for cancel)
  const [initialValues, setInitialValues] = useState({
    profileImage,
    lastName,
    firstName,
    email,
  });

  // ---- HANDLERS ----
  const handleEdit = () => {
    setInitialValues({ profileImage, lastName, firstName, email });
    setIsEditing(true);
  };

  const handlePickImage = async () => {
    if (!isEditing) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        alert("Permission required to access gallery");
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const handleCancel = () => {
    setProfileImage(initialValues.profileImage);
    setLastName(initialValues.lastName);
    setFirstName(initialValues.firstName);
    setEmail(initialValues.email);
    setIsEditing(false);
  };
  
  const handleSave = () => {
    // TODO: save profile changes
    setIsEditing(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <BackButton name_page="" />
        
        <View style={styles.title}>
            <Image
            source={require("@/assets/images/edit_profil.png")}
            style={styles.editIcon}
            />

            <Text style={styles.headerTitle}>Mes informations</Text>
        </View>
        
        
        
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* PROFILE PICTURE */}
        <TouchableOpacity onPress={handlePickImage} activeOpacity={isEditing ? 0.7 : 1}>
            <ProfilePicture source={profileImage} size={120} />
        </TouchableOpacity>

        {/* FORM */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              editable={isEditing}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Prénom</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              editable={isEditing}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Adresse mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              editable={isEditing}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* ACTION BUTTONS */}
        {!isEditing ? (
          <ButtonAuth text="Modifier" onPress={handleEdit} />
        ) : (
          <View style={styles.editButtons}>
            <ButtonAuth text="Annuler" onPress={handleCancel} />
            <ButtonAuth text="Sauvegarder" onPress={handleSave}/>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

