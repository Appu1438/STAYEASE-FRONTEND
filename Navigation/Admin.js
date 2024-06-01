import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowUsers from "../Admin Screens/Users";
import LoginNav from "./Login";
import PendingRequests from "../Admin Screens/Pendings";
import PendingDetailview from "../Admin Screens/PendingDetailview";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../Custom Components/Profile";
import Home from "../Custom Components/Homepage";
import Detailview from "../Custom Components/Detailview";
import Confirmation from "../Custom Components/confirmation";
import PaymentPage from "../Custom Components/PaymentPage";
import Bookings from "../Custom Components/ViewBooking";
import UpdateProfile from "../Custom Components/UpdateProfile";
import Search from "../Custom Components/Search";
import Fav from "../Custom Components/Favourites";
import Viewbussiness from "../HotelScreens/ViewBussines";
import BusinessBookings from "../HotelScreens/ViewBusinessBookings";
import AdminBusiness from "../Admin Screens/AddHotel";
import EditBussiness from "../HotelScreens/EditBusiness";
import NeedHelp from "../Custom Components/Needhelp";
import AllHotels from "../Admin Screens/AllHotels";
import AllBookings from "../Admin Screens/AllBookings";
import AddNewUser from "../Admin Screens/AddUser";
import { useSelector } from "react-redux";
import EditUser from "../Admin Screens/EditUser";



export default function AdminNav() {

  const Stack = createNativeStackNavigator();

  return (
    
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerScreens} />
      <Stack.Screen name="Detailview" component={Detailview} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
      <Stack.Screen name="Payment" component={PaymentPage} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Bookings" component={Bookings} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="UserLogout" component={LoginNav} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Search" component={Search} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Fav" component={Fav} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Needhelp" component={NeedHelp} options={{ animation: 'slide_from_right' }} />

      <Stack.Screen name="PendingsDetails" component={PendingDetailview} />
      <Stack.Screen name="EditBusiness" component={EditBussiness} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="EditUser" component={EditUser} options={{ animation: 'slide_from_right' }} />
    </Stack.Navigator>


  )

}

const DrawerScreens = () => {
  const userData = useSelector(state => state.user.userData)
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false, // Hide header
    }}
    >
      <Drawer.Screen name="Homepage" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="All Users" component={ShowUsers} />
      <Drawer.Screen name="All Hotels" component={AllHotels} />
      <Drawer.Screen name="All Bookings" component={AllBookings} />
      <Drawer.Screen name="All Pendings" component={PendingRequests} />
      <Drawer.Screen name="Add Your Business" component={AdminBusiness} />
      <Drawer.Screen name="Manage Your Business" component={Viewbussiness} />
      <Drawer.Screen name="Your Business Bookings" component={BusinessBookings} />
      {userData.userType === 'SuperAdmin' && (
          <Drawer.Screen name="Add New User" component={AddNewUser} />
        )}
    </Drawer.Navigator>
  )
};