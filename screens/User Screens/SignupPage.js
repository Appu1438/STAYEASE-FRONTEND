import { View, Text, Image, TextInput, KeyboardAvoidingView, Pressable, Platform, ScrollView, Alert, ActivityIndicator, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Styles } from "../../components/Common Component/Styles";
import { useState } from "react";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import API_BASE_URL from "../../Api";
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




    async function generateOTP() {
        setLoading(true)

        if (nameVerify && numberVerify && emailVerify && passwordVerify) {
            setOTPAttempt(0)

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
                })
                .finally(() => setLoading(false));
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

        axios.post(`${API_BASE_URL}/user/register`, Userdata)
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

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={'white'} />
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

                <View style={[styles.innerContainer, { alignItems: "center", justifyContent: 'center' }]}>


                    <Image style={styles.loginImg} source={require("../../assets/images/signupimg.png")}></Image>
                    <Text style={styles.title}>Sign Up with STAYEASE </Text>
                    <Text style={styles.subtitle}>Book Hotels, Starting 599 only</Text>

                    <View style={styles.userTypeContainer}>
                        <Text style={styles.registerAsText}>Register as:</Text>
                        <View style={styles.userTypeButtons}>
                            <Pressable
                                style={[
                                    styles.userTypeButton,
                                    userType === 'User' && styles.selectedUserType,
                                ]}
                                onPress={() => handleUserTypeChange('User')}>
                                <FontAwesome
                                    name={userType === 'User' ? 'dot-circle-o' : 'circle-o'}
                                    size={20}
                                    color={'black'}
                                />
                                <Text style={styles.userTypeButtonText}>User</Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.userTypeButton,
                                    userType === 'Business' && styles.selectedUserType,
                                ]}
                                onPress={() => handleUserTypeChange('Business')}>
                                <FontAwesome
                                    name={userType === 'Business' ? 'dot-circle-o' : 'circle-o'}
                                    size={20}
                                    color={'black'}
                                />
                                <Text style={styles.userTypeButtonText}>Business</Text>
                            </Pressable>
                        </View>
                    </View>




                    <TextInput
                        style={[styles.input, { shadowColor: nameVerify ? '#006400' : '#f73939' }]}
                        placeholder="Enter Your Name"
                        onChange={name => handlename(name)}>
                    </TextInput>
                    {name.length < 1 ? null : nameVerify ? (null) : (<Text style={styles.errorText}>Username Must Contains Atleast 4 Characters</Text>)}

                    <TextInput
                        style={[styles.input, { shadowColor: numberVerify ? '#006400' : '#f73939' }]}
                        maxLength={10}
                        placeholder="Enter Your Mobile Number"
                        onChange={e => handlenumber(e)}>
                    </TextInput>
                    {number.length < 1 ? null : numberVerify ? (null) : (<Text style={styles.errorText}>Please Enter a vaild Phone Number</Text>)}

                    <TextInput
                        style={[styles.input, { shadowColor: emailVerify ? '#006400' : '#f73939' }]}
                        placeholder="Enter Your Email"
                        onChange={e => handleemail(e)}></TextInput>
                    {email.length < 1 ? null : emailVerify ? (null) : (<Text style={styles.errorText}>Please Enter a vaild Email Address</Text>)}

                    <View
                        style={[styles.passwordContainer, { shadowColor: passwordVerify ? '#006400' : '#f73939' }]}
                    >

                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter Your Password"
                            onChange={e => handlepassword(e)}
                            secureTextEntry={showpassword}>
                        </TextInput>

                        <Pressable style={styles.eyeIcon}
                            onPress={() => setShowpassword(!showpassword)}>
                            <Feather name={showpassword ? 'eye' : 'eye-off'} size={20} color={'black'} />
                        </Pressable>

                    </View>
                    {password.length < 1 ? null : passwordVerify ? (null) : (<Text style={styles.errorText}>Password Must Contains Atleast 8 Characters , 1 Uppercase, 3 Lowercase, 1 Special Character and 2 Numbers </Text>)}

                    {showOTPField
                        ? (<TextInput
                            style={[styles.input, { top: 15, shadowColor: 'black' }]}
                            placeholder="Enter OTP Sent to Your Email"
                            onChange={e => setOTP(e.nativeEvent.text)}></TextInput>)
                        : (null)}

                    {showOTPField  ?
                        (<TouchableOpacity style={styles.forgotPassword} onPress={() => generateOTP()}>
                            <Text style={styles.forgotPasswordText}>Resend OTP</Text>
                        </TouchableOpacity>
                        )
                        : (null)}

                    <Pressable
                        style={styles.btn}
                        onPress={() => { loading ? (null) : (showOTPField && OTPAttempt <= 2 ? handleOTPVerification() : generateOTP()) }}
                    >
                        {loading ? (<ActivityIndicator color='white' />) : (
                            <Text style={Styles.btntext} >{showOTPField && OTPAttempt <= 2 ? 'Register' : OTPAttempt > 2 ? 'Resend OTP' : 'Get OTP'}</Text>
                        )}
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text style={[{ marginTop: 10, fontSize: 15 }]}>Already have an account? Login</Text>

                    </Pressable>

                    {/* </View> */}


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
    userTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    registerAsText: {
        fontSize: 15,
        marginRight: 20,
    },
    userTypeButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userTypeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    selectedUserType: {
        opacity: 0.8
    },
    userTypeButtonText: {
        marginLeft: 5,
        fontSize: 15,
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
        shadowColor: '#f73939',
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
        marginBottom: 10,
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
        top: 15
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




