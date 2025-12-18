import { View } from "react-native";
import ProfilModificationPage from "../pages/ProfilModificationPage";
import Sidebar from "@/components/SideBar";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();
  
  return <View style={{ flex: 1, flexDirection: "row" }}>

    <ProfilModificationPage />
    </View>;
}