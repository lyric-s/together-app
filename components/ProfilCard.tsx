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
    address?: string;
    zip_code?: string;
    bio?: string;
    name?: string;
    country?: string;
    rna_code?: string;
    company_name?: string;
};

type ProfileFormData = Partial<ProfileData> & {
   password?: string;
   confirmPassword?: string;
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
        case 'volunteer':
            return {
                last_name: 'Nom',
                first_name: 'Prénom',
                username: 'Nom d\'utilisateur',
                phone_number: 'N°Tel',
                birthdate: 'Date de naissance (ex:2003-04-30)',
                email: 'Adresse Mail',
                address: 'Adresse',
                zip_code: 'Code postal',
                skills: 'Compétences',
                bio: 'Biographie',
                password: 'Mot de passe',
                confirmPassword: 'Confirmez mot de passe',
            };
        case 'association':
            return {
                company_name: 'Nom de l\'association',
                name: 'Nom',
                phone_number: 'N°Tel',
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

/**
 * Render an editable profile card that displays and allows editing of a volunteer, association, or admin profile.
 *
 * @param userType - Determines which fields and labels are shown: "volunteer", "association", or "admin".
 * @param userData - Initial profile values displayed and used to populate the edit form.
 * @param onSave - Optional callback invoked with the normalized ProfileData when the user saves changes.
 * @param showAlert - Function used to display success or error alerts to the user.
 * @returns A React element displaying the profile in view mode or an editable form in edit mode.
 */
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
    const [formData, setFormData] = useState<ProfileFormData>({ ...userData });

    // Update the data when userData change (ex: after a refresh of database)
    useEffect(() => {
        setOriginalData(userData);
        if (!isEditing) setFormData({ ...userData });
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
        setFormData({ ...originalData, password: '', confirmPassword: '' });
        setIsEditing(false);
        console.log('Modifications annulées, données restaurées');
    };

    const handleSubmit = async () => {
        try {
            const normalized: ProfileData = {
                picture: formData.picture ?? DEFAULT_PHOTO,
                id_volunteer: formData.id_volunteer ?? -1,
                id_admin: formData.id_admin ?? -1,
                id_asso: formData.id_asso ?? -1,
                last_name: (formData.last_name ?? '').trim(),
                first_name: (formData.first_name ?? '').trim(),
                username: (formData.username ?? '').trim(),
                birthdate: (formData.birthdate ?? '').trim(),
                rna_code: (formData.rna_code ?? '').trim(),
                name: (formData.name ?? '').trim(),
                company_name: (formData.company_name ?? '').trim(),
                address: (formData.address ?? '').trim(),
                zip_code: (formData.zip_code ?? '').trim(),
                skills: (formData.skills ?? '').trim(),
                bio: (formData.bio ?? '').trim(),
                country: (formData.country ?? '').trim(),
                email: (formData.email ?? '').trim(),
                phone_number: (formData.phone_number ?? '').replace(/\s/g, ''),
                password: formData.password ?? '',
                confirmPassword: formData.confirmPassword ?? '',
            };
            if (userType === 'volunteer' || userType === 'admin') {
                if (!normalized.last_name) {
                    showAlert('Erreur', 'Le nom est obligatoire');
                    return;
                }
                if (!normalized.first_name) {
                    showAlert('Erreur', 'Le prénom est obligatoire');
                    return;
                }
                if (!normalized.email) {
                    showAlert('Erreur', 'L\'adresse email est obligatoire');
                    return;
                }
                if (!normalized.username) {
                    showAlert('Erreur', 'Le nom d\'utilisateur est obligatoire');
                    return;
                }
            }
            if (userType === 'volunteer') {
                if (!normalized.birthdate) {
                    showAlert('Erreur', 'La date de naissance est obligatoire');
                    return;
                }
            }
            else if (userType === 'association') {
                if (!normalized.rna_code) {
                    showAlert('Erreur', 'Le code RNA est obligatoire');
                    return;
                }
                if (!normalized.name) {
                    showAlert('Erreur', 'Le nom est obligatoire');
                    return;
                }
                if (!normalized.company_name) {
                    showAlert('Erreur', 'Le nom de l\'association est obligatoire');
                    return;
                }
            }

            if (!normalized.password) {
                showAlert('Erreur', 'Le mot de passe est obligatoire');
                return;
            }

            if (normalized.password.length < 10) {
                showAlert('Erreur', 'Le mot de passe doit avoir minimum 10 caractères');
                return;
            }

            if (!normalized.confirmPassword) {
                showAlert('Erreur', 'La confirmation du mot de passe est obligatoire');
                return;
            }

            // Check password
            if (normalized.password !== normalized.confirmPassword) {
                showAlert('Erreur', 'Les mots de passe ne correspondent pas');
                return;
            }

            // Check email
            if ((userType === 'volunteer' || userType === 'admin') && normalized.email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(normalized.email)) {
                    showAlert('Erreur', 'L\'adresse email n\'est pas valide');
                    return;
                }
            }

            // Check phone_number (FR)
            if ((userType === 'association' || userType === 'volunteer') && normalized.phone_number) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(normalized.phone_number)) {
                    showAlert('Erreur', 'Le numéro de téléphone doit contenir 10 chiffres');
                    return;
                }
            }

            // Save in database
            if (onSave) {
                await onSave(normalized);
            }

            // Update original data with new data saved
            setOriginalData({ ...normalized, password: '', confirmPassword: '' });
            setFormData(prev => ({ ...prev, ...normalized, password: '', confirmPassword: '' }));
            setIsEditing(false);
            
            showAlert('Succès', 'Profil enregistré avec succès');
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

                    {(userType === 'volunteer' || userType === 'admin') && labels.last_name && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.last_name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.last_name}
                                    value={formData.last_name ?? ''}
                                    onChangeText={(text) => handleChange('last_name', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'volunteer' || userType === 'admin') && labels.first_name && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.first_name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.first_name}
                                    value={formData.first_name ?? ''}
                                    onChangeText={(text) => handleChange('first_name', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'volunteer' || userType === 'admin') && labels.username && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.username}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.username}
                                    value={formData.username ?? ''}
                                    onChangeText={(text) => handleChange('username', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}
                    
                    {(userType === 'volunteer') && labels.birthdate && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.birthdate}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.birthdate}
                                    value={formData.birthdate ?? ''}
                                    onChangeText={(text) => handleChange('birthdate', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'association') && labels.name && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.name}
                                    value={formData.name ?? ''}
                                    onChangeText={(text) => handleChange('name', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'association') && labels.company_name && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.company_name}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.company_name}
                                    value={formData.company_name ?? ''}
                                    onChangeText={(text) => handleChange('company_name', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'volunteer' || userType === 'association') && labels.phone_number && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.phone_number}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="06 85 54 23 81"
                                    value={formData.phone_number ?? ''}
                                    onChangeText={(text) => handleChange('phone_number', text)}
                                    keyboardType="phone-pad"
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'volunteer' || userType === 'admin') && labels.email && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.email}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="exemple@gmail.com"
                                    value={formData.email ?? ''}
                                    onChangeText={(text) => handleChange('email', text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}
                    
                    {(userType === 'volunteer') && labels.address && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.address}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.address}
                                    value={formData.address ?? ''}
                                    onChangeText={(text) => handleChange('address', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'volunteer') && labels.zip_code && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.zip_code}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.zip_code}
                                    value={formData.zip_code ?? ''}
                                    onChangeText={(text) => handleChange('zip_code', text)}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'volunteer') && labels.skills && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.skills}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={[styles.input, { minHeight: 100 }]}
                                    placeholder={labels.skills}
                                    value={formData.skills ?? ''}
                                    onChangeText={(text) => handleChange('skills', text)}
                                    multiline
                                    numberOfLines={4}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {(userType === 'volunteer') && labels.bio && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.bio}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={[styles.input, { minHeight: 100 }]}
                                    placeholder={labels.bio}
                                    value={formData.bio ?? ''}
                                    onChangeText={(text) => handleChange('bio', text)}
                                    multiline
                                    numberOfLines={4}
                                />
                                <View style={styles.separator} />
                            </View>
                        </View>
                    )}

                    {userType === 'association' && labels.rna_code && (
                        <View style={styles.inputRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{labels.rna_code}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels.rna_code}
                                    value={formData.rna_code ?? ''}
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
                                value={formData.password ?? ''}
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
                                value={formData.confirmPassword ?? ''}
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
                                <Text style={styles.label}>{labels.address}</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.text}>{formData.address}</Text>
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