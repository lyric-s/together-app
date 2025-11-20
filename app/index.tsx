import React, { useState } from 'react';
import { View } from 'react-native';
import InputField from '@/components/InputField';

export default function InputFieldTest() {
    const [value, setValue] = useState('');

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFF7F3',
            }}
        >
            <InputField
                placeholder="Test input"
                value={value}
                onChangeText={setValue}
            />
        </View>
    );
}
