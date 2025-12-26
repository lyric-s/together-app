/**
 * @file SwitchProject.styles.ts
 * @description Definition of stylized styles for the project selector.
 * This module uses the application's design system based on the centralized color palette.
 */

import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

/**
 * Style definitions for the SwitchProject component.
 * @constant styles
 * @property {ViewStyle} container - Centered global container to align the switch within its parent.
 * @property {ViewStyle} segmentedControl - Background of the selection bar. Uses a high `borderRadius` for the "pill" look.
 * @property {ViewStyle} button - Base style of the two options. Uses `flex: 1` to occupy 50% of the space each.
 * @property {ViewStyle} activeButton - Highlight style for the active tab, creating a contrast with the orange background.
 * @property {TextStyle} text - Base typography configuration for button labels.
 * @property {TextStyle} activeText - Full black color for maximum readability on a white background.
 * @property {TextStyle} inactiveText - Applies 70% opacity to visually signify the unselected state.
 */
export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: Colors.lightOrange, // Uses the global color constant
        borderRadius: 100, // Rounded "pill" shape
        padding: 4,
        width: 300,
        height: 50,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: Colors.lightOrange,
    },
    activeButton: {
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    activeText: {
        color: Colors.black,
    },
    inactiveText: {
        color: Colors.black,
        opacity: 0.7, // Visual deactivation effect
    }
});