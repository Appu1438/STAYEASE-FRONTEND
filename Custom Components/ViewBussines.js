

import { View, Text, SafeAreaView, Pressable, Alert, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, StatusBar, FlatList } from "react-native"
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
import { faStar, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import * as DocumentPicker from 'expo-document-picker';




export default function Viewbussiness() {
    const navigation = useNavigation()

    const [HoteluserId, setHotelUserId] = useState('')
    const [Loading, setLoading] = useState(true)

    const route = useRoute()

    useEffect(() => {
        getdata()
    }, [])




    async function getdata() {
        const token = await AsyncStorage.getItem('token');
        // console.log("Profile",token);
        axios.post(`${API_BASE_URL}/user-data`, { token: token })
            .then(res => {
                // console.log(res.data);
                setHotelUserId(res.data.data._id)
                getAllHotels(res.data.data._id);

            });
    }

    const [allHotels, setAllHotels] = useState([]);


    const getAllHotels = async (id) => {
        const hoteluserid = id
        try {
            const response = await axios.get(`${API_BASE_URL}/get-user-hotels/${hoteluserid}`);
            console.log(response.data.data)
            if (response.data.status == 'ok') {
                setAllHotels(response.data.data)
            } else {
                Toast.show({
                    type: "error",
                    text1: JSON.stringify(response.data.data),
                    visibilityTime: 3000,
                    position: "bottom",
                })
            }
        } catch (error) {
            console.error("Error fetching business:", error);
            Toast.show({
                type: "error",
                text1: "Error fetching Hotels",
                visibilityTime: 3000,
                position: "bottom",
            });
        }
        setLoading(false)
    };

    const renderHotelCard = ({ item }) => (
        <Pressable
            onPress={() => {
                console.log("Hotel Card Pressed");
                console.log(item._id);
                // navigation.navigate('PendingsDetails', { data: item })
            }}
        >
            <View style={Styles.recomendationContentBox}>

                <Image style={Styles.recomendationimage} source={{ uri: item.images[0] }} />
                <View style={Styles.rating}>
                    <FontAwesomeIcon style={{ paddingTop: 28 }} color="red" icon={faStar} size={15} />
                    <Text style={[Styles.ratingText, { top: 5, left: 2 }]}>{item.rating} ({item.reviewcount})</Text>
                </View>
                <Text style={[Styles.ratingText, { left: "2%", top: 10 }]}>{item.hotelname}</Text>
                <Text style={[Styles.ratingText, { left: "2%", top: 15, color: "grey", fontSize: 10 }]}>{item.location}</Text>
                <View style={{ flexDirection: "row", top: 15 }}>
                    <FontAwesomeIcon style={{ marginTop: 8, left: 5 }} size={15} icon={faIndianRupeeSign} />
                    <Text style={Styles.pricetext}>{item.discountedrate}</Text>
                    <Text style={[Styles.pricetext, { textDecorationLine: "line-through", fontSize: 12, top: 3, left: 10 }]}>{item.actualrate}</Text>
                    <Text style={[Styles.pricetext, { color: "green", fontSize: 12, top: 3, left: 15 }]}>{item.discountpercentage}% Off</Text>
                </View>
                <Text style={[Styles.pricetext, { color: "grey", fontSize: 12, top: 15, left: 15 }]}>+{item.taxandfee} taxes and fees</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={{ flex: 1,backgroundColor:'white'}}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            <View style={{ left: '5%', top: '5%', alignSelf: 'flex-start' }}>
                <Text style={Styles.profile}>Your Bussiness</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", top: '5%' }}>
                <>{Loading ? (<ActivityIndicator size={30} color='black' />) 
                : (
                     allHotels.length > 0 ? (<FlatList data={allHotels} keyExtractor={(item) => item._id} renderItem={renderHotelCard} />
                    ) : (<Text style={{ fontSize: 20 }}>No Hotels Found</Text>)

                )}
                </>
            </View>
        </View>
    );
}
