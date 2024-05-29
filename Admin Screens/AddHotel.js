

import { View, Text, SafeAreaView, Pressable, Alert, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView } from "react-native"
import { Styles } from "../Common Component/Styles"
import { useEffect, useState } from "react"
import Loading from "../Common Component/loading"
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../Api";
import Toast from "react-native-toast-message";
import { Avatar } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import * as DocumentPicker from 'expo-document-picker';
import getdata from "../Service/UserServices.js/Getdata";
import uploadImageToCloudinary from "../Service/ImageServices/UploadCloudinary";
import AddHotel from "../Service/AdminServices/addHotel";
import { useSelector } from "react-redux";




export default function AdminBussiness() {
    const navigation = useNavigation()

    const Hoteluser = useSelector(state => state.user.userData)
    const [Hotelname, setHotelName] = useState("")
    const [Hotelnumber, setHotelNumber] = useState("")
    const [Location, setLocation] = useState('')
    const [LocationLink, setLocationLink] = useState('')
    const [DiscountRate, setDiscountRate] = useState("")
    const [ActualRate, setActualRate] = useState('')
    const [DiscountPercentage, setDiscountPercentage] = useState("")
    const [TaxandFee, setTaxandFee] = useState("")
    const [Rating, setRating] = useState("")
    const [ReviewCount, setReviewCount] = useState("")
    const [FacilityOne, setFacilityOne] = useState("")
    const [FacilityTwo, setFacilityTwo] = useState("")
    const [FacilityThree, setFacilityThree] = useState("")
    const [AvailableRooms, setAvailableRooms] = useState("")
    const [PersonsPerRoom, setPersonsPerRoom] = useState("")
    const [ExtraRateperhead, setExtraRateperhead] = useState("")
    const [ExtraRateperRoom, setExtraRateperRoom] = useState("")
    const [ExtraRateperDay, setExtraRateperDay] = useState("")
    const [imageone, setimageOne] = useState("")
    const [imagetwo, setimageTwo] = useState("")
    const [imageThree, setimageThree] = useState("")
    const [imagefour, setimageFour] = useState("")

    const [loadingOne, setLoadingOne] = useState(false)
    const [loadingTwo, setLoadingTwo] = useState(false)
    const [loadingThree, setLoadingThree] = useState(false)
    const [loadingFour, setLoadingFour] = useState(false)
    const [Loading, SetLoading] = useState(false)

    const route = useRoute()




    const selectImage = async (State, loading) => {
        loading(true)
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                multiple: false, // Ensure only one image is selected
            });
            console.log("Result", result)

            if (!result.canceled) {
                // Get the local URI of the selected image
                console.log(result)
                const localURI = result.assets[0].uri;

                // Read the file from local storage
                const base64Image = await FileSystem.readAsStringAsync(localURI, { encoding: FileSystem.EncodingType.Base64 });
                console.log(base64Image)
                // Store the base64 representation in State
                const CloudinaryLink = await uploadImageToCloudinary(base64Image)
                State(CloudinaryLink)
                console.log(CloudinaryLink)

                // If you need to trigger a re-render due to state change, update State accordingly
                // setState({ ...State });

                console.log(CloudinaryLink);
            } else if (result.canceled) {
                console.log('Image selection cancelled.');
            }
            loading(false)
        } catch (error) {
            console.error('Error selecting image: ', error);
        }
    };


    async function handleSubmit() {
        if (!Hotelname || !Hotelnumber || !Location || !LocationLink || !ActualRate || !DiscountRate || !DiscountPercentage || !TaxandFee || !Rating || !FacilityOne || !AvailableRooms || !PersonsPerRoom || !ExtraRateperhead || !ExtraRateperRoom || !ExtraRateperDay || !imageone || !imagetwo || !imageThree || !imagefour) {
            Toast.show({
                type: 'error',
                text1: 'Please fill in all the required fields',
                visibilityTime: 3000,
                position: 'bottom'
            });
            return;
        }

        SetLoading(true)

        try {
            const Hoteldata = {
                hoteluserid: Hoteluser._id,
                hotelname: Hotelname,
                hotelnumber: Hotelnumber,
                location: Location,
                locationlink: LocationLink,
                actualrate: ActualRate,
                discountedrate: DiscountRate,
                discountpercentage: DiscountPercentage,
                taxandfee: TaxandFee,
                availablerooms: AvailableRooms,
                personsperroom: PersonsPerRoom,
                extraperhead: ExtraRateperhead,
                extraperroom: ExtraRateperRoom,
                extraperday: ExtraRateperDay,
                rating: Rating,
                facilities: [FacilityOne, FacilityTwo, FacilityThree],
                images: [imageone, imagetwo, imageThree, imagefour]
            }

            await AddHotel(Hoteldata, navigation)

        } catch (err) {
            console.log(err)
        }



        SetLoading(false)

    }

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                <View style={[styles.innerContainer]}>

                    <Image style={styles.loginImg} source={require("../assets/hotels.png")} />
                   
                    <Text style={styles.message}>Grow Up Your Business With Us</Text>
                    
                    <Text style={styles.requestMessage}>Interested in adding your business? Let us know!</Text>


                    <TextInput style={styles.input} placeholder=" Hotel Name Inculde Stay Ease" onChange={(e) => setHotelName(e.nativeEvent.text)} />
                    
                    <TextInput style={styles.input} placeholder=" Hotel Contact Number" onChange={(e) => setHotelNumber(e.nativeEvent.text)} />

                    <TextInput style={styles.input} placeholder="Location" onChange={(e) => setLocation(e.nativeEvent.text)} />
                   
                    <TextInput style={styles.input} placeholder="Location Google Map Link" onChange={(e) => setLocationLink(e.nativeEvent.text)} />


                    <TextInput style={styles.input} placeholder="Actual Rate" onChange={(e) => setActualRate(e.nativeEvent.text)} />
                   
                    <TextInput style={styles.input} placeholder="Discounted Rate" onChange={(e) => setDiscountRate(e.nativeEvent.text)} />


                    <TextInput style={styles.input} placeholder="Discount Percentage in No:" onChange={(e) => setDiscountPercentage(e.nativeEvent.text)} />
                    
                    <TextInput style={styles.input} placeholder="Tax and Fee in Rs" onChange={(e) => setTaxandFee(e.nativeEvent.text)} />


                    <TextInput style={styles.input} placeholder="Rating" onChange={(e) => setRating(e.nativeEvent.text)} />
                   
                    <TextInput style={styles.input} placeholder="Facility One" onChange={(e) => setFacilityOne(e.nativeEvent.text)} />


                    <TextInput style={styles.input} placeholder="Facility Two" onChange={(e) => setFacilityTwo(e.nativeEvent.text)} />
                   
                    <TextInput style={styles.input} placeholder="Facility Three" onChange={(e) => setFacilityThree(e.nativeEvent.text)} />



                    <TextInput style={styles.input} placeholder="Extra Rate Per Head" onChange={(e) => setExtraRateperhead(e.nativeEvent.text)} />
                   
                    <TextInput style={styles.input} placeholder="Extra Rate Per Room" onChange={(e) => setExtraRateperRoom(e.nativeEvent.text)} />



                    <TextInput style={styles.input} placeholder="Extra Rate Per Day" onChange={(e) => setExtraRateperDay(e.nativeEvent.text)} />
                   
                    <TextInput style={styles.input} placeholder="No: Of Rooms Currently Available" onChange={(e) => setAvailableRooms(e.nativeEvent.text)} />


                    <TextInput style={styles.input} placeholder="No: Of Persons Per Room" onChange={(e) => setPersonsPerRoom(e.nativeEvent.text)} />
                   
                    <Pressable style={styles.passwordContainer} onPress={() => selectImage(setimageOne, setLoadingOne)} >
                    <FontAwesome name="camera" size={15} color="black" style={styles.cameraIcon} />
                        <Text style={styles.passwordInput}>{loadingOne ? 'Processing' : imageone ? "Selected" : "Select Image"}</Text>
                    </Pressable>



                    <Pressable style={styles.passwordContainer} onPress={() => selectImage(setimageTwo, setLoadingTwo)} >
                    <FontAwesome name="camera" size={15} color="black" style={styles.cameraIcon} />

                        <Text style={styles.passwordInput}>{loadingTwo ? 'Processing' : imagetwo ? "Selected" : "Select Image"}</Text>
                    </Pressable>

                    <Pressable style={styles.passwordContainer} onPress={() => selectImage(setimageThree, setLoadingThree)} >
                    <FontAwesome name="camera" size={15} color="black" style={styles.cameraIcon} />
                        <Text style={styles.passwordInput}>{loadingThree ? 'Processing' : imageThree ? "Selected" : "Select Image"}</Text>
                    </Pressable>



                    <Pressable style={styles.passwordContainer} onPress={() => selectImage(setimageFour, setLoadingFour)} >
                    <FontAwesome name="camera" size={15} color="black" style={styles.cameraIcon} />
                        <Text style={styles.passwordInput}>{loadingFour ? 'Processing' : imagefour ? "Selected" : "Select Image"}</Text>
                    </Pressable>


                    <Pressable style={styles.btn} onPress={() => {
                        Loading ? null :
                            handleSubmit()
                    }} >
                        <Text style={styles.btnText}>{Loading ? <ActivityIndicator color='white' /> : 'Submit'}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
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
    message: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    requestMessage: {
        fontSize: 15
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        top: 10
    },
    loginImg: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    passwordContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        marginBottom:15,
        top:5
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: '#888',
    },
    cameraIcon: {
        marginRight: 10,
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
})
