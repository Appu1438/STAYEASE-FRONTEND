import { SafeAreaView, ScrollView, KeyboardAvoidingView, View, StatusBar, BackHandler, Alert } from "react-native";
import Homeheader from "../HomeComponents/header";
import Location from "../HomeComponents/location";
import RecommendationsText from "../HomeComponents/recommendationText";
import RecommendationsOne from "../HomeComponents/recommendationsOne";
import RecommendationsTwo from "../HomeComponents/recommendationsTwo";
import Footer from "../Common Component/footer";
import { Styles } from "../Common Component/Styles";
import Navbar from "../HomeComponents/navbar";
import React, { useEffect, useState } from "react";

import Loading from "../Common Component/loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_BASE_URL from "../Api";
import { useFocusEffect } from "@react-navigation/native";






export default function Home() {

    const [userData, setUserData] = useState('')

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

    useEffect(() => {
        getdata()
    }, )


    const [isMenubar, setMenubar] = useState(false)
    const [isLoading, setloading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    })

    if (isLoading) {
        return (
            <Loading />
        )
    }
    else {

        return (



            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={[Styles.container, { alignItems: 'flex-start' }]}>

                    <Homeheader Navbar={setMenubar} />
                    <Navbar isState={isMenubar} setState={setMenubar} user={userData} />

                    <ScrollView>

                        <Location />
                        <RecommendationsText />
                        <RecommendationsOne />
                        <RecommendationsTwo />

                    </ScrollView>

                    <Footer />

                </View>
            </KeyboardAvoidingView>




        )

    }


}
