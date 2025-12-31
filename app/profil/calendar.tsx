import { View, Platform  } from "react-native";
import Calendar from "../../components/Calendar";
import Sidebar from "@/components/SideBar";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Colors } from "@/constants/colors";
import BottomNavBar from "@/components/MobileNavigationBar";

export default function Page() {
  const router = useRouter();

  const isWeb = Platform.OS === 'web';
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
  
  return <View style={{ flex: 1, flexDirection: isMobile ? "column" : "row", backgroundColor: Colors.white}}>

    {isWeb && 
        <Sidebar 
        userType="association"
        userName="Fred" 
        onNavigate={(route) => router.push(('/' + route) as any)} />
    }
    <View style={{ flex: 1, flexDirection: "column", paddingTop: 15 }}>
        <BackButton name_page="Calendrier" />
    
        <Calendar />
    </View>
    

    {isMobile && 
        <BottomNavBar />
    }

    </View>;
}