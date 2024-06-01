
// import { View, Text, Pressable, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faHeart, faHeartSolid, faStar } from "@fortawesome/free-regular-svg-icons";
// import {  faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons";
// import { useNavigation } from "@react-navigation/native";
// import { Styles } from '../Common Component/Styles';
// import axios from "axios";
// import API_BASE_URL from "../Api";
// import { useFocusEffect } from "@react-navigation/native";
// import Toast from "react-native-toast-message";
// import React, { useEffect, useState } from "react"
// import * as Location from 'expo-location';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import addToFavorites from '../Service/FavServices/AddFavourites';
// import removeFromFavorites from '../Service/FavServices/RemoveFavourite';
// import getUserFavorites from '../Service/FavServices/GetFavourites';
// import getAllHotels from '../Service/GetHotelServices/GetHotels';
// import { useSelector } from 'react-redux';
// import shuffleArray from '../Service/GetHotelServices/Shuffle';




// export default function RecommendationsOne({userLocation, user }) {

//     const navigation = useNavigation()
//     // const [allHotels, setAllHotels] = useState([]);
//     const allHotels=useSelector(state=>state.hotel.AllHotelsData)
//     // console.log(allHotels)
//     const [randomHotels, setRandomHotels] = useState([]);
//     const [favorites, setFavorites] = useState([]);



//     useEffect(() => {
//         shuffleArray(allHotels.hotels,setRandomHotels);
//     }, [allHotels,setRandomHotels]);

      

  


//     useEffect(() => {
//         getUserFavorites(user,setFavorites)
//     }, [favorites]);

//     const filterHotelsByLocation = () => {
//         if (!userLocation) {
//             // If user location is not available, return random hotels
//             return randomHotels;
//         } else {
//             // Filter hotels based on location match
//             const filteredHotels = allHotels.hotels.filter(hotel => hotel.location == userLocation);
//             return filteredHotels.length > 0 ? filteredHotels : randomHotels;
//         }
//     };
   
//     const isFavorite = (hotelId) => {
//         return favorites.includes(hotelId);
//     };


//     const handleHotelCardPress = (hotelId) => {
//         navigation.navigate('Home');
//         navigation.navigate('Detailview', {data: hotelId });
//     };




//     const renderHotelCard = ({ item }) => {
//         const isFav = isFavorite(item._id);

//         return(
//         <Pressable onPress={() => {
//             console.log('Hotel Card Pressed')
//             console.log(item._id)
//             handleHotelCardPress(item._id)

//         }}>
//             <View style={Styles.recomendationContentBox}>

//                 <Pressable style={Styles.favourite} onPress={()=>{isFav? removeFromFavorites(user, item._id, favorites, setFavorites)  :addToFavorites(item._id,user)}}>
//                 <FontAwesome size={25} name={isFav ? 'heart' : 'heart-o'} color={isFav ? 'red' : 'black'} />
//                 </Pressable>

//                 <Image style={Styles.recomendationimage} source={{ uri: item.images[0] }} />
                
//                 <View style={Styles.rating}>
//                     <FontAwesomeIcon style={{ paddingTop: 28 }} color="red" icon={faStar} size={15} />
//                     <Text style={[Styles.ratingText, { top: 5, left: 2 }]}>{item.rating} ({item.reviewcount})</Text>
//                 </View>

//                 <Text style={[Styles.ratingText, { left: '2%', top: 10 }]}>{item.hotelname}</Text>
//                 <Text style={[Styles.ratingText, { left: '2%', top: 15,color:'grey',fontSize:10 }]}>{item.location}</Text>

//                 <View style={{ flexDirection: 'row', top: 15 }}>

//                     <FontAwesomeIcon style={{ marginTop: 8, left: 5 }} size={15} icon={faIndianRupeeSign} />
//                     <Text style={Styles.pricetext}>{item.discountedrate}</Text>
//                     <Text style={[Styles.pricetext, { textDecorationLine: 'line-through', fontSize: 12, top: 3, left: 10 }]}>{item.actualrate}</Text>
//                     <Text style={[Styles.pricetext, { color: 'green', fontSize: 12, top: 3, left: 15 }]}>{item.discountpercentage}% Off</Text>
                    
//                 </View>

//                 <Text style={[Styles.pricetext, { color: 'grey', fontSize: 12, top: 15, left: 15 }]}>+{item.taxandfee} taxes and fees</Text>

//             </View>
//         </Pressable>
//     )};

//     return (
//         <ScrollView style={{ maxHeight: 370 }}>
//             <View style={Styles.recomendationContent}>
//                 <FlatList
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     showsVerticalScrollIndicator={false}
//                     data={filterHotelsByLocation()}
//                     keyExtractor={(item) => item._id}
//                     renderItem={renderHotelCard}
//                 />
//             </View>
//         </ScrollView>
//     );
// }
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import API_BASE_URL from "../Api";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import addToFavorites from '../Service/FavServices/AddFavourites';
import removeFromFavorites from '../Service/FavServices/RemoveFavourite';
import getUserFavorites from '../Service/FavServices/GetFavourites';
import getAllHotels from '../Service/GetHotelServices/GetHotels';
import { useSelector } from 'react-redux';
import shuffleArray from '../Service/GetHotelServices/Shuffle';

const screenWidth = Dimensions.get('window').width;

export default function RecommendationsOne({ userLocation, user }) {

    const navigation = useNavigation();
    const allHotels = useSelector(state => state.hotel.AllHotelsData);
    const [randomHotels, setRandomHotels] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        shuffleArray(allHotels.hotels, setRandomHotels);
    }, [allHotels]);

    useEffect(() => {
        getUserFavorites(user, setFavorites);
    }, [user,favorites]);

    const filterHotelsByLocation = () => {
        if (!userLocation) {
            return randomHotels;
        } else {
            const filteredHotels = allHotels.hotels.filter(hotel => hotel.location == userLocation);
            return filteredHotels.length > 0 ? filteredHotels : randomHotels;
        }
    };

    const isFavorite = (hotelId) => {
        return favorites.includes(hotelId);
    };

    const handleHotelCardPress = (hotelId) => {
        navigation.navigate('Home');
        navigation.navigate('Detailview', { data: hotelId });
    };

    const renderHotelCard = ({ item, index }) => {
        const isFav = isFavorite(item._id);
        const cardWidth = screenWidth * 0.75; // 75% of the screen width for full card
        return (
            <Pressable onPress={() => handleHotelCardPress(item._id)}>
                <View style={[styles.cardContainer, { width:cardWidth }]}>
                    <Pressable style={styles.favourite} onPress={() => {
                        isFav ? removeFromFavorites(user, item._id, favorites, setFavorites) : addToFavorites(item._id, user);
                    }}>
                        <FontAwesome size={25} name={isFav ? 'heart' : 'heart-o'} color={isFav ? 'red' : 'white'} />
                    </Pressable>
                    <Image style={styles.hotelImage} source={{ uri: item.images[0] }} />
                    <View style={styles.cardContent}>
                        <View style={styles.ratingContainer}>
                            <FontAwesomeIcon icon={faStar} size={15} color="red" />
                            <Text style={styles.ratingText}>{item.rating} ({item.reviewcount})</Text>
                        </View>
                        <Text style={styles.hotelName}>{item.hotelname}</Text>
                        <Text style={styles.hotelLocation}>{item.location}</Text>
                        <View style={styles.priceContainer}>
                            <FontAwesomeIcon size={15} icon={faIndianRupeeSign} />
                            <Text style={styles.discountedRate}>{item.discountedrate}</Text>
                            <Text style={styles.actualRate}>{item.actualrate}</Text>
                            <Text style={styles.discountPercentage}>{item.discountpercentage}% Off</Text>
                        </View>
                        <Text style={styles.taxesAndFees}>+{item.taxandfee} taxes and fees</Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <ScrollView style={{ maxHeight: 370 }}>
            <View style={styles.container}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={filterHotelsByLocation()}
                    keyExtractor={(item) => item._id}
                    renderItem={renderHotelCard}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 15,
        height: 250,
        shadowColor: "blue",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    hotelImage: {
        width: '100%',
        height: 120, // Adjust height as needed
    },
    cardContent: {
        padding: 10,
    },
    hotelName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    hotelLocation: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 12,
        color: 'gray',
    },
    favourite: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 1,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    discountedRate: {
        fontSize: 12,
        marginLeft: 2,
    },
    actualRate: {
        fontSize: 10,
        textDecorationLine: 'line-through',
        color: 'gray',
        marginLeft: 5,
    },
    discountPercentage: {
        fontSize: 10,
        color: 'green',
        marginLeft: 5,
    },
    taxesAndFees: {
        fontSize: 10,
        color: 'gray',
        marginTop: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
});

