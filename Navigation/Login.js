import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Custom Components/loginpage";
import Signup from "../Custom Components/SignupPage";
import ForgotPassword from "../Custom Components/ForgotPassword";
import UserNav from "./User";
import HotelNav from "./Hotel";
import AdminNav from "./Admin";


const LoginNav = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Forgot" component={ForgotPassword} />
        <Stack.Screen name="UserLoggedin" component={UserNav} />
        <Stack.Screen name="HotelLoggedin" component={HotelNav} />
        <Stack.Screen name="AdminLoggedin" component={AdminNav} />
      </Stack.Navigator>
    )
  
  
}

  export default LoginNav