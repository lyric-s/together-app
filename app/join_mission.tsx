import { View , Platform} from "react-native";
import Sidebar from "@/components/SideBar";
import { useRouter } from "expo-router";
import JoinMissionPage from "@/pages/JoinMissionPage";

export default function Page() {
  const router = useRouter();
  const isWeb = Platform.OS === "web";
  
  return <View style={{ flex: 1, flexDirection: "row" }}>
        {isWeb && (
        <Sidebar
          userType="volunteer"
          userName="Jean Luc Melanchon"
          onNavigate={(route) => router.push(("/" + route) as any)}
        />
      )}
        <JoinMissionPage />
        {/* TODO: add navigation bar for mobile */}
    </View>;
}
