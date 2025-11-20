import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import styles from '@/styles/components/Cross.styles';

type Props = {
    onClose?: () => void;
};

export default function Cross({ onClose }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
                <Image
                    source={require('@/assets/images/close.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
}

