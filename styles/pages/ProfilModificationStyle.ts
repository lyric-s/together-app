import { Colors } from "@/constants/colors";
import {StyleSheet,} from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    gap: 10,
  },
  editIcon: {
    width: 34,
    height: 34,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    marginLeft: 10,
    backgroundColor: Colors.lavender,
    padding: 15, 
    borderRadius : 10,
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },


  /* CONTENT */
  content: {
    flex: 1,
    alignItems: "center",
  },

  /* FORM */
  form: {
    width: "100%",
    marginTop: 30,
    gap: 15,
  },
  inputContainer: {
    backgroundColor: Colors.buttonBackgroundViolet,
    borderRadius: 12,
    padding: 12,
  },
  label: {
    fontSize: 12,
    color: Colors.white,
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    color: Colors.white,
  },

  /* BUTTONS */
  editButtons: {
    width: "100%",
  },
});
