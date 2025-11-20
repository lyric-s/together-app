import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
    color: Colors.black,
  },

  pickerWrapper: {
    width: 130,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 0,      
    overflow: "hidden",
  },

  picker: {
    width: "100%",
    height: 45,
    paddingVertical: 12,
    paddingHorizontal: 14,
    margin: 0,
    color: Colors.grayPlaceholder,  
    borderWidth: 0,   
  },

  resetButton: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  resetText: {
    color: Colors.mauve,
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 14,
  },

  searchIcon: {
    width: 35,
    height: 35,
  },
});