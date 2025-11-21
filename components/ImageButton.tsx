import { TouchableOpacity, Image, Text } from "react-native";
import { styles } from "@/styles/components/ImageButtonStyle";

//  -------------- Component C16
interface CustomButtonProps {
  image: any;           
  onPress?: () => void; 
}

export default function CustomButton({ image, onPress }: CustomButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={image} style={styles.icon} />
      {<Text style={styles.label}></Text>}
    </TouchableOpacity>
  );
}

