import { Alert } from 'react-native';

export const handleSaveMission = (mission: string) => {
  Alert.alert(`Mission sauvegardée : ${mission}`);
};
