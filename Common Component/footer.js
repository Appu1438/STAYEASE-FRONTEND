import { View, Text, SafeAreaView, Pressable, TextInput, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, } from "react-native";
import { Styles } from "./Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState, useEffect } from "react";
import { faLocationDot, faSearch, faBars, faIndianRupeeSign, faHouse, faHotel, faTag, faGift, faHeadset,faHeart} from "@fortawesome/free-solid-svg-icons";
import { faStar, } from "@fortawesome/free-regular-svg-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../Api";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";



export default function Footer({}) {

    // const [userData, setUserData] = useState('')
    const userData = useSelector(state => state.user.userData)

    // useEffect(()=>{
    //     // getdata(setUserData)
    // })
   

    
 
    const navigation = useNavigation()
    return (
 
        <View style={Styles.footer}>


            <Pressable>
                <View style={Styles.footerbox}>
                    <Feather size={25} name="home"/>
                    <Text style={Styles.footertext}>Home</Text>
                </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Bookings",{data:userData})}>
                <View style={Styles.footerbox}>
                <FontAwesome size={25} name="building-o"/>
                    <Text style={Styles.footertext}>Bookings</Text>
                </View>
            </Pressable>

            <Pressable onPress={()=>navigation.navigate("Search",{data:null})}>
                <View style={Styles.footerbox}  >
                <Feather size={25} name="search"/>
                    <Text style={Styles.footertext}>Search</Text>
                </View>
            </Pressable>


            <Pressable onPress={() => navigation.navigate("Fav",{data:userData})}>
                <View style={Styles.footerbox} >
                <Feather size={25} name="heart"/>
                    <Text style={Styles.footertext}>Favourites</Text>
                </View>

            </Pressable>

            <Pressable>
                <View style={Styles.footerbox}>
                <Ionicons size={25} name="headset-outline"/>
                    <Text style={Styles.footertext}>NeedHelp</Text>
                </View>
            </Pressable>


        </View>
    )
}