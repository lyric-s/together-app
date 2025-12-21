import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/styles/components/SwitchProject.styles';

type ActiveTab = 'Mission' | 'Association';

/**
 * Propriétés du composant SwitchProject.
 * @interface SwitchProjectProps
 * @property value - L'onglet actif actuel (pour un contrôle externe du composant).
 * @property defaultValue - L'onglet actif par défaut si `value` n'est pas défini.
 * @property onChange - Fonction de rappel (callback) appelée lors du changement d'onglet.
 * @property style - Permet d'appliquer des styles personnalisés au conteneur externe.
 */
export interface SwitchProjectProps {
    value?: ActiveTab;
    defaultValue?: ActiveTab;
    onChange?: (tab: ActiveTab) => void;
    style?: StyleProp<ViewStyle>;
}

/**
 * Composant `SwitchProject`.
 * * Affiche un commutateur segmenté à deux options ("Mission" et "Association").
 * Lors d'un clic sur un onglet, le composant :
 * 1. Met à jour son état interne ou appelle le callback parent.
 * 2. Déclenche une navigation vers la route correspondante (`/mission` ou `/association`) via `expo-router`.
 * * @param {SwitchProjectProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant de navigation segmentée.
 */
export default function SwitchProject({ value, defaultValue = 'Mission', onChange, style }: SwitchProjectProps) {
    /** @state internalActiveTab - État utilisé uniquement si le composant n'est pas contrôlé par le parent. */
    const [internalActiveTab, setInternalActiveTab] = useState<ActiveTab>(defaultValue);
    const router = useRouter();

    /** Détermine si l'onglet actif provient des props (contrôlé) ou de l'état interne (non-contrôlé). */
    const activeTab = value ?? internalActiveTab;

    /**
     * Gère l'action de pression sur un bouton.
     * Met à jour l'interface et redirige l'utilisateur vers la route spécifiée.
     * @param {ActiveTab} tab - L'identifiant de l'onglet sélectionné.
     */
    const handlePress = (tab: ActiveTab) => {
        // Mise à jour de l'état visuel
        if (value === undefined) {
            setInternalActiveTab(tab);
        }
        onChange?.(tab);

        // Navigation vers les routes définies dans Expo Router
        switch (tab) {
            case 'Mission':
                router.push('/mission');
                break;
            case 'Association':
                router.push('/association');
                break;
            default:
                break;
        }
    };

    return (
        <View style={[styles.container, style]}>
            <View style={styles.segmentedControl}>
                {/* Bouton Mission */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeTab === 'Mission' && styles.activeButton
                    ]}
                    onPress={() => handlePress('Mission')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.text, activeTab === 'Mission' ? styles.activeText : styles.inactiveText]}>
                        Mission
                    </Text>
                </TouchableOpacity>

                {/* Bouton Association */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeTab === 'Association' && styles.activeButton
                    ]}
                    onPress={() => handlePress('Association')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.text, activeTab === 'Association' ? styles.activeText : styles.inactiveText]}>
                        Association
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}