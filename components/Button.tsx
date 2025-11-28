import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '@/styles/components/Button.styles';

type Props = {
    texte: string;
    onPress?: () => void;
};

export default function BoutonAuth({ texte, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.bouton} onPress={onPress}>
            <Text style={styles.texte}>{texte}</Text>
        </TouchableOpacity>
    );
}
