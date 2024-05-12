
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
import addToFavorites from '../Service/FavServices/AddFavourites';
import removeFromFavorites from '../Service/FavServices/RemoveFavourite';
import getUserFavorites from '../Service/FavServices/GetFavourites';
import getAllHotels from '../Service/GetHotelServices/GetHotels';




export default function RecommendationsOne({userLocation, user }) {

    const navigation = useNavigation()
    const [allHotels, setAllHotels] = useState([]);
    const [randomHotels, setRandomHotels] = useState([]);
    const [favorites, setFavorites] = useState([]);


    useEffect(() => {
        getAllHotels(setAllHotels,setRandomHotels);
    }, []);

    useEffect(() => {
        getUserFavorites(user,setFavorites)
    }, [favorites]);

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

                <Pressable style={Styles.favourite} onPress={()=>{isFav? removeFromFavorites(user, item._id, favorites, setFavorites)  :addToFavorites(item._id,user)}}>
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
