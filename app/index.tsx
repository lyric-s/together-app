import React from 'react';
import CustomButton from '@/components/ImageButton'

export default function Index() {
    return <CustomButton
            image={require("../assets/images/reward.png")}
            onPress={() => console.log("clic !")}
            />;
}
