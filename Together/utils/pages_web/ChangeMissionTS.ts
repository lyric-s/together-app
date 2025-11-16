/*import { Alert } from 'react-native';

export const handleSaveMission = (mission: string) => {
  Alert.alert(`Mission sauvegardée : ${mission}`);
};
*/

import { Alert } from 'react-native';

export const handleSaveMission = (mission: any) => {
  Alert.alert('Mission sauvegardée : ${mission.titre}');
};

export const updateMissionField = (mission : any, field : any, value : any) => {
  return { ...mission, [field]: value };
};
