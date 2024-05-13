import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Admin from "../Admin Screens/admin";
import ShowUsers from "../Admin Screens/Users";
import LoginNav from "./Login";
import AddHotel from "../Admin Screens/AddHotel";
import PendingRequests from "../Admin Screens/Pendings";
import PendingDetailview from "../Admin Screens/PendingDetailview";




export default function AdminNav  ()  {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Users" component={ShowUsers} />
        <Stack.Screen name="AdminLogout" component={LoginNav} />
        <Stack.Screen name="AddHotel" component={AddHotel} />
        <Stack.Screen name="Pendings" component={PendingRequests} />
        <Stack.Screen name="PendingsDetails" component={PendingDetailview} />
      </Stack.Navigator>
  
    )
  
  }