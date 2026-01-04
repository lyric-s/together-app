import React from 'react';
import BackButton from '@/components/BackButton';
import { View, Text } from 'react-native';
import MobileSearchBar from '@/components/MobileSearchBar';
import { useState } from "react";
import ProfilAssos from './ProfilAssos';

/**
 * Renders the ProfilAssos component as the app's home screen.
 *
 * @returns The JSX element representing the home screen (ProfilAssos).
 */
export default function Index() {
  return <ProfilAssos />;
}