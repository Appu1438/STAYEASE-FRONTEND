import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../Custom Components/Homepage";
import Detailview from "../Custom Components/Detailview";
import Confirmation from "../Custom Components/confirmation";
import PaymentPage from "../Custom Components/PaymentPage";
import Bookings from "../Custom Components/ViewBooking";
import LoginNav from "./Login";
import UpdateProfile from "../Custom Components/UpdateProfile";
import Search from "../Custom Components/Search";
import Fav from "../Custom Components/Favourites";
import Profile from "../Custom Components/Profile";



const UserNav = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={UserDrawerScreens} />
        <Stack.Screen name="Detailview" component={Detailview} options={{animation:'slide_from_right'}} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen name="Payment" component={PaymentPage} options={{animation:'slide_from_right'}}  />
        <Stack.Screen name="Bookings" component={Bookings} options={{animation:'slide_from_right'}} />
        <Stack.Screen name="UserLogout" component={LoginNav} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{animation:'slide_from_right'}} />
        <Stack.Screen name="Search" component={Search} options={{animation:'slide_from_right'}} />
        <Stack.Screen name="Fav" component={Fav } options={{animation:'slide_from_right'}}  />      
      </Stack.Navigator>
    )
  
  }
  const UserDrawerScreens = () => {
    const Drawer = createDrawerNavigator();
  
    return (
      <Drawer.Navigator   screenOptions={{
        headerShown: false,
       drawerType:'front',// Hide header

    }}
     > 
        <Drawer.Screen name="HomeScreen" component={Home} />
        <Drawer.Screen name="Profile" component={Profile}/>
      </Drawer.Navigator>
    )
  
};

export default UserNav
  