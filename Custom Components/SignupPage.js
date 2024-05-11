import { View, Text, Image, TextInput, KeyboardAvoidingView, Pressable, Platform, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Styles } from "../Common Component/Styles";
import { useState } from "react";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import API_BASE_URL from "../Api";
import Toast from "react-native-toast-message";



export default function Signup() {
    const navigation = useNavigation()
    const [image, setImage] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC')
    const [name, setName] = useState("")
    const [nameVerify, setNameVerify] = useState(false)
    const [number, setNumber] = useState("")
    const [numberVerify, setNumberVerify] = useState(false)
    const [email, setEmail] = useState("")
    const [emailVerify, setEmailVerify] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordVerify, setPasswordVerify] = useState(false)
    const [showpassword, setShowpassword] = useState(true)
    const [userType, setUserType] = useState("User")
    const [OTP, setOTP] = useState("")
    const [generatedOTP, setGeneratedOTP] = useState("")
    const [showOTPField, setShowOTPField] = useState(false)
    const [OTPAttempt, setOTPAttempt] = useState(0)

    const [loading, setLoading] = useState(false)

    function handleUserTypeChange(type) {
        setUserType(type);
    }




    function generateOTP() {
        setLoading(true)

        if (nameVerify && numberVerify && emailVerify && passwordVerify) {
            setOTPAttempt(0)

            // Call your backend endpoint to generate OTP
            axios.post(`${API_BASE_URL}/generateOTP`, { email })
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
                            text1: 'Failed to generate OTP',
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
                });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Fill Mandatory Details Correctly',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
        setLoading(false)

    }

    function handleOTPVerification() {
        setLoading(true)
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
            Toast.show({
                type: 'error',
                text1: 'Invalid OTP',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
        setLoading(false)
    }


    function handlesubmit() {
        setLoading(true)
        const Userdata = {
            name: name,
            number,
            email,
            password,
            userType,
            image
        }

        axios.post(`${API_BASE_URL}/register`, Userdata)
            .then(res => {
                console.log(res.data);

                if (res.data.status == 'ok') {
                    // Alert.alert('Registration Successfull')
                    Toast.show({
                        type: 'success',
                        text1: 'Registration Successfull',
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
        setLoading(false)

    }


    function handlename(e) {
        let nameVar = e.nativeEvent.text
        setName(nameVar)
        setNameVerify(false)
        if (nameVar.length >= 4) {
            setNameVerify(true)
        }
    }

    function handleemail(e) {
        let emailVar = e.nativeEvent.text;
        setEmail(emailVar)
        setEmailVerify(false)
        if (/^[a-z 0-9]*[@][a-z]*[/.][a-z]{2,3}$/.test(emailVar)) {
            setEmailVerify(true)
        }
    }
    function handlenumber(e) {
        let numberVar = e.nativeEvent.text;
        setNumber(numberVar)
        setNumberVerify(false)
        if (/^[6-9]{1}[0-9]{9}$/.test(numberVar)) {
            setNumberVerify(true)
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


    return (

        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={[Styles.container, { alignItems: "center", justifyContent: 'center' }]}>

                <Image style={Styles.signinimg} source={require("../assets/signupimg.png")}></Image>
                <Text style={[Styles.text, { fontSize: 18, marginTop: -10 }]}>Sign Up with STAYEASE </Text>
                <Text style={[{ marginTop: 5, fontSize: 17 }]}>Book Hotels, Starting 599 only</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                    <Text style={{ marginRight: 20, fontSize: 15 }}>Register as:</Text>
                    <Pressable onPress={() => handleUserTypeChange('User')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name={userType === 'User' ? 'dot-circle-o' : 'circle-o'}
                            size={20}
                            color={'black'}
                        />
                        <Text style={{ marginLeft: 5 }}>User</Text>
                    </Pressable>
                    <Pressable onPress={() => handleUserTypeChange('Business')} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                        <FontAwesome
                            name={userType === 'Business' ? 'dot-circle-o' : 'circle-o'}
                            size={20}
                            color={'black'}
                        />
                        <Text style={{ marginLeft: 5 }}>Business</Text>
                    </Pressable>
                </View>


                <TextInput
                    style={Styles.input}
                    placeholder="Enter Your Name"
                    onChange={name => handlename(name)}>
                </TextInput>
                {name.length < 1 ? null : nameVerify ? (null) : (<Text style={Styles.ralert}>Username Must Contains Atleast 4 Characters</Text>)}

                <TextInput
                    style={Styles.input}
                    maxLength={10}
                    placeholder="Enter Your Mobile Number"
                    onChange={e => handlenumber(e)}>
                </TextInput>
                {number.length < 1 ? null : numberVerify ? (null) : (<Text style={Styles.ralert}>Please Enter a vaild Phone Number</Text>)}

                <TextInput
                    style={Styles.input}
                    placeholder="Enter Your Email"
                    onChange={e => handleemail(e)}></TextInput>
                {email.length < 1 ? null : emailVerify ? (null) : (<Text style={Styles.ralert}>Please Enter a vaild Email Address</Text>)}

                <View style={[Styles.input,]}>

                    <TextInput
                        style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}
                        placeholder="Enter Your Password"
                        onChange={e => handlepassword(e)}
                        secureTextEntry={showpassword}>
                    </TextInput>

                    <Pressable style={{ position: 'absolute', alignSelf: 'flex-end', right: '5%' }}
                        onPress={() => setShowpassword(!showpassword)}>
                        <Feather name={showpassword ? 'eye' : 'eye-off'} size={20} color={'black'} />
                    </Pressable>

                </View>
                {password.length < 1 ? null : passwordVerify ? (null) : (<Text style={Styles.ralert}>Password Must Contains Atleast 8 Characters , 1 Uppercase, 3 Lowercase, 1 Special Character and 2 Numbers </Text>)}

                {showOTPField
                    ? (<TextInput
                        style={Styles.input}
                        placeholder="Enter OTP Sent to Your Email"
                        onChange={e => setOTP(e.nativeEvent.text)}></TextInput>)
                    : (null)}

                <Pressable
                    style={Styles.btn}
                    onPress={() => {loading?(null):( showOTPField && OTPAttempt <= 2 ? handleOTPVerification() : generateOTP() )}}
                    >
                    {loading ? (<ActivityIndicator color='white' />) : (
                        <Text style={Styles.btntext} >{showOTPField && OTPAttempt <= 2 ? 'Register' : OTPAttempt > 2 ? 'Resend OTP' : 'Get OTP'}</Text>
                    )}
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={[{ marginTop: 10, fontSize: 15 }]}>Already have an account? Login</Text>

                </Pressable>

            </View>
        </ScrollView>


    )


}

