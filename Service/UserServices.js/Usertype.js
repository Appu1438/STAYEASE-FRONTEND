
import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getUsertype(isLogedIn,setIsLogedIn,userType,setUserType) {
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