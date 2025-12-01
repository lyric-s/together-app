import React from 'react';
import BackButton from '@/components/BackButton';
import Sidebar from '@/components/SideBar';

export default function Index() {
    return <Sidebar
        userType="admin"
        userName="Jean"
        onNavigate={(route) => console.log("Go to:", route)}
        />

}
