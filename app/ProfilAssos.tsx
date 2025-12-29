// ProfilAssos.tsx
import React, { useState, useCallback } from 'react';
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

export default function ProfilVolunteer() {
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
    });

    const [alertModal, setAlertModal] = useState({ 
        visible: false, 
        title: '', 
        message: '' 
    });

    const [initialAddress] = useState({
        adresse: '11 Rue des Villageois',
        codePostal: '33800',
        commune: 'BORDEAUX',
    });

    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [justificationFile, setJustificationFile] = useState<any>(null);
    const [addressChanged, setAddressChanged] = useState(false);

    //const [description, setDescription] = useState('La SPA (Société Protectrice des Animaux) de Bordeaux et du Sud-Ouest est une association indépendante, reconnue d’utilité publique depuis 1965, qui existe depuis 1928 et est entièrement dédiée à la protection et au bien-être des animaux dans la région bordelaise.');

    const handleOpenAttachment = () => {
        if (justificationFile) {
            Linking.openURL(justificationFile.uri);
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
        setProfileUser({ ...profileUser, ...data });
        showAlert('Succès', 'Profil mis à jour avec succès');
        } catch (error) {
        showAlert('Erreur', 'Échec de la mise à jour du profil');
        }
    };

    const checkAddressChange = () => {
        const changed =
            profileUser.adresse !== initialAddress.adresse ||
            profileUser.codePostal !== initialAddress.codePostal ||
            profileUser.commune !== initialAddress.commune;
        setAddressChanged(changed);
        return changed;
    };

    const handlePickDocument = async () => {
        try {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['application/pdf', 'image/*'],
            copyToCacheDirectory: true,
        });

        if (result.assets && result.assets.length > 0) {
            setJustificationFile(result.assets[0]);
            showAlert('Succès', 'Fichier ajouté avec succès');
        }
        } catch (error) {
        showAlert('Erreur', "Erreur lors de la sélection du fichier");
        }
    };

    const handleSaveDescription = () => {
        setIsEditingDescription(false);
        showAlert('Succès', 'Description mise à jour');
        // TODO: Appel API pour sauvegarder
    };

    const handleSaveAddress = () => {
        if (checkAddressChange() && !justificationFile) {
        showAlert(
            'Justificatif requis',
            "Vous devez joindre un justificatif pour modifier l'adresse"
        );
        return;
        }

        setIsEditingAddress(false);
        showAlert('Succès', 'Adresse mise à jour');
        // TODO: Appel API pour sauvegarder avec justificationFile
    };

    const handleCancelAddress = () => {
        setProfileUser({
        ...profileUser,
        adresse: initialAddress.adresse,
        codePostal: initialAddress.codePostal,
        commune: initialAddress.commune,
        });
        setIsEditingAddress(false);
        setJustificationFile(null);
        setAddressChanged(false);
    };
    
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
                            {/* Description Card */}
                            <View style={[styles.card, { marginBottom: 20 }]}>
                                <Text style={styles.cardTitle}>Description</Text>
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
                                            onPress={() => setIsEditingDescription(false)}
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

                            {/* Address Card */}
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>Adresse</Text>
                                    <TouchableOpacity
                                        style={[styles.infoIcon, { opacity: justificationFile ? 1 : 0.5 }]}
                                        onPress={handleOpenAttachment}
                                        disabled={!justificationFile}
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
                                    checkAddressChange();
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
                                        checkAddressChange();
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
                                        checkAddressChange();
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
                                        {justificationFile
                                        ? '✓ Fichier ajouté'
                                        : '📎 Joindre un justificatif'}
                                    </Text>
                                    </TouchableOpacity>
                                    {justificationFile && (
                                        <Text style={styles.fileName}>{justificationFile.name}</Text>
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
                                    onPress={() => setIsEditingAddress(true)}
                                >
                                    <Image style={{width:15, height:15, resizeMode: 'contain'}} source={require('@/assets/images/edit.png')} />
                                </TouchableOpacity>
                                )}
                            </View>
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
                                    {/* Description Card */}
                                    <View style={styles.card}>
                                        <Text style={styles.cardTitle}>Description</Text>
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
                                                    onPress={() => setIsEditingDescription(false)}
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

                                    {/* Address Card */}
                                    <View style={styles.card}>
                                        <View style={styles.cardHeader}>
                                        <Text style={styles.cardTitle}>Adresse</Text>
                                        <TouchableOpacity
                                            style={[styles.infoIcon, { opacity: justificationFile ? 1 : 0.5 }]}
                                            onPress={handleOpenAttachment}
                                            disabled={!justificationFile}
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
                                            checkAddressChange();
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
                                                checkAddressChange();
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
                                                checkAddressChange();
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
                                                {justificationFile
                                                ? '✓ Fichier ajouté'
                                                : '📎 Joindre un justificatif'}
                                            </Text>
                                            </TouchableOpacity>
                                            {justificationFile && (
                                            <Text style={styles.fileName}>{justificationFile.name}</Text>
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
                                            onPress={() => setIsEditingAddress(true)}
                                        >
                                            <Image style={{width:15, height:15, resizeMode: 'contain'}} source={require('@/assets/images/edit.png')} />
                                        </TouchableOpacity>
                                        )}
                                    </View>
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
                                    {/* Description Card */}
                                    <View style={styles.card}>
                                        <Text style={styles.cardTitle}>Description</Text>
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
                                                    onPress={() => setIsEditingDescription(false)}
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

                                    {/* Address Card */}
                                    <View style={styles.card}>
                                        <View style={styles.cardHeader}>
                                        <Text style={styles.cardTitle}>Adresse</Text>
                                        <TouchableOpacity
                                            style={[styles.infoIcon, { opacity: justificationFile ? 1 : 0.5 }]}
                                            onPress={handleOpenAttachment}
                                            disabled={!justificationFile}
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
                                            checkAddressChange();
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
                                                checkAddressChange();
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
                                                checkAddressChange();
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
                                                {justificationFile
                                                ? '✓ Fichier ajouté'
                                                : '📎 Joindre un justificatif'}
                                            </Text>
                                            </TouchableOpacity>
                                            {justificationFile && (
                                            <Text style={styles.fileName}>{justificationFile.name}</Text>
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
                                            onPress={() => setIsEditingAddress(true)}
                                        >
                                            <Image style={{width:15, height:15, resizeMode: 'contain'}} source={require('@/assets/images/edit.png')} />
                                        </TouchableOpacity>
                                        )}
                                    </View>
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