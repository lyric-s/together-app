import { Colors } from '@/constants/colors';
import {
  Platform,
  StyleSheet,
} from 'react-native';

const isWeb = Platform.OS === 'web';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  container: {
    flex: 1,
    
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 12,
    padding: 16,
  },

  list: {
    paddingBottom: 20,
  },

  emptyText: {
    fontSize: 16,
    color: Colors.black,
    marginTop: 20,
    marginBottom: 60,
    padding: 16,
  },

  switchTop: {
    marginBottom: 20,
    alignSelf: 'center',
  },

  switchBottom: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
