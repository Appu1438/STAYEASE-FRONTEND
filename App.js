import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./Custom Components/SignupPage";
import Login from "./Custom Components/loginpage";
import Home from "./Custom Components/Homepage";
import Detailview from "./Custom Components/Detailview";
import Confirmation from "./Custom Components/confirmation";
import Bookings from "./Custom Components/ViewBooking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Admin from "./Admin Screens/admin";
import Profile from "./Custom Components/Profile";
import ShowUsers from "./Admin Screens/Users";
import UpdateProfile from "./Custom Components/UpdateProfile";
import ForgotPassword from "./Custom Components/ForgotPassword";
import AddHotel from "./Admin Screens/AddHotel";
import Search from "./Custom Components/Search";
import Fav from "./Custom Components/Favourites";
import { StripeProvider } from "@stripe/stripe-react-native";
import PaymentPage from "./Custom Components/PaymentPage";



const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
      <Stack.Screen name="UserLoggedin" component={UserNav} />
      <Stack.Screen name="AdminLoggedin" component={AdminNav} />
    </Stack.Navigator>
  )

}

const UserNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Detailview" component={Detailview} />
      <Stack.Screen name="Confirmation" component={Confirmation}  />
      <Stack.Screen name="Payment" component={PaymentPage} />
      <Stack.Screen name="Bookings" component={Bookings} />
      <Stack.Screen name="UserLogout" component={LoginNav} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Fav" component={Fav} />
    </Stack.Navigator>
  )

}

const AdminNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="Users" component={ShowUsers} />
      <Stack.Screen name="AdminLogout" component={LoginNav} />
      <Stack.Screen name="AddHotel" component={AddHotel} />
    </Stack.Navigator>

  )

}



export default function App() {
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [userType, setUserType] = useState('')

  async function getdata() {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn')
      const usertype = await AsyncStorage.getItem('userType')

      console.log("log", data)
      setIsLogedIn(data)
      console.log("state", isLogedIn)

      setUserType(usertype)
      console.log("type", userType)
    } catch (err) {
      console.log("Error in Chnaging State")
    }

  }

  useEffect(() => {
    getdata()
    console.log("State Updated")
  }, [AsyncStorage])




  return (
    <StripeProvider publishableKey="pk_test_51NtRBkSEmsfUtDI2xbYoEzVmCHkf7UlwgqRxbpKJSSPWugQXbowVpDiMXHhgg7bibtqWxP2GzEjuZieYQ4ns2fIC00kIt633nm">
      <NavigationContainer>
        {isLogedIn && userType == 'Admin' ? <AdminNav /> : isLogedIn ? <UserNav /> : <LoginNav />}
        <Toast />
      </NavigationContainer>
    </StripeProvider>


  )
}



