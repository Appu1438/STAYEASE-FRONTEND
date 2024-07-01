import { SafeAreaView, ScrollView, KeyboardAvoidingView, View, StatusBar, BackHandler, Alert, RefreshControl } from "react-native";
import Homeheader from "../../components/HomeComponents/header";
import RecommendationsText from "../../components/HomeComponents/recommendationText";
import RecommendationsOne from "../../components/HomeComponents/recommendationsOne";
import { Styles } from "../../components/Common Component/Styles";
import React, { useEffect, useState } from "react";

import Loading from "../../components/Common Component/loading";

import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import * as Location from 'expo-location';
import Locations from "../../components/HomeComponents/location";
import getdata from "../../Service/UserServices.js/Getdata";
import getUserLocation from "../../Service/UserServices.js/GetUserLocation";
import { useSelector } from "react-redux";
import getAllUsers from "../../Service/UserServices.js/GetAllUsers";
import getAllHotels from "../../Service/GetHotelServices/GetHotels";
import getAllBookings from "../../Service/ViewBookingServices/GetAllBookings";





export default function Home({navigation}) {
    const userData = useSelector(state => state.user.userData)

    const [isLoading, setloading] = useState(true)
    const [userLocation, setUserLocation] = useState();
    const [nearbycities, setnearbyCities] = useState();
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = () => {
        setRefreshing(true);
        // Call your refresh function here, for example:
        getdata(navigation)
        getAllUsers()
        getAllHotels()
        getAllBookings()
        getUserLocation(setUserLocation,setnearbyCities)
        // After fetching new data, set refreshing to false to stop the spinner
        setRefreshing(false);
    };

   
    useEffect(() => {
        // setInterval(() => {
            getdata()
            getAllUsers()
            getAllHotels()
            getAllBookings()
            getUserLocation(setUserLocation,setnearbyCities)
        // }, 10000);
       
    },[])

   
    

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

                    <ScrollView 
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }>

                        <Locations userLocation={userLocation} User={userData} />
                        <RecommendationsText />
                        <RecommendationsOne userLocation={userLocation} user={userData?userData._id:null} />
                        <RecommendationsOne userLocation={userLocation} user={userData?userData._id:null} />

                    </ScrollView>

                    {/* <Footer /> */}

                </View>
            </KeyboardAvoidingView>




        )

    }


}
