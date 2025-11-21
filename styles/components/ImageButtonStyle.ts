import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightOrange,
    padding: 14,
    borderRadius: 30,
    alignSelf: "flex-start",
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 100,
    marginVertical: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
