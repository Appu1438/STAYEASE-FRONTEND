import { SafeAreaView, ScrollView, KeyboardAvoidingView, View, StatusBar, BackHandler, Alert } from "react-native";
import Homeheader from "../HomeComponents/header";
import RecommendationsText from "../HomeComponents/recommendationText";
import RecommendationsOne from "../HomeComponents/recommendationsOne";
import Footer from "../Common Component/footer";
import { Styles } from "../Common Component/Styles";
import Navbar from "../HomeComponents/navbar";
import React, { useEffect, useState } from "react";

import Loading from "../Common Component/loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_BASE_URL from "../Api";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import * as Location from 'expo-location';
import Locations from "../HomeComponents/location";






export default function Home() {

    const [isLoading, setloading] = useState(true)
    const [userData, setUserData] = useState('')
    const [userLocation, setUserLocation] = useState();

   
    


    async function getdata() {
        const token = await AsyncStorage.getItem('token');
        // console.log("Profile",token);
        axios.post(`${API_BASE_URL}/user-data`, { token: token })
            .then(res => {
                // console.log(res.data);
                setUserData(res.data.data)

            });
    }

    const handleBackPress = () => {
        Alert.alert('Exit App', 'Are you sure want to exit?',
            [{
                text: "Cancel",
                onPress: () => null,
                style: 'cancel'
            },
            {
                text: "Exit",
                onPress: () => BackHandler.exitApp(),
                style: 'cancel'
            }]
        )
        return true;
    }

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackPress)

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackPress)

            }

        })
    )


    const getUserLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Toast.show({
                    type: 'error',
                    text1: 'Location Permission Denied',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
                console.log('Location permission denied');
                return;
            }

           

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            const { latitude, longitude } = location.coords;

            let address = await Location.reverseGeocodeAsync({ latitude, longitude });
            // console.log(address);
            setUserLocation(address[0].city)
        } catch (error) {
            // console.error(error);
            // Handle error while getting the location
        }
    };


  

    
  
    useEffect(() => {
        getdata(),
        getUserLocation()
    })

    


    if (!userData) {
        return (
            <Loading />
        )
    }
    else {

        return (



            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={[Styles.container, { alignItems: 'flex-start' }]}>

                    <Homeheader />
                    {/* <Navbar  /> */}

                    <ScrollView>

                        <Locations userLocation={userLocation} User={userData} />
                        <RecommendationsText />
                        <RecommendationsOne userLocation={userLocation} user={userData?userData._id:null} />
                        <RecommendationsOne userLocation={userLocation} user={userData?userData._id:null} />

                    </ScrollView>

                    <Footer />

                </View>
            </KeyboardAvoidingView>




        )

    }


}
