import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StyleSheet } from "react-native";
import AdminNav from "./Navigation/Admin";
import UserNav from "./Navigation/User";
import HotelNav from "./Navigation/Hotel";
import LoginNav from "./Navigation/Login";
import getUsertype from "./Service/UserServices.js/Usertype";


export default function App() {

  const [isLogedIn, setIsLogedIn] = useState(false)
  const [userType, setUserType] = useState('')

 

  useEffect(() => {
    getUsertype(isLogedIn,setIsLogedIn,userType,setUserType)
    console.log("State Updated")
  }, [AsyncStorage])




  return (
    <StripeProvider publishableKey="pk_test_51NtRBkSEmsfUtDI2xbYoEzVmCHkf7UlwgqRxbpKJSSPWugQXbowVpDiMXHhgg7bibtqWxP2GzEjuZieYQ4ns2fIC00kIt633nm">
      <NavigationContainer>

        {isLogedIn && userType == 'Admin' ? <AdminNav /> 
        : isLogedIn && userType == 'Business' ? <HotelNav/>
         :isLogedIn?  <UserNav /> 
         : <LoginNav />}

        <Toast />

      </NavigationContainer>
    </StripeProvider>


  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Adjust as needed
    paddingHorizontal: 20, // Adjust as needed
  },
  itemContainer: {
    marginBottom: 20, // Adjust as needed
  },
  itemText: {
    fontSize: 18, // Adjust as needed
  },
});