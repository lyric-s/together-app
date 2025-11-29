import { Colors } from '@/constants/colors';
import { useState } from 'react';
import { styles } from '@/styles/components/ProfilCardStyle';
import { Alert, ScrollView, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from './ImageButton';

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

type FormData = {
    picture: any;
    lastname: string;
    firstname: string;
    email: string;
    mobile: string;
    role: string;
    codeRNA: string;
    recepisse: string;
    password: string;
    confirmPassword: string;
};

type Props = {
    userType: UserType;
    profilePicture?: any;
    onSubmit?: (data: FormData) => void;
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
    profilePicture,
    onSubmit
}: Props) {
    
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    }
    const labels = getLabels(userType);
    
    const [formData, setFormData] = useState<FormData>({
        picture: profilePicture || DEFAULT_PHOTO,
        lastname: '',
        firstname: '',
        email: '',
        mobile: '',
        role: '',
        codeRNA: '',
        recepisse: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImagePick = async () => {
        // Ask permission to access gallery
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
            Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la galerie pour changer votre photo de profil.');
            return;
        }

        // Open gallery
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets[0]) {
            setFormData(prev => ({ ...prev, picture: { uri: result.assets[0].uri } }));
        }
    };


    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(formData);
        }
        setIsEditing(false);
        console.log('Sauvegardé:', formData);
    };

    return (
        <ScrollView style={styles.card} contentContainerStyle={styles.scrollContent} >
            {isEditing ? (
                <>
                    <View>
                        <TouchableOpacity onPress={handleImagePick}>
                            <Image 
                                source={formData.picture} 
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
                                onPress={() => setIsEditing(false)}
                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <CustomButton
                                image={require('@/assets/images/validate.png')}
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>
                </>
            ) : (
                <>
                    {/* Mode consultation */}
                    <Image source={formData.picture} style={styles.photo} />
                    
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
            
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <CustomButton
                            image={require('@/assets/images/edit.png')}
                            onPress={handleEdit}
                        />
                    </View>
                </>
            )}
        </ScrollView>
    );
}
