

import { View, Text, SafeAreaView, Pressable, Alert, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView } from "react-native"
import { useEffect, useState } from "react"
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-toast-message";
import { Avatar } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import uploadImageToCloudinary from "../../../Service/ImageServices/UploadCloudinary";
import Updatebusiness from "../../../Service/BusinessService/UpdateBusines";
import { useSelector } from "react-redux";




export default function EditBussiness() {
    const navigation = useNavigation()
    const route = useRoute()

    const Hoteluser = useSelector(state => state.user.userData)

    // const [Hoteluser, setHotelUser] = useState('')
    const [Hotelname, setHotelName] = useState(route.params.data.hotelname)
    const [Hotelnumber, setHotelNumber] = useState(route.params.data.hotelnumber)
    const [Location, setLocation] = useState(route.params.data.location)
    const [LocationLink, setLocationLink] = useState(route.params.data.locationlink)
    const [DiscountRate, setDiscountRate] = useState("")
    const [ActualRate, setActualRate] = useState('')
    const [DiscountPercentage, setDiscountPercentage] = useState("")
    const [TaxandFee, setTaxandFee] = useState("")
    const [Rating, setRating] = useState(route.params.data.rating)
    const [ReviewCount, setReviewCount] = useState("")
    const [FacilityOne, setFacilityOne] = useState(route.params.data.facilities[0])
    const [FacilityTwo, setFacilityTwo] = useState(route.params.data.facilities[1])
    const [FacilityThree, setFacilityThree] = useState(route.params.data.facilities[2])
    const [AvailableRooms, setAvailableRooms] = useState("")
    const [PersonsPerRoom, setPersonsPerRoom] = useState("")
    const [ExtraRateperhead, setExtraRateperhead] = useState("")
    const [ExtraRateperRoom, setExtraRateperRoom] = useState("")
    const [ExtraRateperDay, setExtraRateperDay] = useState("")
    const [imageone, setimageOne] = useState(route.params.data.images[0])
    const [imagetwo, setimageTwo] = useState(route.params.data.images[1])
    const [imageThree, setimageThree] = useState(route.params.data.images[2])
    const [imagefour, setimageFour] = useState(route.params.data.images[3])

    const [loadingOne, setLoadingOne] = useState(false)
    const [loadingTwo, setLoadingTwo] = useState(false)
    const [loadingThree, setLoadingThree] = useState(false)
    const [loadingFour, setLoadingFour] = useState(false)
    const [Loading, SetLoading] = useState(false)

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
                const localURI = result.assets[0].uri;

                // Read the file from local storage
                const base64Image = await FileSystem.readAsStringAsync(localURI, { encoding: FileSystem.EncodingType.Base64 });

                // Store the base64 representation in State
                const CloudinaryLink = await uploadImageToCloudinary(base64Image)
                State(CloudinaryLink)

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
                hotelid:route.params.data._id,
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

            await Updatebusiness(Hoteldata, navigation)
        } catch (err) {
            console.log(err)
        }


        SetLoading(false)

    }

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                <View style={[styles.innerContainer]}>

                    <Image style={styles.loginImg} source={require("../../assets/images/hotels.png")} />
                   
                    <Text style={styles.message}>Want to Update Your Business With Us</Text>
                    
                    <Text style={styles.requestMessage}>Interested in Updating your business!</Text>


                    <TextInput style={styles.input} value={Hotelname} placeholder=" Hotel Name Inculde Stay Ease" onChange={(e) => setHotelName(e.nativeEvent.text)} />
                    
                    <TextInput style={styles.input} value={Hotelnumber} placeholder=" Hotel Contact Number" onChange={(e) => setHotelNumber(e.nativeEvent.text)} />

                    <TextInput style={styles.input} value={Location} placeholder="Location" onChange={(e) => setLocation(e.nativeEvent.text)} />
                   
                    <TextInput style={styles.input} value={LocationLink} placeholder="Location Google Map Link" onChange={(e) => setLocationLink(e.nativeEvent.text)} />


                    <TextInput style={styles.input} placeholder="Actual Rate" onChange={(e) => setActualRate(e.nativeEvent.text)} />
                   
                    <TextInput style={styles.input} placeholder="Discounted Rate" onChange={(e) => setDiscountRate(e.nativeEvent.text)} />


                    <TextInput style={styles.input} placeholder="Discount Percentage in No:" onChange={(e) => setDiscountPercentage(e.nativeEvent.text)} />
                    
                    <TextInput style={styles.input} placeholder="Tax and Fee in Rs" onChange={(e) => setTaxandFee(e.nativeEvent.text)} />


                    <TextInput style={styles.input} value={Rating} placeholder="Rating" onChange={(e) => setRating(e.nativeEvent.text)} />
                   
                    <TextInput style={styles.input} value={FacilityOne} placeholder="Facility One" onChange={(e) => setFacilityOne(e.nativeEvent.text)} />


                    <TextInput style={styles.input} value={FacilityTwo} placeholder="Facility Two" onChange={(e) => setFacilityTwo(e.nativeEvent.text)} />
                   
                    <TextInput style={styles.input} value={FacilityThree} placeholder="Facility Three" onChange={(e) => setFacilityThree(e.nativeEvent.text)} />



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
                        <Text style={styles.btnText}>{Loading ? <ActivityIndicator color='white' /> : 'Update'}</Text>
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
        fontSize: 16,
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
        shadowColor: 'blue',
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
        shadowColor: 'blue',
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