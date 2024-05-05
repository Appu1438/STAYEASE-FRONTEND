

import { View, Text, SafeAreaView, Pressable, Alert, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native"
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
import { encode } from 'base-64';



export default function AddHotel() {
    const navigation = useNavigation()

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
    const [imageone, setimageOne] = useState("")
    const [imagetwo, setimageTwo] = useState("")
    const [imageThree, setimageThree] = useState("")
    const [imagefour, setimageFour] = useState("")

    const route = useRoute()


  
    const selectImage = async (State) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                multiple: false, // Ensure only one image is selected
            });
            console.log("Result",result)
    
            if (!result.canceled ) {
                // Get the local URI of the selected image
                const localURI = result.assets[0].uri;
    
                // Read the file from local storage
                const base64Image = await FileSystem.readAsStringAsync(localURI, { encoding: FileSystem.EncodingType.Base64 });
    
                // Store the base64 representation in State
                const CloudinaryLink= await uploadImageToCloudinary(base64Image)
                State(CloudinaryLink)
    
                // If you need to trigger a re-render due to state change, update State accordingly
                // setState({ ...State });
    
                console.log( CloudinaryLink);
            } else if (result.canceled ) {
                console.log('Image selection cancelled.');
            }
        } catch (error) {
            console.error('Error selecting image: ', error);
        }
    };

    const uploadImageToCloudinary = async (base64Image) => {
        try {
            const cloudName = 'stayease'; // Your Cloudinary cloud name
            const uploadPreset = 'stayease'; // Name of your Cloudinary upload preset
    
            const cloudinaryUploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    
            const response = await fetch(cloudinaryUploadEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    file: `data:image/jpeg;base64,${base64Image}`,
                    upload_preset: uploadPreset // Specify the upload preset name
                }),
            });
    
            const data = await response.json();
            console.log('data',data)
            return data.secure_url; // URL of the uploaded image
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return null;
        }
    };

    async function handleSubmit(){
        const Hoteldata={
            hotelname:Hotelname,
            hotelnumber:Hotelnumber,
            location:Location,
            locationlink:LocationLink,
            actualrate:ActualRate,
            discountedrate:DiscountRate,
            discountpercentage:DiscountPercentage,
            taxandfee:TaxandFee,
            rating:Rating,
            reviewcount:ReviewCount,
            facilities:[FacilityOne,FacilityTwo,FacilityThree],
            images:[imageone,imagetwo,imageThree,imagefour]
        }

        await axios.post(`${API_BASE_URL}/add-hotel`,Hoteldata).then(res=>{
            console.log(res.data)
            if(res.data.status=='ok'){
                Toast.show({
                    type:'success',
                    text1:JSON.stringify(res.data.data),
                    visibilityTime:3000,
                    position:'bottom'
                })
                navigation.navigate('Admin')
            }else{
                Toast.show({
                    type:'error',
                    text1:JSON.stringify(res.data.data),
                    visibilityTime:3000,
                    position:'bottom'
                })
            }
         }).catch(err=>{
            Toast.show({
                type:'error',
                text1:'Unknown Error Occured',
                visibilityTime:3000,
                position:'bottom'
            })
       })
    }

    return (
        <SafeAreaView style={Styles.profilecontainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                <View style={[Styles.container, styles.container]}>
                    <Image style={Styles.signinimg} source={require("../assets/hotels.png")} />
                    <TextInput style={Styles.input} placeholder=" Hotel Name" onChange={(e) => setHotelName(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder=" Hotel Number" onChange={(e) => setHotelNumber(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder="Location" onChange={(e) => setLocation(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder="Location Google Map Link" onChange={(e) => setLocationLink(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder="Actual Rate" onChange={(e) => setActualRate(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder="Discounted Rate" onChange={(e) => setDiscountRate(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder="Discount in Percentage" onChange={(e) => setDiscountPercentage(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder="Tax and Fee in Rs" onChange={(e) => setTaxandFee(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder="Rating" onChange={(e) => setRating(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder="Review Count" onChange={(e) => setReviewCount(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder="Facility One" onChange={(e) => setFacilityOne(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder="Facility Two" onChange={(e) => setFacilityTwo(e.nativeEvent.text)} />
                    <TextInput style={Styles.input} placeholder="Facility Three" onChange={(e) => setFacilityThree(e.nativeEvent.text)} />

                    <Pressable style={Styles.input} onPress={() => selectImage(setimageOne)} >
                        <Text style={Styles}>{imageone ? "Selected" : "Select Image"}</Text>
                    </Pressable>
                    <Pressable style={Styles.input} onPress={() => selectImage(setimageTwo)} >
                        <Text style={Styles}>{imagetwo ? "Selected" : "Select Image"}</Text>
                    </Pressable>
                    <Pressable style={Styles.input} onPress={() => selectImage(setimageThree)} >
                        <Text style={Styles}>{imageThree ? "Selected" : "Select Image"}</Text>
                    </Pressable>
                    <Pressable style={Styles.input} onPress={() => selectImage(setimageFour)} >
                        <Text style={Styles}>{imagefour ? "Selected" : "Select Image"}</Text>
                    </Pressable>

                    <Pressable style={Styles.btn} onPress={()=>handleSubmit()} >
                        <Text style={Styles.btntext}>Add</Text>
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
        paddingTop: '5%',
    },
})
