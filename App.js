import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StyleSheet } from "react-native";
import AdminNav from "./Navigation/Admin";
import UserNav from "./Navigation/User";
import HotelNav from "./Navigation/Hotel";
import getUsertype from "./Service/UserServices.js/Usertype";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import Unauthenticated from "./Navigation/Unauthenticated";


export default function App() {

  const [isLogedIn, setIsLogedIn] = useState(false)
  const [userType, setUserType] = useState('')


  
  
  useEffect(() => {
    getUsertype(isLogedIn, setIsLogedIn, userType, setUserType)
    console.log("State Updated")
  }, [AsyncStorage])




  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51NtRBkSEmsfUtDI2xbYoEzVmCHkf7UlwgqRxbpKJSSPWugQXbowVpDiMXHhgg7bibtqWxP2GzEjuZieYQ4ns2fIC00kIt633nm">
        <NavigationContainer>

          {isLogedIn && userType == 'Admin'||userType=='SuperAdmin' ? <AdminNav />
            : isLogedIn && userType == 'Business' ? <HotelNav />
              : isLogedIn && userType == 'User' ? <UserNav />
                : <Unauthenticated />}

          <Toast />

        </NavigationContainer>
      </StripeProvider>
    </Provider>



  )
}
