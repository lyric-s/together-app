import React from 'react';
import BackButton from '@/components/BackButton';
import Sidebar from '@/components/SideBar';

export default function Index() {
    return <Sidebar
        userType="admin"
        userName="tres tres tres long prenom qui prend bcp fde place "
        onNavigate={(route) => console.log("Go to:", route)}
        />

}
