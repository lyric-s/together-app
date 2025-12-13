import { View } from "react-native";
import MissionCreation from "../pages/MissionCreation";
import Sidebar from "@/components/SideBar";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();
  
  return <View style={{ flex: 1, flexDirection: "row" }}>

    <Sidebar 
    userType="association"
     userName="Fred" 
     onNavigate={(route) => router.push(('/' + route) as any)} 
     
       />
    <MissionCreation />
    </View>;
}
