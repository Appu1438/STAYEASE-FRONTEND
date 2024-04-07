import { View, Text, SafeAreaView, Pressable, TextInput, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, } from "react-native";
import { Styles } from "./Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState, useEffect } from "react";
import { faLocationDot, faSearch, faBars, faIndianRupeeSign, faHouse, faHotel, faTag, faGift, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faStar, } from "@fortawesome/free-regular-svg-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../Api";


export default function Footer() {

 
    const navigation = useNavigation()
    return (
 
        <View style={Styles.footer}>


            <Pressable>
                <View style={Styles.footerbox}>
                    <FontAwesomeIcon size={25} icon={faHouse} />
                    <Text style={Styles.footertext}>Home</Text>
                </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Bookings")}>
                <View style={Styles.footerbox}>
                    <FontAwesomeIcon size={25} icon={faHotel} />
                    <Text style={Styles.footertext}>Bookings</Text>
                </View>
            </Pressable>

            <Pressable>
                <View style={Styles.footerbox}>
                    <FontAwesomeIcon size={25} icon={faTag} />
                    <Text style={Styles.footertext}>Offers</Text>
                </View>
            </Pressable>



            <Pressable>
                <View style={Styles.footerbox}>
                    <FontAwesomeIcon size={25} icon={faGift} />
                    <Text style={Styles.footertext}>Win5000</Text>
                </View>

            </Pressable>

            <Pressable>
                <View style={Styles.footerbox}>
                    <FontAwesomeIcon size={25} icon={faHeadset} />
                    <Text style={Styles.footertext}>NeedHelp</Text>
                </View>
            </Pressable>


        </View>
    )
}