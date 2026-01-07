import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  saveTokens: async (access: string, refresh: string) => {
    await AsyncStorage.setItem('access_token', access);
    await AsyncStorage.setItem('refresh_token', refresh);
  },
  getAccessToken: () => AsyncStorage.getItem('access_token'),
  getRefreshToken: () => AsyncStorage.getItem('refresh_token'),
  clear: () => AsyncStorage.clear(),
};