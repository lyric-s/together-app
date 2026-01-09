import { useState, useEffect } from 'react';
import { styles } from '@/styles/components/ProfilCardStyle';
import { ScrollView, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from './ImageButton';
import { ProfileData } from '@/types/ProfileUser';
import { UserType } from '@/context/AuthContext';

type ProfileLabels = {
    username?: string;
    last_name?: string;
    first_name?: string;
    birthdate?: string;
    email?: string;
    password: string;
    confirmPassword: string;
    phone_number?: string;
    skills?: string;
    adress?: string;
    zip_code?: string;
    bio?: string;
    name?: string;
    country?: string;
    rna_code?: string;
    company_name?: string;
};

type Props = {
    userType: UserType;
    userData: ProfileData; // Data of the user from the database
    onSave?: (data: ProfileData) => Promise<void>; // Function to save into the database
    showAlert: (title: string, message: string) => void;
};

const DEFAULT_PHOTO = require('@/assets/images/profil-picture.png');

// Labels according to the type of user
const getLabels = (userType: UserType): ProfileLabels => {
    switch (userType) {
        case 'benevole':
            return {
                last_name: 'Nom',
                first_name: 'Prénom',
                username: 'Nom d\'utilisateur',
                phone_number: '0765253512',
                birthdate: '2003-04-30',
                email: 'Adresse Mail',
                adress: 'Adresse',
                zip_code: 'Code postal',
                skills: 'Compétences',
                bio: 'Biographie',
                password: 'Mot de passe',
                confirmPassword: 'Confirmez mot de passe',
            };
        case 'asso':
            return {
                company_name: 'Nom de l\'association',
                name: 'Nom',
                phone_number: '0105066548',
                rna_code: 'Code RNA',
                password: 'Mot de passe',
                confirmPassword: 'Confirmez mot de passe',
            };
        case 'admin':
            return {
                last_name: 'Nom',
                first_name: 'Prénom',
                username: 'Nom d\'utilisateur',
                email: 'Adresse Mail',
                password: 'Mot de passe',
                confirmPassword: 'Confirmez mot de passe',
            };
        default:
            return {
                last_name: 'Nom',
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
    
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        // Creation of copy of original data
        setFormData({ ...originalData });
        setIsEditing(true);
    }

    const labels = getLabels(userType);
    
    // Original data (immutable copy)
    const [originalData, setOriginalData] = useState<ProfileData>(userData);
    
    // Editable data (working copy)
    const [formData, setFormData] = useState<ProfileData>({ ...userData });

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
            if (userType === 'benevole' || userType === 'admin') {
                if (!formData.last_name.trim()) {
                    showAlert('Erreur', 'Le nom est obligatoire');
                    return;
                }
                if (!formData.first_name.trim()) {
                    showAlert('Erreur', 'Le prénom est obligatoire');
                    return;
                }
                if (!formData.email.trim()) {
                    showAlert('Erreur', 'L\'adresse email est obligatoire');
                    return;
                }
                if (!formData.username.trim()) {
                    showAlert('Erreur', 'Le nom d\'utilisateur est obligatoire');
                    return;
                }
            }
            if (userType === 'benevole') {
                if (!formData.birthdate.trim()) {
                    showAlert('Erreur', 'La date de naissance est obligatoire');
                    return;
                }
            }
            else if (userType === 'asso') {
                if (!formData.rna_code.trim()) {
                    showAlert('Erreur', 'Le code RNA est obligatoire');
                    return;
                }
                if (!formData.name.trim()) {
                    showAlert('Erreur', 'Le nom est obligatoire');
                    return;
                }
                if (!formData.company_name.trim()) {
                    showAlert('Erreur', 'Le nom de l\'association est obligatoire');
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

            // Check phone_number (FR)
            if (userType === 'asso' || userType === 'benevole' && formData.phone_number.trim()) {
                const phoneRegex = /^[0-9]{10}$/;
                const cleanPhone = formData.phone_number.replace(/\s/g, '');
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

                    {(userType === 'benevole' || userType === 'admin') && labels.last_name && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.last_name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.last_name}
                                    value={formData.last_name}
                                    onChangeText={(text) => handleChange('last_name', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'benevole' || userType === 'admin') && labels.first_name && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.first_name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.first_name}
                                    value={formData.first_name}
                                    onChangeText={(text) => handleChange('first_name', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'benevole' || userType === 'admin') && labels.username && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.username}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.username}
                                    value={formData.username}
                                    onChangeText={(text) => handleChange('username', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}
                    
                    {(userType === 'benevole') && labels.birthdate && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.birthdate}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.birthdate}
                                    value={formData.birthdate}
                                    onChangeText={(text) => handleChange('birthdate', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'asso') && labels.name && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.name}
                                    value={formData.name}
                                    onChangeText={(text) => handleChange('name', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'asso') && labels.company_name && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.company_name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.company_name}
                                    value={formData.company_name}
                                    onChangeText={(text) => handleChange('company_name', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {userType === 'benevole' || userType === 'asso' && labels.phone_number && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.phone_number}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="06 85 54 23 81"
                                    value={formData.phone_number}
                                    onChangeText={(text) => handleChange('phone_number', text)}
                                    keyboardType="phone-pad"
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
                    
                    {(userType === 'benevole') && labels.adress && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.adress}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.adress}
                                    value={formData.adress}
                                    onChangeText={(text) => handleChange('adress', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'benevole') && labels.zip_code && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.zip_code}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.zip_code}
                                    value={formData.zip_code}
                                    onChangeText={(text) => handleChange('zip_code', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'benevole') && labels.skills && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.skills}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={[styles.input, { minHeight: 100 }]}
                                    placeholder={labels.skills}
                                    value={formData.skills}
                                    onChangeText={(text) => handleChange('skills', text)}
                                    multiline
                                    numberOfLines={4}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'benevole') && labels.bio && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.bio}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={[styles.input, { minHeight: 100 }]}
                                    placeholder={labels.bio}
                                    value={formData.bio}
                                    onChangeText={(text) => handleChange('bio', text)}
                                    multiline
                                    numberOfLines={4}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {userType === 'asso' && labels.rna_code && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.rna_code}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.rna_code}
                                    value={formData.rna_code}
                                    onChangeText={(text) => handleChange('rna_code', text)}
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

                    {(userType === 'volunteer' || userType === 'admin') && labels.last_name && formData.last_name ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.last_name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.last_name}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}

                    {(userType === 'volunteer' || userType === 'admin') && labels.first_name && formData.first_name ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.first_name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.first_name}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}

                    {(userType === 'volunteer' || userType === 'admin') && labels.username && formData.username ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.username}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.username}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}
                    
                    {(userType === 'volunteer') && labels.birthdate && formData.birthdate ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.birthdate}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.birthdate}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}

                    {(userType === 'association') && labels.name && formData.name ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.name}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}

                    {(userType === 'association') && labels.company_name && formData.company_name ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.company_name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.company_name}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}

                    {(userType === 'volunteer' || userType === 'association') && labels.phone_number && formData.phone_number ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.phone_number}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                               <Text style={styles.text}>{formData.phone_number}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}

                    {(userType === 'volunteer' || userType === 'admin') && labels.email && formData.email ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.email}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.email}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}
                    
                    {(userType === 'volunteer') && labels.address && formData.address ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.adress}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.adress}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}

                    {(userType === 'volunteer') && labels.zip_code && formData.zip_code ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.zip_code}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.zip_code}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}

                    {(userType === 'volunteer') && labels.skills && formData.skills ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.skills}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.skills}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}

                    {(userType === 'volunteer') && labels.bio && formData.bio ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.bio}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.bio}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}

                    {userType === 'association' && labels.rna_code && formData.rna_code ? (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.rna_code}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.rna_code}</Text>
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ) : null}
            
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
