/**
 * @file SwitchProject.tsx
 * @description Composant de navigation segmentée permettant de basculer entre les vues Mission et Association.
 * Intègre la logique de routage Expo Router.
 */

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/styles/components/SwitchProject.styles';

/**
 * Union type définissant les valeurs possibles pour l'onglet actif.
 * 'Mission' correspond généralement aux annonces, 'Association' au profil/recherche asso.
 */
type ActiveTab = 'Mission' | 'Association';

/**
 * Propriétés du composant SwitchProject.
 * @interface SwitchProjectProps
 * @property {ActiveTab} [value] - L'onglet actif actuel (pour un contrôle externe du composant).
 * @property {ActiveTab} [defaultValue] - L'onglet actif par défaut si `value` n'est pas défini (par défaut: 'Mission').
 * @property {function} [onChange] - Fonction de rappel (callback) appelée lors du changement d'onglet.
 * @property {StyleProp<ViewStyle>} [style] - Permet d'appliquer des styles personnalisés (marges, positionnement) au conteneur externe.
 */
export interface SwitchProjectProps {
    value?: ActiveTab;
    defaultValue?: ActiveTab;
    onChange?: (tab: ActiveTab) => void;
    style?: StyleProp<ViewStyle>;
}

/**
 * Composant `SwitchProject`.
 * * @description 
 * Ce composant affiche une barre de sélection horizontale. Il supporte deux modes :
 * 1. **Contrôlé** : Si `value` est fourni, le composant dépend du parent pour son état.
 * 2. **Non-contrôlé** : Utilise un état interne via `internalActiveTab`.
 * * @param {SwitchProjectProps} props - Propriétés de configuration du switch.
 * @returns {JSX.Element} Le composant de navigation segmentée rendu.
 */
export default function SwitchProject({ value, defaultValue = 'Mission', onChange, style }: SwitchProjectProps) {
    /** * @state internalActiveTab 
     * Gère l'état local si aucune prop 'value' n'est passée par le parent. 
     */
    const [internalActiveTab, setInternalActiveTab] = useState<ActiveTab>(defaultValue);
    
    /** Hook Expo Router pour gérer la navigation programmatique. */
    const router = useRouter();

    /** * Logique de sélection de l'état : priorise la prop 'value' (mode contrôlé), 
     * sinon utilise l'état interne (mode non-contrôlé).
     */
    const activeTab = value ?? internalActiveTab;

    /**
     * Gère l'événement de clic sur un segment.
     * * @async (Optionnel si redirection lourde)
     * @param {ActiveTab} tab - Le nom de l'onglet cible.
     * @description
     * 1. Met à jour l'état visuel (interne ou via callback).
     * 2. Navigue vers le chemin correspondant défini dans le dossier /app.
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
                {/* Section Bouton : Mission */}
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

                {/* Section Bouton : Association */}
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