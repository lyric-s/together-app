import React from 'react';
import CustomButton from '@/components/ImageButton'
import ProfilCard from '@/components/ProfilCard';
export default function Index() {
    return <ProfilCard
            userType='admin'
            onSubmit={() => console.log("clic !")}
            />;
}
