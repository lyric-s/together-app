import { useState, useEffect } from 'react';
import { styles } from '@/styles/components/ProfilCardStyle';
import { Platform, Alert, ScrollView, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from './ImageButton';
import { FormData } from '@/types/profile'; 

type UserType = 'asso' | 'benevole' | 'admin';

type FormLabels = {
    lastname: string;
    firstname?: string;
    email?: string;
    mobile?: string;
    role?: string;
    codeRNA?: string;
    recepisse?: string;
    password: string;
    confirmPassword: string;
};

type Props = {
    userType: UserType;
    userData: FormData; // Data of the user from the database
    onSave?: (data: FormData) => Promise<void>; // Function to save into the database
    showAlert: (title: string, message: string) => void;
};

const DEFAULT_PHOTO = require('@/assets/images/profil-picture.png');

// Labels according to the type of user
const getLabels = (userType: UserType): FormLabels => {
    switch (userType) {
        case 'benevole':
            return {
                lastname: 'Nom',
                firstname: 'Prénom',
                email: 'Adresse Mail',
                password: 'Mot de passe',
                confirmPassword: 'Confirmez mot de passe',
            };
        case 'asso':
            return {
                lastname: 'Nom de l\'association',
                codeRNA: 'Code RNA',
                recepisse: 'Récépissé préfectoral',
                password: 'Mot de passe',
                confirmPassword: 'Confirmez mot de passe',
            };
        case 'admin':
            return {
                lastname: 'Nom',
                firstname: 'Prénom',
                email: 'Adresse Mail',
                mobile: 'N° de téléphone',
                role: 'Rôle',
                password: 'Mot de passe',
                confirmPassword: 'Confirmez mot de passe',
            };
        default:
            return {
                lastname: 'Nom',
                password: 'Mot de passe',
                confirmPassword: 'Confirmez mot de passe',
            };
    }
};

export default function ProfilCard({
    userType,
    userData,
    onSave,
    showAlert,
}: Props) {

    // Function to show alerts (compatible web and mobile)
    /*const showAlert = (title: string, message: string) => {
        if (Platform.OS === 'web') {
            alert(`${title}\n\n${message}`);
        } else {
            Alert.alert(title, message);
        }
    };*/
    
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        // Creation of copy of original data
        setFormData({ ...originalData });
        setIsEditing(true);
    }

    const labels = getLabels(userType);
    
    // Original data (immutable copy)
    const [originalData, setOriginalData] = useState<FormData>(userData);
    
    // Editable data (working copy)
    const [formData, setFormData] = useState<FormData>({ ...userData });

    // Update the data when userData change (ex: after a refresh of database)
    useEffect(() => {
        setOriginalData(userData);
        setFormData({ ...userData });
    }, [userData]);

    const handleChange = (field: string, value: string) => {
        // Only working copy
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImagePick = async () => {
        // Ask permission to access gallery
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
            showAlert('Permission refusée', 'Vous devez autoriser l\'accès à la galerie pour changer votre photo de profil.');
            return;
        }

        // Open gallery
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], //ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets[0]) {
            setFormData(prev => ({ ...prev, picture: { uri: result.assets[0].uri } }));
        }
    };

    const handleCancel = () => {
        // Cancel changes: restore original data
        setFormData({ ...originalData });
        setIsEditing(false);
        console.log('Modifications annulées, données restaurées');
    };

    const handleSubmit = async () => {
        try {
            if (!formData.lastname.trim()) {
                showAlert('Erreur', 'Le nom est obligatoire');
                return;
            }

            if (userType === 'benevole') {
                if (!formData.firstname.trim()) {
                    showAlert('Erreur', 'Le prénom est obligatoire');
                    return;
                }
                if (!formData.email.trim()) {
                    showAlert('Erreur', 'L\'adresse email est obligatoire');
                    return;
                }
            } else if (userType === 'asso') {
                if (!formData.codeRNA.trim()) {
                    showAlert('Erreur', 'Le code RNA est obligatoire');
                    return;
                }
                if (!formData.recepisse.trim()) {
                    showAlert('Erreur', 'Le récépissé préfectoral est obligatoire');
                    return;
                }
            } else if (userType === 'admin') {
                if (!formData.firstname.trim()) {
                    showAlert('Erreur', 'Le prénom est obligatoire');
                    return;
                }
                if (!formData.email.trim()) {
                    showAlert('Erreur', 'L\'adresse email est obligatoire');
                    return;
                }
                if (!formData.mobile.trim()) {
                    showAlert('Erreur', 'Le numéro de téléphone est obligatoire');
                    return;
                }
                if (!formData.role.trim()) {
                    showAlert('Erreur', 'Le rôle est obligatoire');
                    return;
                }
            }

            if (!formData.password) {
                showAlert('Erreur', 'Le mot de passe est obligatoire');
                return;
            }

            if (formData.password.length < 10) {
                showAlert('Erreur', 'Le mot de passe doit avoir minimum 10 caractères');
                return;
            }

            if (!formData.confirmPassword) {
                showAlert('Erreur', 'La confirmation du mot de passe est obligatoire');
                return;
            }

            // Check password
            if (formData.password !== formData.confirmPassword) {
                showAlert('Erreur', 'Les mots de passe ne correspondent pas');
                return;
            }

            // Check email
            if ((userType === 'benevole' || userType === 'admin') && formData.email.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    showAlert('Erreur', 'L\'adresse email n\'est pas valide');
                    return;
                }
            }

            // Check mobile number (FR)
            if (userType === 'admin' && formData.mobile.trim()) {
                const phoneRegex = /^[0-9]{10}$/;
                const cleanPhone = formData.mobile.replace(/\s/g, '');
                if (!phoneRegex.test(cleanPhone)) {
                    showAlert('Erreur', 'Le numéro de téléphone doit contenir 10 chiffres');
                    return;
                }
            }

            // Save in database
            if (onSave) {
                await onSave(formData);
            }

            // Update original data with new data saved
            setOriginalData({ ...formData });
            setIsEditing(false);
            
            showAlert('Succès', 'Profil enregistré avec succès');
            console.log('Données sauvegardées:', formData);
        } catch (error) {
            showAlert('Erreur', 'Impossible de sauvegarder les modifications');
            console.error('Erreur de sauvegarde:', error);
        }
    };

    return (
        <ScrollView
            style={styles.card}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            {isEditing ? (
                <>
                    <View>
                        <TouchableOpacity onPress={handleImagePick}>
                            <Image 
                                source={formData.picture || DEFAULT_PHOTO} 
                                style={styles.photo} 
                            />
                            <View style={styles.editIconContainer}>
                                <Text style={styles.editIcon}>📷</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>{labels.lastname}</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder={labels.lastname}
                                value={formData.lastname}
                                onChangeText={(text) => handleChange('lastname', text)}
                            />
                            <View style={styles.separator} />
                        </View>
                    </View>

                    {(userType === 'benevole' || userType === 'admin') && labels.firstname && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.firstname}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.firstname}
                                    value={formData.firstname}
                                    onChangeText={(text) => handleChange('firstname', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'benevole' || userType === 'admin') && labels.email && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.email}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="exemple@gmail.com"
                                    value={formData.email}
                                    onChangeText={(text) => handleChange('email', text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {userType === 'admin' && labels.mobile && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.mobile}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="06 85 54 23 81"
                                    value={formData.mobile}
                                    onChangeText={(text) => handleChange('mobile', text)}
                                    keyboardType="phone-pad"
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {userType === 'admin' && labels.role && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.role}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Administrateur"
                                    value={formData.role}
                                    onChangeText={(text) => handleChange('role', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {userType === 'asso' && labels.codeRNA && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.codeRNA}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="W123456789"
                                    value={formData.codeRNA}
                                    onChangeText={(text) => handleChange('codeRNA', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {userType === 'asso' && labels.recepisse && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.recepisse}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="N° de récépissé"
                                    value={formData.recepisse}
                                    onChangeText={(text) => handleChange('recepisse', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    <View style={styles.inputRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>{labels.password}</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••••"
                                value={formData.password}
                                onChangeText={(text) => handleChange('password', text)}
                                secureTextEntry
                            />
                            <View style={styles.separator} />
                        </View>
                    </View>

                    <View style={styles.inputRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>{labels.confirmPassword}</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••••"
                                value={formData.confirmPassword}
                                onChangeText={(text) => handleChange('confirmPassword', text)}
                                secureTextEntry
                            />
                            <View style={styles.separator} />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonWrapper}>
                            <CustomButton
                                image={require('@/assets/images/return.png')}
                                onPress={handleCancel}
                                style={{width:130, height:36, marginBottom: 20,}}
                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <CustomButton
                                image={require('@/assets/images/validate.png')}
                                onPress={handleSubmit}
                                style={{width:130, height:36, marginBottom: 20,}}
                            />
                        </View>
                    </View>
                </>
            ) : (
                <>
                    <Image
                        source={formData.picture || DEFAULT_PHOTO} 
                        style={styles.photo}
                    />
                    
                    <View style={styles.inputRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>{labels.lastname}</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.text}>{formData.lastname}</Text>
                            <View style={styles.separator} />
                        </View>
                    </View>

                    {(userType === 'benevole' || userType === 'admin') && labels.firstname && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.firstname}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.firstname}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'benevole' || userType === 'admin') && labels.email && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.email}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.email}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {userType === 'admin' && labels.mobile && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.mobile}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.mobile}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {userType === 'admin' && labels.role && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.role}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.role}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {userType === 'asso' && labels.codeRNA && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.codeRNA}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.codeRNA}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {userType === 'asso' && labels.recepisse && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.recepisse}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.recepisse}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    <View style={styles.inputRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>{labels.password}</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.text}>{'•'.repeat(formData.password.length || 10)}</Text>
                            <View style={styles.separator} />
                        </View>
                    </View>
            
                    <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', }}>
                        <CustomButton
                            image={require('@/assets/images/edit.png')}
                            onPress={handleEdit}
                            style={{width:150, height:36, marginBottom: 20,}}
                        />
                    </View>
                </>
            )}
        </ScrollView>
    );
}
