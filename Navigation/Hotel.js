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
import AddBussiness from "../HotelScreens/AddBusiness";
import Viewbussiness from "../HotelScreens/ViewBussines";
import BusinessBookings from "../HotelScreens/ViewBusinessBookings";
import EditBussiness from "../HotelScreens/EditBusiness";



const HotelNav = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={DrawerScreens} />
        <Stack.Screen name="Detailview" component={Detailview} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen name="Payment" component={PaymentPage} />
        <Stack.Screen name="Bookings" component={Bookings} options={{animation:'slide_from_right'}} />
        <Stack.Screen name="UserLogout" component={LoginNav} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{animation:'slide_from_right'}} />
        <Stack.Screen name="Search" component={Search} options={{animation:'slide_from_right'}} />
        <Stack.Screen name="Fav" component={Fav} options={{animation:'slide_from_right'}} />  

        <Stack.Screen name="EditBusiness" component={EditBussiness} options={{animation:'slide_from_right'}} />      
        
      </Stack.Navigator>
    )
  
  }
  const DrawerScreens = () => {
    const Drawer = createDrawerNavigator();
  
    return (
      <Drawer.Navigator   screenOptions={{
        headerShown: false, // Hide header
      }}
     > 
        <Drawer.Screen name="Homepage" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Add Your Business" component={AddBussiness} />
        <Drawer.Screen name="Manage Your Business" component={Viewbussiness} />
        <Drawer.Screen name="Your Business Bookings" component={BusinessBookings} />
      </Drawer.Navigator>
    )
  };

export default HotelNav
  