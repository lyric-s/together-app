import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import {COLORS} from "../constants/colors"

//  -------------- Component C16
interface CustomButtonProps {
  image: any;            // image à afficher
  onPress?: () => void;  // action personnalisée
}

export default function CustomButton({ image, onPress }: CustomButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={image} style={styles.icon} />
      {<Text style={styles.label}></Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.light_orange,
    padding: 14,
    borderRadius: 30,
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
