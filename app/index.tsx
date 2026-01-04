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
import AccountBenevole from '@/app/AccountBenevole';

/**
 * Root component for the application's home screen that renders the AccountBenevole view.
 *
 * @returns The rendered AccountBenevole React element.
 */
export default function Index() {
   return <AccountBenevole />;
}