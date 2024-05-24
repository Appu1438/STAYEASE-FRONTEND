

import { View, Text, SafeAreaView, Pressable, Alert, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native"
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
import uploadImageToCloudinary from "../Service/ImageServices/UploadCloudinary";
import ReqHotel from "../Service/BusinessService/reqBusiness";
import Updatebusiness from "../Service/BusinessService/UpdateBusines";
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
        <SafeAreaView style={Styles.profilecontainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                <View style={[Styles.container, styles.container]}>

                    <Image style={{ width: 170, height: 150, top: -10 }} source={require("../assets/hotels.png")} />
                    <Text style={styles.message}>Update Your Business </Text>
                    <Text style={styles.requestMessage}>Want to update your business? </Text>



                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                        <TextInput style={[Styles.input, { width: '45%' }]} value={Hotelname} placeholder=" Hotel Name Inculde Stay Ease" onChange={(e) => setHotelName(e.nativeEvent.text)} />
                        <TextInput style={[Styles.input, { width: '45%' }]} value={Hotelnumber} placeholder=" Hotel Contact Number" onChange={(e) => setHotelNumber(e.nativeEvent.text)} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                        <TextInput style={[Styles.input, { width: '45%' }]} value={Location} placeholder="Location" onChange={(e) => setLocation(e.nativeEvent.text)} />
                        <TextInput style={[Styles.input, { width: '45%' }]} value={LocationLink} placeholder="Location Google Map Link" onChange={(e) => setLocationLink(e.nativeEvent.text)} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Actual Rate" onChange={(e) => setActualRate(e.nativeEvent.text)} />
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Discounted Rate" onChange={(e) => setDiscountRate(e.nativeEvent.text)} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Discount Percentage in No:" onChange={(e) => setDiscountPercentage(e.nativeEvent.text)} />
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Tax and Fee in Rs" onChange={(e) => setTaxandFee(e.nativeEvent.text)} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Rating" onChange={(e) => setRating(e.nativeEvent.text)} />
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Facility One" onChange={(e) => setFacilityOne(e.nativeEvent.text)} />
                        {/* <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Review Count" onChange={(e) => setReviewCount(e.nativeEvent.text)} /> */}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Facility Two" onChange={(e) => setFacilityTwo(e.nativeEvent.text)} />
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Facility Three" onChange={(e) => setFacilityThree(e.nativeEvent.text)} />

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Extra Rate Per Head" onChange={(e) => setExtraRateperhead(e.nativeEvent.text)} />
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Extra Rate Per Room" onChange={(e) => setExtraRateperRoom(e.nativeEvent.text)} />

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="Extra Rate Per Day" onChange={(e) => setExtraRateperDay(e.nativeEvent.text)} />
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="No: Of Rooms Currently Available" onChange={(e) => setAvailableRooms(e.nativeEvent.text)} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                        <TextInput style={[Styles.input, { width: '45%' }]} placeholder="No: Of Persons Per Room" onChange={(e) => setPersonsPerRoom(e.nativeEvent.text)} />
                        <Pressable style={[Styles.input, { width: '45%' }]} onPress={() => selectImage(setimageOne, setLoadingOne)} >
                            <Text style={Styles}>{loadingOne ? 'Processing' : imageone ? "Selected" : "Select Image"}</Text>
                        </Pressable>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>

                        <Pressable style={[Styles.input, { width: '45%' }]} onPress={() => selectImage(setimageTwo, setLoadingTwo)} >
                            <Text style={Styles}>{loadingTwo ? 'Processing' : imagetwo ? "Selected" : "Select Image"}</Text>
                        </Pressable>
                        <Pressable style={[Styles.input, { width: '45%' }]} onPress={() => selectImage(setimageThree, setLoadingThree)} >
                            <Text style={Styles}>{loadingThree ? 'Processing' : imageThree ? "Selected" : "Select Image"}</Text>
                        </Pressable>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>

                        <Pressable style={[Styles.input, { width: '45%' }]} onPress={() => selectImage(setimageFour, setLoadingFour)} >
                            <Text style={Styles}>{loadingFour ? 'Processing' : imagefour ? "Selected" : "Select Image"}</Text>
                        </Pressable></View>


                    <Pressable style={Styles.btn} onPress={() => {
                        Loading ? null :
                            handleSubmit()
                    }} >
                        <Text style={Styles.btntext}>{Loading ? <ActivityIndicator color='white' /> : 'Update'}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        alignItems: "center",
        justifyContent: 'flex-start',
        paddingTop: '0%',
        paddingBottom: 20
    },
    message: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    requestMessage: {
        fontSize: 15
    }
})