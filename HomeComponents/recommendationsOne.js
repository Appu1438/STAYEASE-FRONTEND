
import { View, Text, Pressable, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faHeartSolid, faStar } from "@fortawesome/free-regular-svg-icons";
import {  faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { Styles } from '../Common Component/Styles';
import axios from "axios";
import API_BASE_URL from "../Api";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';





export default function RecommendationsOne({userLocation, user }) {

    const navigation = useNavigation()
    const [allHotels, setAllHotels] = useState([]);
    const [randomHotels, setRandomHotels] = useState([]);
    const [favorites, setFavorites] = useState([]);


    useEffect(() => {
        getAllHotels();
    }, []);

    useEffect(() => {
        getUserFavorites(user)
    }, [favorites]);

    


    const getAllHotels = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-all-hotels`);
            if (response.data.status === 'ok') {
                setAllHotels(response.data.data);
                // Select random 4 hotels to show
                const shuffledHotels = shuffleArray(response.data.data);
                setRandomHotels(shuffledHotels.slice(0, 4));
            } else {
                Toast.show({
                    type: 'error',
                    text1: JSON.stringify(response.data.data),
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }
        } catch (error) {
            console.error('Error fetching Hotels:', error);
            Toast.show({
                type: 'error',
                text1: 'Error fetching Hotels',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    };


    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const filterHotelsByLocation = () => {
        if (!userLocation) {
            // If user location is not available, return random hotels
            return randomHotels;
        } else {
            // Filter hotels based on location match
            const filteredHotels = allHotels.filter(hotel => hotel.location == userLocation);
            return filteredHotels.length > 0 ? filteredHotels : randomHotels;
        }
    };

    const addToFavorites = async (hotelId) => {
        const userId=user
        try {
            // Make a POST request to your backend API to add the hotel to favorites
            const response = await axios.post(`${API_BASE_URL}/add-to-favorites`, { userId, hotelId });
            if (response.data.status == 'ok') {
                // If the hotel is successfully added to favorites, update the state
                Toast.show({
                    type: 'success',
                    text1: 'Added To Favourites',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: JSON.stringify(response.data.data),
                    visibilityTime: 3000,
                    position: 'bottom'
                });
                // // Handle error if the hotel could not be added to favorites
                // console.error('Failed to add hotel to favorites:');
                // // Display error message to the user if needed
            }
        } catch (error) {
            console.error('Error adding hotel to favorites:');
            // Display error message to the user if needed
        }
    };

    const getUserFavorites = async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-favorites/${userId}`);
            if (response.data.status === 'ok') {
                // Return the list of favorites
                // console.log(response.data.data)
                setFavorites(response.data.data)
            } else {
                console.error('Failed to fetch user favorites:', response.data.message);
                setFavorites( []); // Return an empty array if there's an error
            }
        } catch (error) {
            console.error('Error fetching user favorites:', error);
            return []; // Return an empty array if there's an error
        }
    };

    const removeFromFavorites = async (hotelId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/remove-from-favorites`, { userId: user, hotelId });
            if (response.data.status === 'ok') {
                Toast.show({
                    type: 'success',
                    text1: 'Removed From Favourites',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
                setFavorites(favorites.filter(favorite => favorite !== hotelId));
            }else{
                Toast.show({
                    type: 'error',
                    text1:JSON.stringify(response.data.data),
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }
        } catch (error) {
            console.error('Error removing hotel from favorites:', error);
        }
    };
    
    const isFavorite = (hotelId) => {
        return favorites.includes(hotelId);
    };


    const handleHotelCardPress = (hotelId) => {
        navigation.navigate('Home');
        navigation.navigate('Detailview', {data: hotelId });
    };




    const renderHotelCard = ({ item }) => {
        const isFav = isFavorite(item._id);

        return(
        <Pressable onPress={() => {
            console.log('Hotel Card Pressed')
            console.log(item._id)
            handleHotelCardPress(item._id)

        }}>
            <View style={Styles.recomendationContentBox}>

                <Pressable style={Styles.favourite} onPress={()=>{isFav?removeFromFavorites(item._id):addToFavorites(item._id)}}>
                <FontAwesome size={25} name={isFav ? 'heart' : 'heart-o'} color={isFav ? 'red' : 'black'} />
                </Pressable>

                <Image style={Styles.recomendationimage} source={{ uri: item.images[0] }} />
                
                <View style={Styles.rating}>
                    <FontAwesomeIcon style={{ paddingTop: 28 }} color="red" icon={faStar} size={15} />
                    <Text style={[Styles.ratingText, { top: 5, left: 2 }]}>{item.rating} ({item.reviewcount})</Text>
                </View>

                <Text style={[Styles.ratingText, { left: '2%', top: 10 }]}>{item.hotelname}</Text>
                <Text style={[Styles.ratingText, { left: '2%', top: 15,color:'grey',fontSize:10 }]}>{item.location}</Text>

                <View style={{ flexDirection: 'row', top: 15 }}>

                    <FontAwesomeIcon style={{ marginTop: 8, left: 5 }} size={15} icon={faIndianRupeeSign} />
                    <Text style={Styles.pricetext}>{item.discountedrate}</Text>
                    <Text style={[Styles.pricetext, { textDecorationLine: 'line-through', fontSize: 12, top: 3, left: 10 }]}>{item.actualrate}</Text>
                    <Text style={[Styles.pricetext, { color: 'green', fontSize: 12, top: 3, left: 15 }]}>{item.discountpercentage}% Off</Text>
                    
                </View>

                <Text style={[Styles.pricetext, { color: 'grey', fontSize: 12, top: 15, left: 15 }]}>+{item.taxandfee} taxes and fees</Text>

            </View>
        </Pressable>
    )};

    return (
        <ScrollView style={{ maxHeight: 370 }}>
            <View style={Styles.recomendationContent}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={filterHotelsByLocation()}
                    keyExtractor={(item) => item._id}
                    renderItem={renderHotelCard}
                />
            </View>
        </ScrollView>
    );
}
