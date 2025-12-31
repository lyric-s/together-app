import { View } from "react-native";
import ActivityWithoutAccount from "@/pages/ActivityWithoutAccount";
import { useRouter } from "expo-router";
import BottomNavBar from "@/components/MobileNavigationBar";

export default function Page() {
  const router = useRouter();
  
  return <View style={{ flex: 1 }}>

    <ActivityWithoutAccount />
    <BottomNavBar />
    </View>;
}