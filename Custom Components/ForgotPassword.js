import { View, Text, Image, TextInput, KeyboardAvoidingView, Pressable, Platform, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Styles } from "../Common Component/Styles";
import { useState } from "react";
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import API_BASE_URL from "../Api";
import { RadioButton } from "react-native-paper";
import Toast from "react-native-toast-message";
import { TouchableOpacity } from "react-native";

export default function ForgotPassword() {

    const navigation = useNavigation()

    const [number, setNumber] = useState("")
    const [numberVerify, setNumberVerify] = useState(false)
    const [email, setEmail] = useState("")
    const [emailVerify, setEmailVerify] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordVerify, setPasswordVerify] = useState(false)
    const [showpassword, setShowpassword] = useState(true)
    const [OTP, setOTP] = useState("")
    const [generatedOTP, setGeneratedOTP] = useState("")
    const [showOTPField, setShowOTPField] = useState(false)
    const [OTPAttempt, setOTPAttempt] = useState(0)

    const [loading, setLoading] = useState(false)



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
        setPasswordVerify(false)
        if (/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,20}$/.test(passwordvar)) {
            setPasswordVerify(true)
        }
    }

    async function generateOTP() {
        if (emailVerify && passwordVerify) {
            setOTPAttempt(0)
            setLoading(true)
            // Call your backend endpoint to generate OTP
            await axios.post(`${API_BASE_URL}/user/generateOTP`, { email })
                .then(response => {
                    if (response.data.status === 'success') {
                        console.log("OTPF", response.data.otp)
                        setGeneratedOTP(response.data.otp);
                        setShowOTPField(true);
                        Toast.show({
                            type: 'success',
                            text1: 'OTP Genrated Successfully',
                            visibilityTime: 3000,
                            position: 'bottom'
                        });
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: JSON.stringify(res.data.data),
                            visibilityTime: 3000,
                            position: 'bottom'
                        });
                    }
                })
                .catch(error => {
                    console.error('Error generating OTP:', error);
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to generate OTP',
                        visibilityTime: 3000,
                        position: 'bottom'
                    });
                })
                .finally(() => setLoading(false));
        }  else {
            Toast.show({
                type: 'error',
                text1: 'Fill Mandatory Details Correctly',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    }

    function handleOTPVerification() {
        console.log('Generated OTP:', generatedOTP);
        console.log('Entered OTP:', OTP);
        if (OTP == generatedOTP) {
            Toast.show({
                type: 'success',
                text1: 'OTP Verified Successfully',
                visibilityTime: 3000,
                position: 'bottom'
            });
            setGeneratedOTP('')
            handlesubmit();
        } else {
            setOTPAttempt((OTPAttempt) => OTPAttempt + 1)
            console.log(OTPAttempt)
            Toast.show({
                type: 'error',
                text1: 'Invalid OTP',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    }



    function handlesubmit() {
        const Userdata = {
            email,
            password
        }

        axios.post(`${API_BASE_URL}/user/update-password`, Userdata)
            .then(res => {
                console.log(res.data);

                if (res.data.status == 'ok') {
                    // Alert.alert('Registration Successfull')
                    Toast.show({
                        type: 'success',
                        text1: 'Password Updated',
                        visibilityTime: 3000,
                        position: 'bottom'
                    })
                    navigation.navigate('Login')
                } else {
                    // Alert.alert(JSON.stringify(res.data.data))
                    Toast.show({
                        type: 'error',
                        text1: JSON.stringify(res.data.data),
                        visibilityTime: 3000,
                        position: 'bottom'
                    })

                }
            })
            .catch(error => {
                console.log(error)
            });


    }



    return (
        <KeyboardAvoidingView style={styles.container}>

            <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps={'always'}>
                <View style={[styles.innerContainer]}>

                    <Image style={Styles.signinimg} source={require("../assets/ForgotPassword.png")}></Image>

                    <Text style={[Styles.text, { fontSize: 18, marginTop: -10 }]}>Forgot Password </Text>

                    <TextInput
                        style={Styles.input}
                        placeholder="Enter Your Email"
                        onChange={e => handleemail(e)}></TextInput>
                    {email.length < 1 ? null : emailVerify ? (null) : (<Text style={Styles.ralert}>Please Enter a vaild Email Address</Text>)}

                    <View style={[styles.passwordContainer,]}>

                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter New Password"
                            onChange={e => handlepassword(e)}
                            secureTextEntry={showpassword}>
                        </TextInput>

                        <Pressable style={styles.eyeIcon}
                            onPress={() => setShowpassword(!showpassword)}>
                            <Feather name={showpassword ? 'eye' : 'eye-off'} size={20} color={'grey'} />
                        </Pressable>

                    </View>
                    {password.length < 1 ? null : passwordVerify ? (null) : (<Text style={Styles.ralert}>Password Must Contains Atleast 8 Characters , 1 Uppercase, 3 Lowercase, 1 Special Character and 2 Numbers </Text>)}

                    {showOTPField
                        ? (<TextInput
                            style={Styles.input}
                            placeholder="Enter OTP Sent to Your Email"
                            onChange={e => setOTP(e.nativeEvent.text)}></TextInput>)
                        : (null)}
                    {showOTPField ?
                        (<TouchableOpacity style={styles.forgotPassword} onPress={() => generateOTP()}>
                            <Text style={styles.forgotPasswordText}>Resend OTP</Text>
                        </TouchableOpacity>
                        )
                        : (null)}

                    <Pressable style={Styles.btn} onPress={() => { showOTPField && OTPAttempt <= 2 ? handleOTPVerification() : generateOTP() }}>
                        {loading ? (<ActivityIndicator color='white' />) : (
                            <Text style={Styles.btntext} >{showOTPField && OTPAttempt <= 2 ? 'Update Password' : OTPAttempt > 2 ? 'Resend OTP' : 'Get OTP'}</Text>
                        )}
                    </Pressable>


                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )

}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',

    },
    innerContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 10,
    },
    forgotPasswordText: {
        fontSize: 15,
        color: 'black',
        right: 10
    },
}