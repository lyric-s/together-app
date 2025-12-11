import Toast from 'react-native-toast-message';
import { Mission } from '@/types/Mission';

export const handleSaveMission = (mission: Mission) => {
  Toast.show({
    type: 'success',
    text1: `Mission sauvegardée : ${mission.title}`,
  });
};

export const updateMissionField = <T, K extends keyof T>(
  mission: T,
  field: K,
  value: T[K],
) => {
  return { ...mission, [field]: value };
};

export async function handleDeleteMission(mission: Mission) {
  Toast.show({
    type: 'success',
    text1: `Mission supprimée : ${mission.title}`,
  });
};