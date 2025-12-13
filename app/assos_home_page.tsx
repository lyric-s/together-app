import { View } from "react-native";
import Sidebar from "@/components/SideBar";
import { useRouter } from "expo-router";
import AssosHomePage from "@/pages/AssosHomePage";

export default function Page() {
  const router = useRouter();
  
  return <View style={{ flex: 1, flexDirection: "row" }}>

    <Sidebar 
     userType="association"
     userName="Fred" 
     onNavigate={(route) => router.push(('/' + route) as any)} 
    />
    <AssosHomePage />
    </View>;
}
