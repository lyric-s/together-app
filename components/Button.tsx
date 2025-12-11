import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '@/styles/components/Button.styles';

type Props = {
    text: string;
    onPress?: () => void;
};

export default function ButtonAuth({ text, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}
