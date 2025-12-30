import { View } from "react-native";
import ProfilModificationPage from "../pages/ProfilModificationPage";
import { useRouter } from "expo-router";
import BottomNavBar from "@/components/MobileNavigationBar";

export default function Page() {
  const router = useRouter();
  
  return <View style={{ flex: 1 }}>

    <ProfilModificationPage />
    <BottomNavBar />
    </View>;
}