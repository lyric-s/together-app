import { StyleSheet, Platform } from "react-native";
import { Colors } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    gap: 10,
    
    // Shadow
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    
    maxWidth: '100%',
    width: '100%',
    alignSelf: 'center',
    marginVertical: 15,
  },

  input: {
    backgroundColor: Colors.grayToWhite,
    borderRadius: 20,
    height: 45,
    paddingHorizontal: 15,
    fontSize: 14,
    color: Colors.black,
    borderWidth: 0,
    
    flexGrow: 1,
    minWidth: 140,
  },

  pickerContainer: {
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 0,
    flexGrow: 1,
    minWidth: 140,
    alignItems: 'center'
  },

  picker: {
    width: '90%',
    height: '100%',
    color: Colors.black,
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        border: 'none',
        cursor: 'pointer',
      } as any
    })
  },

  resetButton: {
    padding: 8,
    backgroundColor: Colors.whiteLittleGray,
    borderRadius: 20,
    marginRight: 10,
  },
  resetText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.gray,
  },
  searchIcon: {
    width: 28,
    height: 28,
    tintColor: Colors.orange,
  },
});