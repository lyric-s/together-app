import { View , Platform} from "react-native";
import Sidebar from "@/components/SideBar";
import { useRouter } from "expo-router";
import JoinMissionPage from "@/pages/JoinMissionPage";
import BottomNavBar from "@/components/MobileNavigationBar";

export default function Page() {
  const router = useRouter();
  const isWeb = Platform.OS === "web";
  
  return <View style={{ flex: 1, flexDirection: isWeb ? "row" : "column" }}>
        {isWeb && (
          <Sidebar
            userType="volunteer"
            userName="Jean Luc Melanchon"
            onNavigate={(route) => router.push(("/" + route) as any)}
          />
        )}

        <View style={{flex: 1}}>
            <JoinMissionPage/>
        </View>

        {!isWeb && (
          <BottomNavBar />
        )}
    </View>;
}
