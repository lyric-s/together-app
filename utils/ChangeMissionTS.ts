import Toast from 'react-native-toast-message';

export const handleSaveMission = (mission: any) => {
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

export const handleDeleteMission = (mission: any) => {
  Toast.show({
    type: 'success',
    text1: `Mission supprimée : ${mission.title}`,
  });
};