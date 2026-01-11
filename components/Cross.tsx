import React from 'react';
import { TouchableOpacity, Image, View, StyleProp, ViewStyle } from 'react-native';
import styles from '@/styles/components/Cross.styles';

type Props = {
    onClose?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
};

export default function Cross({ onClose, containerStyle }: Props) {
    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
                <Image
                    source={require('@/assets/images/close.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
}