

import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, FlatList, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faLocationDot, faL } from "@fortawesome/free-solid-svg-icons";
import { Styles } from "../Common Component/Styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import API_BASE_URL from "../Api";
import Toast from "react-native-toast-message";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import * as Location from 'expo-location';
import Loading from "../Common Component/loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import removeFromFavorites from "../Service/FavServices/RemoveFavourite";


export default function Fav() {

    const navigation = useNavigation();
    const route = useRoute();
    const [favorites, setFavorites] = useState([]);
    const [hotelDetails, setHotelDetails] = useState({});

    const [user, setUser] = useState(route.params.data);


    useEffect(() => {
        getUserFavorites(user._id);
    }, []);

    const getUserFavorites = async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-favorites/${userId}`);
            if (response.data.status === 'ok') {
                setFavorites(response.data.data);
                response.data.data.forEach((favorite) => {
                    getHotelDetails(favorite);
                });
            } else {
                console.error('Failed to fetch user favorites:', response.data.message);
                setFavorites([]);
            }
        } catch (error) {
            console.error('Error fetching user favorites:', error);
        }
    };

    const getHotelDetails = async (hotelId) => {
        console.log(hotelId)
        try {
            const response = await axios.get(`${API_BASE_URL}/get-hotel-byID?id=${hotelId}`);
            if (response.data.status === 'ok') {
                // console.log(response.data.data)
                setHotelDetails((prevDetails) => ({
                    ...prevDetails,
                    [hotelId]: response.data.data,
                }));
            } else {
                console.error('Failed to fetch hotel details:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching hotel details:', error);
        }
    };

    

    
 
    const renderHotelCard = ({ item }) => {
        const hotel = hotelDetails[item];
        if (hotel) {

            return (
                <Pressable onPress={() => navigation.navigate('Detailview', { data: hotel._id })}>
                    <View style={Styles.SearchContentBox}>

                    <Pressable style={Styles.favourite} onPress={()=>removeFromFavorites(user._id,hotel._id,favorites,setFavorites)}>
                        <FontAwesome size={25} name='heart'  color='red'  />
                    </Pressable>

                        <Image style={Styles.Searchimage} source={{ uri: hotel.images[0] }} />
                        <View style={Styles.rating}>
                            <FontAwesomeIcon style={{ paddingTop: 30 }} color="red" icon={faStar} size={15} />
                            <Text style={[Styles.ratingText, { top: 8, left: 2, fontSize: 12 }]}>{hotel.rating} ({hotel.reviewcount})</Text>
                        </View>
                        <Text style={[Styles.ratingText, { left: '2%', top: 5, fontSize: 15 }]}>{hotel.hotelname}</Text>
                        <Text style={[Styles.ratingText, { left: '2%', top: 12, fontSize: 10, color: 'grey' }]}>{hotel.location}</Text>
                        <View style={{ flexDirection: 'row', top: 15 }}>
                            <FontAwesomeIcon style={{ marginTop: 8, left: 5 }} size={15} icon={faIndianRupeeSign} />
                            <Text style={[Styles.pricetext, { fontSize: 15 }]}>{hotel.discountedrate}</Text>
                            <Text style={[Styles.pricetext, { textDecorationLine: 'line-through', fontSize: 12, top: 3, left: 10 }]}>{hotel.actualrate}</Text>
                            <Text style={[Styles.pricetext, { color: 'green', fontSize: 10, top: 5, left: 15 }]}>{hotel.discountpercentage}% Off</Text>
                        </View>
                        <Text style={[Styles.pricetext, { color: 'grey', fontSize: 10, top: 15, left: 10 }]}>+{hotel.taxandfee} taxes and fees</Text>
                    </View>
                </Pressable>
            );
        } else {
          
        }
    };
    return (
        <View style={Styles.container}>
            <View style={{ left: '5%', top: '5%', alignSelf: 'flex-start' }}>
                <Text style={Styles.profile}>Favourites</Text>
            </View>
            <View style={{ flex: 1, marginTop: 50, alignItems: 'center',justifyContent:'center' }}>
                {favorites.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20 }}>No hotels found</Text>
                    </View>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ alignItems: 'center' }}
                        data={favorites}
                        keyExtractor={(item) => item}
                        renderItem={renderHotelCard}
                    />
                )}
                 {Object.keys(hotelDetails).length === 0 && favorites.length!=0 && <View style={{ position: 'absolute', zIndex: 1 }}><Loading /></View>}

            </View>
        </View>
    );


}