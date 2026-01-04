import { View } from "react-native";
import ProfilModificationPage from "../../pages/ProfilModificationPage";
import BottomNavBar from "@/components/MobileNavigationBar";

export default function Page() {
  
  return <View style={{ flex: 1 }}>

    <ProfilModificationPage />
    <BottomNavBar />
    </View>;
}