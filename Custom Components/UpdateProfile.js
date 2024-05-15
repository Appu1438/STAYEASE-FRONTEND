import { View, Text, SafeAreaView, Pressable, Alert, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView ,ActivityIndicator} from "react-native"
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






export default function UpdateProfile() {

    const navigation = useNavigation()

    const [Userdata, setUserdata] = useState("")
    const [name, setName] = useState("")
    const [nameVerify, setNameVerify] = useState(true)
    const [number, setNumber] = useState("")
    const [numberVerify, setNumberVerify] = useState(true)
    const [email, setEmail] = useState("")
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
        setImage(userData.image)
    }, [])

    function handlename(e) {
        let nameVar = e.nativeEvent.text
        setName(nameVar)
        setNameVerify(false)
        if (nameVar.length >= 4) {
            setNameVerify(true)
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



    const Selectphoto = async () => {
        console.log('Picker');
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

            if (permissionResult.granted === false) {
                console.log("You've refused to allow this appp to access your photos!");
                Toast.show({
                    type: 'Error',
                    text1: `You've Refused to Access Your Photos`,
                    visibilityTime: 3000,
                    position: 'bottom'
                })
                return;
            }
            Toast.show({
                type: 'success',
                text1: `You've Granted to Access Your Photos`,
                visibilityTime: 3000,
                position: 'bottom'
            })
            console.log("You've Granted to allow this appp to access your photos!");

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            console.log('Result', result);

            if (result.canceled === false) {
                setLoading(true)

                const imageuri = result.assets[0].uri;
                 

                const base64Image = await FileSystem.readAsStringAsync(imageuri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                
                const fileSizeBytes = base64Image.length;
                console.log(fileSizeBytes / (1024 * 1024))

                const Cloudinaryurl= await uploadImageToCloudinary(base64Image)

                setImage(Cloudinaryurl);
                // console.log(image)
                Toast.show({
                    type: 'success',
                    text1: 'Profile Pic Uploaded',
                    visibilityTime: 3000,
                    position: 'bottom'
                })
                setLoading(false)


            }
        
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error,
                visibilityTime: 3000,
                position: 'bottom'
            })
            // alert('Error Occur: ' + error.message)
        }
    };



    const Updateprofile = () => {
        const formdata = {
            name: name,
            number: number,
            email: email,
            image: image
        }
        axios.post(`${API_BASE_URL}/update-user`, formdata).then(res => {
            console.log(res.data)
            setloading(false)
            if (res.data.status == 'ok') {
                Toast.show({
                    type: 'success',
                    text1: 'Profile Updated Successfully',
                    visibilityTime: 3000,
                    position: 'bottom'
                })
                navigation.navigate('Profile')
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
        <SafeAreaView style={[Styles.profilecontainer,]}>

            <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
                <View style={[Styles.container, { alignItems: "center", justifyContent: 'flex-start', top: '0%' }]}>

                    <TouchableOpacity style={styles.imgbox} onPress={() => Selectphoto()}>
                    {loading && <ActivityIndicator color='black' style={{position:'absolute',zIndex:2}} size={"large"} />}
                        <Avatar.Image
                            size={179}
                            source={{ uri: image?image:null}} />
                        <TouchableOpacity style={styles.editButton}>
                            <Feather name="camera" size={24} color="white" />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <Pressable style={styles.button} onPress={() => setImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC')}>
                        <AntDesign name="delete" size={22} color="white" style={styles.icon} />
                        <Text style={styles.text}>Remove Profile Pic</Text>
                    </Pressable>





                    <TextInput style={[Styles.input, { marginTop: 20 }]} defaultValue={name} placeholder="Enter Your Name" onChange={name => handlename(name)}></TextInput>
                    {name.length < 1 ? null : nameVerify ? (<Text style={Styles.galert}>Verified</Text>) : (<Text style={Styles.ralert}>Username Must Contains Atleast 4 Characters</Text>)}

                    <TextInput style={[Styles.input, { marginTop: 20 }]} defaultValue={number} maxLength={10} placeholder="Enter Your Mobile Number" onChange={e => handlenumber(e)}></TextInput>
                    {number.length < 1 ? null : numberVerify ? (<Text style={Styles.galert}>Verified</Text>) : (<Text style={Styles.ralert}>Please Enter a vaild Phone Number</Text>)}

                    <TextInput editable={false} style={[Styles.input, { marginTop: 20 }]} defaultValue={email} placeholder="Enter Your Email" ></TextInput>

                    <Pressable style={Styles.btn} onPress={() =>{ {isLoading?(null):setloading(true)
                                                                                    Updateprofile()}  }}>
                            {isLoading?<ActivityIndicator color='white'/>:(
                        <Text style={Styles.btntext} >Update</Text>)}

                    </Pressable>


                </View>
            </ScrollView>




        </SafeAreaView>
    )

}



const styles = StyleSheet.create({
    imgbox: {
        width: 180,
        height: 180,
        borderRadius: 100,
        marginLeft: 0,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'grey'
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