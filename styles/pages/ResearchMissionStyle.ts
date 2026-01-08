import { Colors } from '@/constants/colors';
import {Platform, StyleSheet} from 'react-native';

const isWeb = Platform.OS === 'web';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingHorizontal: isWeb ? 20 : 0,
  },

  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20,
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
