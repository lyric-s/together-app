import { Colors } from '@/constants/colors';
import {Platform, StyleSheet} from 'react-native';

const isWeb = Platform.OS === 'web';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },

  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  headerMobile: {
    backgroundColor: Colors.white,
    padding: 10,
  },
  
  logoContainer: {
    alignItems: 'center',
  },

  searchbar: {
    marginHorizontal: 20,
  },

  listContent: {
    padding: 16,
  },

  webRow: {
    justifyContent: 'space-between',
  },

});