import { View, Text, SafeAreaView, Pressable, Alert, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView ,ActivityIndicator, KeyboardAvoidingView} from "react-native"
import { Styles } from "../Common Component/Styles"
import { useEffect, useState } from "react"
import Loading from "../Common Component/loading"
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import { faL } from "@fortawesome/free-solid-svg-icons";
import uploadImageToCloudinary from "../Service/ImageServices/UploadCloudinary";






export default function EditUser() {

    const navigation = useNavigation()

    const [Userdata, setUserdata] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [email, setEmail] = useState("")
    const [userType, setuserType] = useState("")
    const [image, setImage] = useState("")
    const route = useRoute()

    const [isLoading, setloading] = useState(false)
    const [loading, setLoading] = useState(false)






    useEffect(() => {
        const userData = route.params.data
        setUserdata(userData)
        setName(userData.name)
        setNumber(userData.number)
        setEmail(userData.email)
        setuserType(userData.userType)
        setImage(userData.image)
    }, [])

   



    // const Selectphoto = async () => {
    //     console.log('Picker');
    //     try {
    //         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    //         if (permissionResult.granted === false) {
    //             console.log("You've refused to allow this appp to access your photos!");
    //             Toast.show({
    //                 type: 'Error',
    //                 text1: `You've Refused to Access Your Photos`,
    //                 visibilityTime: 3000,
    //                 position: 'bottom'
    //             })
    //             return;
    //         }
    //         Toast.show({
    //             type: 'success',
    //             text1: `You've Granted to Access Your Photos`,
    //             visibilityTime: 3000,
    //             position: 'bottom'
    //         })
    //         console.log("You've Granted to allow this appp to access your photos!");

    //         const result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             allowsEditing: true,
    //             aspect: [1, 1],
    //             quality: 1,
    //         });

    //         console.log('Result', result);

    //         if (result.canceled === false) {
    //             setLoading(true)

    //             const imageuri = result.assets[0].uri;
                 

    //             const base64Image = await FileSystem.readAsStringAsync(imageuri, {
    //                 encoding: FileSystem.EncodingType.Base64,
    //             });
                
    //             const fileSizeBytes = base64Image.length;
    //             console.log(fileSizeBytes / (1024 * 1024))

    //             const Cloudinaryurl= await uploadImageToCloudinary(base64Image)

    //             setImage(Cloudinaryurl);
    //             // console.log(image)
    //             Toast.show({
    //                 type: 'success',
    //                 text1: 'Profile Pic Uploaded',
    //                 visibilityTime: 3000,
    //                 position: 'bottom'
    //             })
    //             setLoading(false)


    //         }
        
    //     } catch (error) {
    //         Toast.show({
    //             type: 'error',
    //             text1: error,
    //             visibilityTime: 3000,
    //             position: 'bottom'
    //         })
    //         // alert('Error Occur: ' + error.message)
    //     }
    // };



    const Updateprofile = () => {
        const formdata = {
            name: name,
            number: number,
            email: email,
            userType: userType,
            image: image
        }
        axios.post(`${API_BASE_URL}/user/update-user`, formdata).then(res => {
            console.log(res.data)
            setloading(false)
            if (res.data.status == 'ok') {
                Toast.show({
                    type: 'success',
                    text1: 'User Updated Successfully',
                    visibilityTime: 3000,
                    position: 'bottom'
                })
                navigation.navigate('Homepage')
            } else {
                Toast.show({
                    type: 'error',
                    text1: JSON.stringify(res.data.data),
                    visibilityTime: 3000,
                    position: 'bottom'
                })
            }
        }).catch(err => {
            Toast.show({
                type: 'error',
                text1: "Size is too Large",
                visibilityTime: 3000,
                position: 'bottom'
            })
        })
    }




    return (
        <KeyboardAvoidingView style={[styles.container,]}>

            <ScrollView contentContainerStyle={styles.scrollViewContent} >
                <View style={[styles.innerContainer]}>

                    <TouchableOpacity  style={styles.imgbox} >
                    
                    {loading && <ActivityIndicator color='black' style={{position:'absolute',zIndex:2}} size={"large"} />}
                        <Avatar.Image
                            size={179}
                            source={{ uri: image?image:null}} />
                    </TouchableOpacity>





                    <TextInput editable={false} style={[Styles.input, { marginTop: 20 }]} defaultValue={name} placeholder="Enter Your Name" ></TextInput>

                    <TextInput editable={false} style={[Styles.input, { marginTop: 20 }]} defaultValue={number} maxLength={10} placeholder="Enter Your Mobile Number" ></TextInput>

                    <TextInput editable={false} style={[Styles.input, { marginTop: 20 }]} defaultValue={email} placeholder="Enter Your Email" ></TextInput>

                    <TextInput  style={[Styles.input, { marginTop: 20 }]} defaultValue={userType} placeholder="Enter User Type" onChange={e => setuserType(e.nativeEvent.text)} ></TextInput>

                    <Pressable style={Styles.btn} onPress={() =>{ {isLoading?(null):setloading(true)
                                                                                    Updateprofile()}  }}>
                            {isLoading?<ActivityIndicator color='white'/>:(
                        <Text style={Styles.btntext} >Update</Text>)}

                    </Pressable>


                </View>
            </ScrollView>




        </KeyboardAvoidingView>
    )

}



const styles = StyleSheet.create({
    imgbox: {
        width: 180,
        height: 180,
        borderRadius: 100,
        marginLeft: 0,
        // marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'grey'
    },
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
    editButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#0b84db',
        borderRadius: 20,
        padding: 5
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#007bff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    icon: {
        marginRight: 10,
        color: '#0b84db'
    },
    text: {
        color: 'white',
        fontSize: 16,
        color: '#0b84db'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#007bff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
})