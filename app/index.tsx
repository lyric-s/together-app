/**
 * @file index.tsx
 * @description Root entry point for the application's home screen. 
 * This file defines the layout structure, featuring a centered navigation component.
 */
import React from 'react';
import BackButton from '@/components/BackButton';
import { View, Text } from 'react-native';
import MobileSearchBar from '@/components/MobileSearchBar';
import { useState } from "react";
import AccountBenevole from '@/pages/AccountBenevole';

/**
 * The Index component serves as the primary view for the home screen.
 * It utilizes a flexbox layout to vertically center the navigation bar
 * between two empty expandable sections.
 * * @returns {JSX.Element} The rendered Home Screen component.
 */
export default function Index() {
   return <AccountBenevole />;
}