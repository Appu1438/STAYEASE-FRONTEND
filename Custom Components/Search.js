import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, FlatList, Image, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faLocationDot, faL } from "@fortawesome/free-solid-svg-icons";
import { Styles } from "../Common Component/Styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Common Component/loading";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import addToFavorites from "../Service/FavServices/AddFavourites";
import removeFromFavorites from "../Service/FavServices/RemoveFavourite";
import getUserFavorites from "../Service/FavServices/GetFavourites";
import getdata from "../Service/UserServices.js/Getdata";
import getUserLocation from "../Service/UserServices.js/GetUserLocation";
import getRandomHotels from "../Service/GetHotelServices/SearchHotel";
import { useSelector } from "react-redux";


export default function Search() {
    const navigation = useNavigation();
    const route = useRoute();

    const userData = useSelector(state => state.user.userData);

    const [isLoading, setLoading] = useState(true);
    const [show, setShow] = useState(true);

    const allHotels = useSelector(state => state.hotel.AllHotelsData);

    const [randomHotels, setRandomHotels] = useState([]);

    const [searchedLocation, setSearchedLocation] = useState(route.params?.data || '');
    const [currentLocation, setCurrentLocation] = useState();
    const [nearbyCities, setNearbyCities] = useState();

    const [favorites, setFavorites] = useState([]);
    const userId = userData._id;

    useEffect(() => {
        if (route.params?.data) {
          setSearchedLocation(route.params.data);
        }
      }, [route.params.data]);
      
    useEffect(() => {
        
        getRandomHotels(setRandomHotels, allHotels.hotels, setShow, searchedLocation);
    }, []);

    useEffect(() => {
        getUserLocation(setCurrentLocation, setNearbyCities);
    }, []);

    useEffect(() => {
        getUserFavorites(userId, setFavorites);
    }, [favorites]);

    useEffect(() => {
        console.log(searchedLocation)

        handleSearch();
    }, [searchedLocation]);

    const handleSearch = async () => {
        setShow(false);
        setLoading(true);
        getRandomHotels(setRandomHotels, allHotels.hotels, setShow, searchedLocation);
        setLoading(false);
    };

    const isFavorite = (hotelId) => {
        return favorites.includes(hotelId);
    };

    const renderHotelCard = ({ item }) => {
        const isFav = isFavorite(item._id);

        return (
            <Pressable onPress={() => navigation.navigate('Detailview', { data: item._id })}>
                <View style={styles.cardContainer}>
                    <Pressable style={styles.favourite} onPress={() => { isFav ? removeFromFavorites(userData._id, item._id, favorites, setFavorites) : addToFavorites(item._id, userData._id) }}>
                        <FontAwesome size={25} name={isFav ? 'heart' : 'heart-o'} color={isFav ? 'red' : 'white'} />
                    </Pressable>
                    <Image style={styles.hotelImage} source={{ uri: item.images[0] }} />
                    <View style={styles.cardContent}>
                        <Text style={styles.hotelName}>{item.hotelname}</Text>
                        <Text style={styles.hotelLocation}>{item.location}</Text>
                        <View style={styles.ratingContainer}>
                            <FontAwesomeIcon icon={faStar} size={15} color="red" />
                            <Text style={styles.ratingText}>{item.rating} ({item.reviewcount})</Text>
                        </View>
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
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={true}>
            <View style={[styles.container, { justifyContent: 'flex-start', paddingBottom: 20 }]}>
                <Pressable style={[Styles.search, { marginTop: 20, alignSelf: 'center' }]}>
                    <Pressable style={{ position: 'absolute', alignSelf: 'flex-end', left: '5%', color: 'black' }}>
                        <FontAwesomeIcon size={15} icon={faSearch} />
                    </Pressable>
                    <TextInput
                        style={Styles.searchinput}
                        textAlign="center"
                        defaultValue={searchedLocation}
                        placeholder="Search by city or location"
                        onChange={(e) => setSearchedLocation(e.nativeEvent.text)}
                    />
                </Pressable>
                <View style={{ alignSelf: 'flex-start', marginTop: 20, borderBottomWidth: 1, borderBottomColor: 'grey', width: '100%', paddingBottom: 10 }}>

                    <Pressable style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }} onPress={() => setSearchedLocation(currentLocation)}>
                        <FontAwesomeIcon size={15} icon={faLocationDot} color="#148EFF" />
                        <Text style={[Styles.CardText, { fontSize: 15, color: '#148EFF', marginLeft: 10, top: 5 }]}>Find by Nearby</Text>
                    </Pressable>

                    {show ? (
                        <View style={{}}>
                            <View style={{ paddingLeft: 20, marginTop: 10 }}>
                                <Text style={[Styles.CardText, { fontSize: 15, color: 'black' }]}>Popular Searches in Your Area</Text>
                            </View>
                            {nearbyCities ? (
                                nearbyCities
                                    .filter((city, index, self) => self.indexOf(city) === index)
                                    .slice(0, 4)
                                    .map((city, index) => (
                                        <Pressable
                                            key={index}
                                            style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, marginTop: 10 }}
                                            onPress={() => setSearchedLocation(city)}
                                        >
                                            <FontAwesomeIcon size={15} icon={faLocationDot} />
                                            <Text style={[Styles.CardText, { fontSize: 15, marginLeft: 10, top: 5 }]}>
                                                {city}
                                            </Text>
                                        </Pressable>
                                    ))
                            ) : null}
                        </View>
                    ) : (null)}

                </View>

                <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 10, paddingBottom: 0 }}>
                    {isLoading || !randomHotels ? <Loading /> : randomHotels.length == 0 ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>No hotels found</Text>
                        </View>
                    ) : (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContent}
                            data={randomHotels}
                            keyExtractor={(item) => item._id}
                            renderItem={renderHotelCard}
                        />
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
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
        paddingBottom:20,
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 30,
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
