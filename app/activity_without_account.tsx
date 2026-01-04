import { Platform, View } from "react-native";
import ActivityWithoutAccount from "@/pages/ActivityWithoutAccount";
import { RelativePathString, useRouter } from "expo-router";
import BottomNavBar from "@/components/MobileNavigationBar";
import Sidebar from "@/components/SideBar";

export default function Page() {
  const isWeb = Platform.OS === 'web';
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  const router = useRouter();
  
  return <View style={{ flex: 1, backgroundColor: "white", flexDirection: isMobile ? "column" : "row" }}>

    {isWeb && 
        <Sidebar 
        userType="volunteer_guest"
        userName="Fred" 
        onNavigate={(route) => router.push(('/' + route) as RelativePathString)} />
    }

    <ActivityWithoutAccount />

    {isMobile && 
        <BottomNavBar />
    }

    </View>;
}