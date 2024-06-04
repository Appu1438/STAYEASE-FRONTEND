import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/User Screens/Homepage";
import Detailview from "../screens/User Screens/Detailview";
import Confirmation from "../screens/User Screens/confirmation";
import PaymentPage from "../screens/User Screens/PaymentPage";
import Bookings from "../screens/User Screens/ViewBooking";
import LoginNav from "../Navigation/Login";
import UpdateProfile from "../screens/User Screens/UpdateProfile";
import Search from "../screens/User Screens/Search";
import Fav from "../screens/User Screens/Favourites";
import Profile from "../screens/User Screens/Profile";
import NeedHelp from "../screens/User Screens/Needhelp";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useSelector } from "react-redux";



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
        <Stack.Screen name="Needhelp" component={NeedHelp } options={{animation:'slide_from_right'}}  />      
 
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
        <Drawer.Screen name="Homepage" component={BottomTabs} />
        <Drawer.Screen name="Profile" component={Profile}/>
      </Drawer.Navigator>
    )
  
};

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const userData = useSelector(state => state.user.userData)
  console.log(userData)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
            return <Feather name={iconName} size={size} color={color} />;
          } else if (route.name === 'Bookings') {
            iconName = 'building-o';
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === 'Search') {
            iconName = 'search';
            return <Feather name={iconName} size={size} color={color} />;
          } else if (route.name === 'Favourites') {
            iconName = 'heart';
            return <Feather name={iconName} size={size} color={color} />;
          } else if (route.name === 'NeedHelp') {
            iconName = 'hipchat';
            return <Fontisto name={iconName} size={size} color={color} />;
          }
        },
        headerShown: false, 
      })}
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: '#555555',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Bookings" component={Bookings} initialParams={{data:userData}} />
      <Tab.Screen name="Search" component={Search} initialParams={{data:null}}/>
      <Tab.Screen name="Favourites" component={Fav} initialParams={{data:userData}} />
      <Tab.Screen name="NeedHelp" component={NeedHelp} />
    </Tab.Navigator>
  );
};

export default UserNav
  