import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  saveTokens: async (access: string, refresh: string) => {
    try {
      await AsyncStorage.multiSet([
        ['access_token', access],
        ['refresh_token', refresh]
      ]);
    } catch (error) {
      console.error('Failed to save tokens:', error);
      throw error;
    }
  },
  getAccessToken: () => AsyncStorage.getItem('access_token'),
  getRefreshToken: () => AsyncStorage.getItem('refresh_token'),
  clear: async () => {
    try {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
    } catch (error) {
      console.error('Failed to clear tokens:', error);
      throw error;
    }
  },
};