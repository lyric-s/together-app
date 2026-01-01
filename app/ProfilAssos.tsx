// ProfilAssos.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Sidebar from '@/components/SideBar';
import AlertToast from '@/components/AlertToast';
import { Colors } from '@/constants/colors';
import { styles } from '@/styles/pages/ProfilCSS';
import ProfilCard from '@/components/ProfilCard';
import * as DocumentPicker from 'expo-document-picker';

export default function ProfilAssos() {
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 900;
    const isVerySmallScreen = width < 610;

    const [profileUser, setProfileUser] = useState<any>({
        lastname: 'SPA',
        codeRNA: 'LMF5',
        recepisse: '0fkmel54fe',
        password: 'abcd1234',
        confirmPassword: 'abcd1234',
        description: 'La SPA (Société Protectrice des Animaux) de Bordeaux et du Sud-Ouest est une association indépendante, reconnue d’utilité publique depuis 1965, qui existe depuis 1928 et est entièrement dédiée à la protection et au bien-être des animaux dans la région bordelaise.',
        adresse: '11 Rue des Villageois',
        codePostal: '33800',
        commune: 'BORDEAUX',
        piece: null,
    });

    const [alertModal, setAlertModal] = useState({ 
        visible: false, 
        title: '', 
        message: '' 
    });

    const [savedAddress, setSavedAddress] = useState({
        adresse: profileUser.adresse,
        codePostal: profileUser.codePostal,
        commune: profileUser.commune,
        piece: profileUser.piece,
    });

    const [savedDescription, setSavedDescription] = useState(profileUser.description);

    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [editingJustificationFile, setEditingJustificationFile] = useState<any>(null);
    const [addressChanged, setAddressChanged] = useState(false);

    //const [description, setDescription] = useState('La SPA (Société Protectrice des Animaux) de Bordeaux et du Sud-Ouest est une association indépendante, reconnue d’utilité publique depuis 1965, qui existe depuis 1928 et est entièrement dédiée à la protection et au bien-être des animaux dans la région bordelaise.');

    const handleOpenAttachment = () => {
        if (savedAddress.piece) {
            Linking.openURL(savedAddress.piece.uri).catch((err) => {
                showAlert('Erreur', 'Impossible d\'ouvrir le fichier');
            });
        }
    };

    const handleAlertClose = useCallback(() => {
        setAlertModal({ visible: false, title: '', message: '' })
    }, []);

    const showAlert = useCallback((title: string, message: string) => {
        setAlertModal({ visible: true, title, message });
    }, []);

    const handleSaveProfile = async (data: any) => {
        try {
            // save to API
            setProfileUser({ ...profileUser, ...data });
            if (data.description) {
                setSavedDescription(data.description);
            }
            if (data.adresse || data.codePostal || data.commune) {
                setSavedAddress({
                    adresse: data.adresse || savedAddress.adresse,
                    codePostal: data.codePostal || savedAddress.codePostal,
                    commune: data.commune || savedAddress.commune,
                    piece: data.piece || savedAddress.piece,
                });
            }
            showAlert('Succès', 'Profil mis à jour avec succès');
        } catch (error) {
            showAlert('Erreur', 'Échec de la mise à jour du profil');
        }
    };

    useEffect(() => {
        const changed =
            profileUser.adresse !== savedAddress.adresse ||
            profileUser.codePostal !== savedAddress.codePostal ||
            profileUser.commune !== savedAddress.commune;
        setAddressChanged(changed);
    }, [profileUser.adresse, profileUser.codePostal, profileUser.commune, savedAddress]);


    const handlePickDocument = async () => {
        try {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['application/pdf', 'image/*'],
            copyToCacheDirectory: true,
        });

        if (result.assets && result.assets.length > 0) {
            setEditingJustificationFile(result.assets[0]);
            showAlert('Succès', 'Fichier ajouté avec succès');
        }
        } catch (error) {
        showAlert('Erreur', "Erreur lors de la sélection du fichier");
        }
    };

    const handleCancelDescription = () => {
        setProfileUser({ ...profileUser, description: savedDescription });
        setIsEditingDescription(false);
    };

    const handleSaveDescription = () => {
        // TODO: Appel API pour sauvegarder
        setSavedDescription(profileUser.description);
        setIsEditingDescription(false);
        showAlert('Succès', 'Description mise à jour');
    };

    const handleStartEditAddress = () => {
        setIsEditingAddress(true);
        setEditingJustificationFile(null);
    };

    const handleSaveAddress = () => {
        if (addressChanged && !editingJustificationFile) {
            showAlert(
                'Justificatif requis',
                "Vous devez joindre un justificatif pour modifier l'adresse"
            );
            return;
        }
        // TODO: Appel API pour sauvegarder avec justificationFile
        setSavedAddress({
            adresse: profileUser.adresse,
            codePostal: profileUser.codePostal,
            commune: profileUser.commune,
            piece: editingJustificationFile,
        });
        setIsEditingAddress(false);
        setEditingJustificationFile(null);
        showAlert('Succès', 'Adresse mise à jour');
    };

    const handleCancelAddress = () => {
        setProfileUser({
            ...profileUser,
            adresse: savedAddress.adresse,
            codePostal: savedAddress.codePostal,
            commune: savedAddress.commune,
            piece: savedAddress.piece,
        });
        setIsEditingAddress(false);
        setAddressChanged(false);
        setEditingJustificationFile(null);
    };

    const descriptionCard = () => {
        return (
            <>
            {/* Description Card */}
            <View style={styles.card}>
                <Text style={[styles.cardTitle, {marginBottom: 16}]}>Description</Text>
                <TextInput
                    style={styles.textArea}
                    value={profileUser.description}
                    multiline
                    numberOfLines={6}
                    editable={isEditingDescription}
                    onChangeText={(text) =>
                        setProfileUser({ ...profileUser, description: text })
                    }
                />
                {isEditingDescription ? (
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.smallButton, styles.cancelButton]}
                            onPress={handleCancelDescription}
                        >
                            <Image style={{width:15, height:15, resizeMode: 'contain'}} source={require('@/assets/images/return.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.smallButton, styles.saveButton]}
                            onPress={handleSaveDescription}
                        >
                            <Image style={{width:15, height:15, resizeMode: 'contain'}} source={require('@/assets/images/validate.png')} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={[styles.smallButton, styles.editButton]}
                        onPress={() => setIsEditingDescription(true)}
                    >
                        <Image style={{width:15, height:15, resizeMode: 'contain'}} source={require('@/assets/images/edit.png')} />
                    </TouchableOpacity>
                )}
            </View>
            </>
        );
    }

    const addressCard = () => {
        return (
            <>
            {/* Address Card */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Adresse</Text>
                    <TouchableOpacity
                        style={[styles.infoIcon, { opacity: savedAddress.piece ? 1 : 0.5 }]}
                        onPress={handleOpenAttachment}
                        disabled={!savedAddress.piece}
                    >
                        <Image source={require('@/assets/images/attachment-file.png')} style={styles.infoIconImage} />
                    </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                <Text style={styles.label}>Adresse</Text>
                <TextInput
                    style={styles.input}
                    value={profileUser.adresse}
                    editable={isEditingAddress}
                    onChangeText={(text) => {
                    setProfileUser({ ...profileUser, adresse: text });
                    }}
                />
                </View>

                <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Code Postal</Text>
                    <TextInput
                    style={styles.input}
                    value={profileUser.codePostal}
                    editable={isEditingAddress}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        setProfileUser({
                        ...profileUser,
                        codePostal: text,
                        });
                    }}
                    />
                </View>

                <View style={[styles.formGroup, { flex: 1, marginLeft: 10 }]}>
                    <Text style={styles.label}>Commune</Text>
                    <TextInput
                    style={styles.input}
                    value={profileUser.commune}
                    editable={isEditingAddress}
                    onChangeText={(text) => {
                        setProfileUser({
                        ...profileUser,
                        commune: text,
                        });
                    }}
                    />
                </View>
                </View>

                {isEditingAddress && addressChanged && (
                <View style={styles.fileSection}>
                    <Text style={styles.warningText}>
                    ⚠️ Modification d'adresse - Justificatif obligatoire
                    </Text>
                    <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={handlePickDocument}
                    >
                    <Text style={styles.uploadButtonText}>
                        {editingJustificationFile
                        ? '✓ Fichier ajouté'
                        : '📎 Joindre un justificatif'}
                    </Text>
                    </TouchableOpacity>
                    {editingJustificationFile && (
                    <Text style={styles.fileName}>{editingJustificationFile.name}</Text>
                    )}
                </View>
                )}

                {isEditingAddress ? (
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                    style={[styles.smallButton, styles.cancelButton]}
                    onPress={handleCancelAddress}
                    >
                        <Image style={{width:15, height:15, resizeMode: 'contain'}} source={require('@/assets/images/return.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.smallButton, styles.saveButton]}
                    onPress={handleSaveAddress}
                    >
                        <Image style={{width:15, height:15, resizeMode: 'contain'}} source={require('@/assets/images/validate.png')} />
                    </TouchableOpacity>
                </View>
                ) : (
                <TouchableOpacity
                    style={[styles.smallButton, styles.editButton]}
                    onPress={handleStartEditAddress}
                >
                    <Image style={{width:15, height:15, resizeMode: 'contain'}} source={require('@/assets/images/edit.png')} />
                </TouchableOpacity>
                )}
            </View>
            </>
        );
    }

    const rightColumnContent = () => {
        return (
        <>
            {descriptionCard()}

            {addressCard()}
        </>
    )};
    
    if(isVerySmallScreen){
        return (
        <>
            <LinearGradient
                colors={[Colors.white, Colors.orangeVeryLight]}
                style={{ flex: 1 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            >
            <AlertToast
                visible={alertModal.visible}
                title={alertModal.title}
                message={alertModal.message}
                onClose={handleAlertClose}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Sidebar
                    userType='association'
                    userName='SPA'
                    onNavigate={(route: string) => {router.push(('/' + route) as any)}}
                />
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <Text style={[styles.pageTitle, {paddingLeft : 40}]}>Mon profil</Text>
                    <Text style={[styles.text, {paddingLeft : 40}]}>Toutes les données vous concernant</Text>
                        <View style={{ marginBottom: -60 }}>
                            <ProfilCard
                                userType = 'asso'
                                userData = {profileUser}
                                onSave={handleSaveProfile}
                                showAlert={showAlert}
                            />
                        </View>
                        <View>
                            {descriptionCard()}

                            {addressCard()}
                        </View>
                </ScrollView>
            </View>       
        </LinearGradient>
        </>
    )};
    

    return (
        <>
            <LinearGradient
                colors={[Colors.white, Colors.orangeVeryLight]}
                style={{ flex: 1 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            >
            <AlertToast
                visible={alertModal.visible}
                title={alertModal.title}
                message={alertModal.message}
                onClose={handleAlertClose}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Sidebar
                    userType='association'
                    userName='SPA'
                    onNavigate={(route: string) => {router.push(('/' + route) as any)}}
                />

                <View style={{ flex: 1}}>
                    {isSmallScreen ? (
                        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                            <Text style={[styles.pageTitle, {paddingLeft : 40}]}>Mon profil</Text>
                            <Text style={[styles.text, {paddingLeft : 40}]}>Toutes les données vous concernant</Text>
                            <View style={styles.desktopLayout}>
                                <View style={styles.leftColumn}>
                                    <ProfilCard
                                        userType = 'asso'
                                        userData = {profileUser}
                                        onSave={handleSaveProfile}
                                        showAlert={showAlert}
                                    />
                                </View>
                                <View style={styles.rightColumn}>
                                    {rightColumnContent()}
                                </View>
                            </View>
                        </ScrollView>
                    ) : (
                        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                            <Text style={styles.pageTitle}>Mon profil</Text>
                            <Text style={styles.text}>Toutes les données vous concernant</Text>
                            <View style={styles.desktopLayout}>
                                <View style={styles.leftColumn}>
                                    <ProfilCard
                                        userType = 'asso'
                                        userData = {profileUser}
                                        onSave={handleSaveProfile}
                                        showAlert={showAlert}
                                    />
                                </View>
                                <View style={styles.rightColumn}>
                                    {rightColumnContent()}
                                </View>
                            </View>
                        </ScrollView>
                    )}
                </View>
            </View>
            </LinearGradient>
        </>
    );
}