import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: Colors.whiteLittleGray,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 30,
  },

  /* Container of sections */
  sectionsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },

  /* Web layout */
    sectionsContainerWeb: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center', 
    gap: 80,                  
    },

  section: {
    flex: 1,
    minWidth: 200,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.purpleBackground,
  },

  link: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 8,
    cursor: Platform.OS === 'web' ? 'pointer' : 'default',
  },

  bottom: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    alignItems: 'center',
  },

  copyright: {
    fontSize: 14,
    color: Colors.gray,
  },
});
