/**
 * @file SwitchButton.styles.ts
 * @description Defines the visual styles and color themes for the SwitchButton component.
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

/**
 * Color theme configuration for the switch variants.
 * * Available Themes:
 * - **mission**: Orange active button (#FF9A66) on an Orange background.
 * - **auth**: Violet active button (#A9A7ED) on a Violet background.
 * * Note: The background (track) color is specific to the theme variant.
 */
export const THEMES = {
    mission: {
        background: '#FF7630', // Track background color
        activeButton: '#FF9A66',        // Selected button color
        activeText: Colors.white,
        inactiveText: Colors.white,
    },
    auth: {
        background: '#6A66B8', // Track background color
        activeButton: '#A9A7ED',        // Specific violet color for Auth
        activeText: Colors.white,
        inactiveText: Colors.white,
    }
};

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmentedControl: {
        flexDirection: 'row',
        borderRadius: 100,
        padding: 4,
        width: 300,
        height: 50,
        // backgroundColor is handled dynamically by the component based on the theme
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    activeButton: {
        // backgroundColor is overridden dynamically by the component
        backgroundColor: 'white', 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    }
});