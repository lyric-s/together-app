import { Alert } from 'react-native';

export const handleSaveMission = (mission: any) => {
  Alert.alert('Mission sauvegardée : ${mission.titre}');
};

export const updateMissionField = <T, K extends keyof T>(
  mission: T,
  field: K,
  value: T[K],
) => {
  return { ...mission, [field]: value };
};