
import { View, Text, Image, TextInput, KeyboardAvoidingView, Pressable, Platform, Alert, BackHandler, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from 'react-native-vector-icons/Feather';
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [showpassword, setShowpassword] = useState(true);
    const [loading, setLoading] = useState(false);

    function handlesubmit() {
        if (emailVerify && passwordVerify) {
            setLoading(true)
            const userdata = { email, password };
            axios.post(`${API_BASE_URL}/user/login-user`, userdata)
                .then(res => {
                    if (res.data.status === 'ok') {
                        Toast.show({
                            type: 'success',
                            text1: 'Logged in Successfully',
                            visibilityTime: 3000,
                            position: 'bottom'
                        });
                        setLoading(false)
                        AsyncStorage.setItem("token", res.data.data);
                        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                        AsyncStorage.setItem('userType', res.data.userType);
                        if (res.data.userType == 'Admin' || res.data.userType == 'SuperAdmin') {
                            navigation.navigate("AdminLoggedin");
                        } else if (res.data.userType === 'Business') {
                            navigation.navigate("HotelLoggedin");
                        } else {
                            navigation.navigate("UserLoggedin");
                        }
                    } else {
                        setLoading(false)
                        Toast.show({
                            type: 'error',
                            text1: JSON.stringify(res.data.data),
                            visibilityTime: 3000,
                            position: 'bottom'
                        });
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    setLoading(false)
                    Toast.show({
                        type: 'error',
                        text1: "An error occurred while logging in",
                        visibilityTime: 3000,
                        position: 'bottom'
                    });
                });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Please Fill Correctly',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    }

    const handleBackPress = () => {
        Alert.alert('Exit App', 'Are you sure want to exit?',
            [
                { text: "Return Home", onPress: () => navigation.navigate('Unauthenticated'), style: 'cancel' },
                { text: "Exit", onPress: () => BackHandler.exitApp(), style: 'cancel' }
            ]
        );
        return true;
    };

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
            };
        }, [])
    );

    function handleemail(e) {
        let emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        setEmailVerify(false);
        if (/^[a-z 0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(emailVar)) {
            setEmailVerify(true);
        }
    }

    function handlepassword(e) {
        let passwordvar = e.nativeEvent.text;
        setPassword(passwordvar);
        setPasswordVerify(true);
    }

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={'#fff'} />
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

                <View style={styles.innerContainer}>
                    <Image style={styles.loginImg} source={require("../../assets/images/loginimg.png")} />
                    <Text style={styles.title}>Sign In to View Your Profile</Text>
                    <Text style={styles.subtitle}>Your profile data is saved to your account</Text>
                    <TextInput
                        style={[styles.input, { shadowColor: emailVerify ? '#006400' : '#f73939' }]}
                        placeholder="Enter Your Email Address"
                        onChange={handleemail}
                        placeholderTextColor="#888"
                    />
                    {email.length < 1 ? null : emailVerify ? null : (
                        <Text style={styles.errorText}>Please Enter a Valid Email Address</Text>
                    )}
                    <View style={[styles.passwordContainer, { shadowColor: 'black' }]}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter Your Password"
                            onChange={handlepassword}
                            secureTextEntry={showpassword}
                            placeholderTextColor="#888"
                        />
                        <Pressable style={styles.eyeIcon} onPress={() => setShowpassword(!showpassword)}>
                            <Feather name={showpassword ? 'eye' : 'eye-off'} size={20} color={'#888'} />
                        </Pressable>
                    </View>
                    <Pressable style={styles.forgotPassword} onPress={() => navigation.navigate('Forgot')}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </Pressable>
                    <Pressable style={styles.btn} onPress={handlesubmit}>
                        <Text style={styles.btnText}>
                            {loading ?
                             (<ActivityIndicator color='white' />) : 
                             ("Log In")}</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupText}>Don't have an account? Create Account</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',

    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    loginImg: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        shadowColor: '#f73939',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
    },
    passwordContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        shadowColor: 'blue',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    eyeIcon: {
        marginLeft: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 20,
    },
    forgotPasswordText: {
        fontSize: 15,
        color: 'black',
        right: 10
    },
    btn: {
        width: '100%',
        height: 50,
        backgroundColor: '#f73939',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupText: {
        fontSize: 15,
        color: '#666',
    },
};


