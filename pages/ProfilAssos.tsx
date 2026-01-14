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
import { AssociationProfile, UserProfile } from '@/types/ProfileUser';

/**
 * Renders the association profile screen with editable description and address sections.
 *
 * Displays a responsive layout (single or two-column) containing a profile card, description card, and address card.
 * Provides local editing workflows for description and address, including save/cancel controls, address-change detection,
 * required justification file attachment when the address changes, document picking, and user feedback via alert toasts.
 *
 * @returns The rendered component tree for the association profile screen.
 */

export default function ProfilAssos() {
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 900;
    const isVerySmallScreen = width < 610;

    const [profileUser, setProfileUser] =
        useState<AssociationProfile>({
            email: 'jfizrg@zg.com',
            username: 'SPA',
            type: 'association',
            id_asso: 1,
            name: "Les Amis de la Bibliothèque",
            phone_number: "+33 1 23 45 67 89",
            rna_code: "W751234567",
            company_name: "Association Les Amis de la Bibliothèque",
            description: "Association culturelle dédiée à la promotion de la lecture et l'accès à la culture pour tous.",
            address: "12 Rue des Livres",
            zip_code: "75005",
            country: "France"

    });

    const [isPageLoading, setIsPageLoading] = useState(true);

    const validateAssociationProfile = (data: AssociationProfile): string | null => {
        if (!data.name?.trim()) return "Le nom de l'association est requis.";
        if (!data.email?.trim()) return "L'email est requis.";
        if (!data.phone_number?.trim()) return "Le numéro de téléphone est requis.";
        if (!data.rna_code?.trim()) return "Le code RNA est requis.";
        if (data.zip_code && !/^\d{5}$/.test(data.zip_code)) {
            return 'Le code postal est invalide.';
        }
        return null;
    };


    const [alertModal, setAlertModal] = useState({ 
        visible: false, 
        title: '', 
        message: '' 
    });

    const [editingJustificationFile, setEditingJustificationFile] =
        useState<DocumentPicker.DocumentPickerAsset | null>(null);

    const [savedAddress, setSavedAddress] = useState({
    address: profileUser?.address,
    zip_code: profileUser?.zip_code,
    });

    const [savedDescription, setSavedDescription] =
        useState(profileUser?.description);


    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    
    const [addressChanged, setAddressChanged] = useState(false);


    const handleAlertClose = useCallback(() => {
        setAlertModal({ visible: false, title: '', message: '' })
    }, []);

    const showAlert = useCallback((title: string, message: string) => {
        setAlertModal({ visible: true, title, message });
    }, []);

    const handleSave = async (data: UserProfile): Promise<void> => {
        if (!profileUser || data.type !== 'association') {
            showAlert('Erreur', 'Profil invalide.');
            return;
    }

    const error = validateAssociationProfile(data);
    if (error) {
        showAlert('Erreur', error);
        return;
    }

    try {
        const payload = {
        name: data.name ?? profileUser.name,
        email: data.email ?? profileUser.email,
        phone_number: data.phone_number ?? profileUser.phone_number,
        rna_code: data.rna_code ?? profileUser.rna_code,
        company_name: data.company_name ?? profileUser.company_name,
        description: data.description ?? profileUser.description,
        address: data.address ?? profileUser.address,
        zip_code: data.zip_code ?? profileUser.zip_code,
        };

        // await associationService.updateProfile(profileUser.id_asso, payload);

        setProfileUser(prev => prev ? { ...prev, ...payload } : prev);
        showAlert('Succès', 'Profil mis à jour avec succès.');
    } catch (error) {
            showAlert('Erreur', "Échec de la mise à jour du profil.");
        }
    };


    useEffect(() => {
        const changed =
            profileUser?.address !== savedAddress.address ||
            profileUser?.zip_code !== savedAddress.zip_code;

        setAddressChanged(changed);
    }, [profileUser?.address, profileUser?.zip_code]);

    const handleCancelDescription = () => {
        if (!profileUser) return;

        setProfileUser({
            ...profileUser,
            description: savedDescription,
        });

        setIsEditingDescription(false);
    };

    const handleSaveDescription = () => {
        setSavedDescription(profileUser?.description);
        setIsEditingDescription(false);
        showAlert('Succès', 'Description mise à jour');
    };

    const handleCancelAddress = () => {
        if (!profileUser) return;

        setProfileUser({
            ...profileUser,
            address: savedAddress.address,
            zip_code: savedAddress.zip_code,
        });

        setIsEditingAddress(false);
        setAddressChanged(false);
    };


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
            address: profileUser?.address,
            zip_code: profileUser?.zip_code,
        });

        setIsEditingAddress(false);
        setEditingJustificationFile(null);
        showAlert('Succès', 'Adresse mise à jour');
    };


    const descriptionCard = () => {
        return (
            <>
            {/* Description Card */}
            <View style={styles.card}>
                <Text style={[styles.cardTitle, {marginBottom: 16}]}>Description</Text>
                <TextInput
                    style={styles.textArea}
                    value={profileUser?.description}
                    editable={isEditingDescription}
                    multiline
                    onChangeText={(text) => {
                        if (!profileUser) return;
                        setProfileUser({
                        ...profileUser,
                        description: text,
                        });
                    }}
                />

                {isEditingDescription ? (
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.smallButton, styles.cancelButton]}
                            onPress={handleCancelDescription}
                        >
                            <Image style={styles.imageBtn} source={require('@/assets/images/return.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.smallButton, styles.saveButton]}
                            onPress={handleSaveDescription}
                        >
                            <Image style={styles.imageBtn} source={require('@/assets/images/validate.png')} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={[styles.smallButton, styles.editButton]}
                        onPress={() => setIsEditingDescription(true)}
                    >
                        <Image style={styles.imageBtn} source={require('@/assets/images/edit.png')} />
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
                    {/* ???? */}
                </View>

                <View style={styles.formGroup}>
                <Text style={styles.label}>Adresse</Text>
                <TextInput
                    style={styles.input}
                    value={profileUser?.address}
                    editable={isEditingAddress}
                    onChangeText={(text) => {
                        if (!profileUser) return;
                        setProfileUser({
                        ...profileUser,
                        address: text,
                        });
                    }}
                />

                </View>

                <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Code Postal</Text>
                    <TextInput
                        style={styles.input}
                        value={profileUser?.zip_code}
                        keyboardType="numeric"
                        editable={isEditingAddress}
                        onChangeText={(text) => {
                            if (!profileUser) return;
                            setProfileUser({
                            ...profileUser,
                            zip_code: text,
                            });
                        }}
                    />

                </View>

                
            </View>

                

                {isEditingAddress ? (
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                    style={[styles.smallButton, styles.cancelButton]}
                    onPress={handleCancelAddress}
                    >
                        <Image style={styles.imageBtn} source={require('@/assets/images/return.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.smallButton, styles.saveButton]}
                    onPress={handleSaveAddress}
                    >
                        <Image style={styles.imageBtn} source={require('@/assets/images/validate.png')} />
                    </TouchableOpacity>
                </View>
                ) : (
                <TouchableOpacity
                    style={[styles.smallButton, styles.editButton]}
                    onPress={handleStartEditAddress}
                >
                    <Image style={styles.imageBtn} source={require('@/assets/images/edit.png')} />
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
        );
    };

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

                <View style={{ flex: 1}}>
                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <Text style={[styles.pageTitle, isSmallScreen && {paddingLeft: 40}]}>Mon profil</Text>
                        <Text style={[styles.text, isSmallScreen && {paddingLeft: 40}]}>Toutes les données vous concernant</Text>
                        {isVerySmallScreen ? (
                        <>
                        <View style={{ alignItems: 'center', gap: 20 }}>
                            <ProfilCard
                                userType="association"
                                userData={profileUser}
                                onSave={handleSave}
                                showAlert={showAlert}
                            />
                            {rightColumnContent()}
                        </View>
                        </>
                        ) : (
                        <View style={styles.desktopLayout}>
                            <View style={styles.leftColumn}>
                                <ProfilCard
                                    userType="association"
                                    userData={profileUser}
                                    onSave={handleSave}
                                    showAlert={showAlert}
                                />

                            </View>
                            <View style={styles.rightColumn}>
                                {rightColumnContent()}
                            </View>
                        </View>
                        )}
                    </ScrollView>
                </View>
            </View>
            </LinearGradient>
        </>
    );
}