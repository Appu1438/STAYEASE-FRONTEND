import { View, Text, Image, TextInput, KeyboardAvoidingView, Pressable, Platform, Alert, BackHandler, StatusBar } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Styles } from "../Common Component/Styles";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from 'react-native-vector-icons/Feather';
import API_BASE_URL from "../Api";
import Toast from "react-native-toast-message";




export default function Login() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [emailVerify, setEmailVerify] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState(false)
    const [showpassword, setShowpassword] = useState(true)
    const [showCode, setShowCode] = useState(true)
    const [userType, setUserType] = useState("User")
    const [secretText, setSecretText] = useState("")





    function handlesubmit() {
        if (emailVerify && passwordVerify) {
            const userdata = {
                email: email,
                password: password
            };

            axios.post(`${API_BASE_URL}/login-user`, userdata)
                .then(res => {
                    if (res.data.status === 'ok') {
                        Toast.show({
                            type: 'success',
                            text1: 'Loggedin Successfully',
                            visibilityTime: 3000,
                            position: 'bottom'
                        })
                        AsyncStorage.setItem("token", res.data.data);
                        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true))
                        AsyncStorage.setItem('userType', res.data.userType)
                        if (res.data.userType == 'Admin') {
                            navigation.navigate("AdminLoggedin");
                        } else if (res.data.userType == 'Business') {
                            navigation.navigate("HotelLoggedin");
                        } else {
                            navigation.navigate("UserLoggedin");
                        }
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: JSON.stringify(res.data.data),
                            visibilityTime: 3000,
                            position: 'bottom'
                        })
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    Toast.show({
                        type: 'error',
                        text1: "An error occurred while logging in",
                        visibilityTime: 3000,
                        position: 'bottom'
                    })
                });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Please Fill Correctly',
                visibilityTime: 3000,
                position: 'bottom'
            })
        }
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

    function handleemail(e) {
        let emailVar = e.nativeEvent.text;
        setEmail(emailVar)
        setEmailVerify(false)
        if (/^[a-z 0-9]*[@][a-z]*[/.][a-z]{2,3}$/.test(emailVar)) {
            setEmailVerify(true)
        }
    }

    function handlepassword(e) {
        let passwordvar = e.nativeEvent.text;
        setPassword(passwordvar)
        setPasswordVerify(true)
    }



    return (

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} style={[Styles.container]}>
                        <StatusBar barStyle='dark-content' backgroundColor={'white'} />

            <View style={{ alignItems: "center", justifyContent: 'center' }} >
                <Image style={Styles.loginimg} source={require("../assets/loginimg.png")}></Image>
                <Text style={[Styles.text, { fontSize: 18 }]}>Sign to View Your Profile </Text>
                <Text style={[Styles.text, { marginTop: 0, fontSize: 15 }]}>Your profile data is Saved to your account</Text>


                <TextInput style={Styles.input} placeholder="Enter Your Email Address" onChange={e => handleemail(e)}></TextInput>
                {email.length < 1 ? null : emailVerify ? (null) : (<Text style={Styles.ralert}>Please Enter a vaild Email Address</Text>)}

                <View style={[Styles.input]}>

                    <TextInput style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }} placeholder="Enter Your Password"
                        onChange={e => handlepassword(e)}
                        secureTextEntry={showpassword}>
                    </TextInput>

                    <Pressable style={{ position: 'absolute', alignSelf: 'flex-end', right: '5%' }}
                        onPress={() => setShowpassword(!showpassword)}>
                        <Feather name={showpassword ? 'eye' : 'eye-off'} size={20} color={'black'} />
                    </Pressable>

                </View>

                <Pressable style={{ alignSelf: 'flex-end', right: 10 }} onPress={() => navigation.navigate('Forgot')}>
                    <Text style={[{ marginTop: 10, fontSize: 15 }]}>Forgot Password?</Text>

                </Pressable>

                <Pressable style={Styles.btn} onPress={() => handlesubmit()}>
                    <Text style={Styles.btntext}>Log in</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={[{ marginTop: 10, fontSize: 15 }]}>Didn't have an account? Create Account</Text>

                </Pressable>


            </View>

        </KeyboardAvoidingView>


    )


}

