import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, FlatList, Image, StyleSheet } from "react-native";
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
                    <View style={styles.cardContainer}>
                        <Pressable style={styles.favourite} onPress={() => removeFromFavorites(user._id, hotel._id, favorites, setFavorites)}>
                            <FontAwesome size={25} name='heart' color='red' />
                        </Pressable>
                        <Image style={styles.hotelImage} source={{ uri: hotel.images[0] }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.hotelName}>{hotel.hotelname}</Text>
                            <Text style={styles.hotelLocation}>{hotel.location}</Text>
                            <View style={styles.ratingContainer}>
                                <FontAwesomeIcon icon={faStar} size={15} color="red" />
                                <Text style={styles.ratingText}>{hotel.rating} ({hotel.reviewcount})</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <FontAwesomeIcon size={15} icon={faIndianRupeeSign} />
                                <Text style={styles.discountedRate}>{hotel.discountedrate}</Text>
                                <Text style={styles.actualRate}>{hotel.actualrate}</Text>
                                <Text style={styles.discountPercentage}>{hotel.discountpercentage}% Off</Text>
                            </View>
                            <Text style={styles.taxesAndFees}>+{hotel.taxandfee} taxes and fees</Text>
                        </View>
                    </View>
                </Pressable>
            );
        } else {
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ left: '5%', top: '5%', alignSelf: 'flex-start' }}>
                <Text style={Styles.profile}>Favourites</Text>
            </View>
            <View style={{ flex: 1, marginTop: 50}}>
                {favorites.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20 }}>No hotels found</Text>
                    </View>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        data={favorites}
                        keyExtractor={(item) => item}
                        renderItem={renderHotelCard}
                    />
                )}
                            {Object.keys(hotelDetails).length === 0 && favorites.length != 0 && <View style={{ marginTop: 0, zIndex: 1,alignSelf:'center' }}><Loading /></View>}

            </View>
            <View style={{alignItems:'center',justifyContent:'center'}}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    discountedRate: {
        fontSize: 16,
        marginLeft: 5,
    },
    actualRate: {
        fontSize: 12,
        textDecorationLine: 'line-through',
        color: 'gray',
        marginLeft: 10,
    },
    discountPercentage: {
        fontSize: 12,
        color: 'green',
        marginLeft: 10,
    },
    taxesAndFees: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
    listContent: {
        paddingBottom: 20,
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: "blue",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '90%', 
        alignSelf:'center'// Adjust card width to span almost full width
    },
    hotelImage: {
        width: '100%',
        height: 150,
    },
    cardContent: {
        padding: 15,
    },
    hotelName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    hotelLocation: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 14,
        color: 'gray',
    },
    favourite: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
    },
});
