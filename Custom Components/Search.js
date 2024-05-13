


import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, FlatList, Image } from "react-native";
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


export default function Search() {
    const navigation = useNavigation();
    const route = useRoute();

    const [isLoading, setLoading] = useState(true);
    const [show, setShow] = useState(true)

    const [allHotels, setAllHotels] = useState([]);
    const [randomHotels, setRandomHotels] = useState([]);

    const [searchedLocation, setSearchedLocation] = useState(route.params?.data || '');
    const [currentLocation, setCurrentLocation] = useState();
    const [nearbyCities, setnearbyCities] = useState();

    const [userData, setUserData] = useState('')
    const [favorites, setFavorites] = useState([]);
    const userId = userData._id;

   

    useEffect(() => {
        getdata(setUserData)

        getRandomHotels(setRandomHotels,setAllHotels,setShow,searchedLocation);

    }, []);

    useEffect(() => {
            getUserLocation( setCurrentLocation, setnearbyCities)

    },[])

    useEffect(() => {
        getUserFavorites(userId,setFavorites)
    }, [favorites]);


    useEffect(() => {
        handleSearch();
    }, [searchedLocation]);

    const handleSearch = async () => {
        setShow(false)
        setLoading(true);
        getRandomHotels(setRandomHotels,setAllHotels,setShow,searchedLocation);
        setLoading(false);
    };
    
    
    const isFavorite =  (hotelId) => {
        return favorites.includes(hotelId);
    };

    const renderHotelCard = ({ item }) =>{
        const isFav = isFavorite(item._id);

        return (
            <Pressable onPress={() => navigation.navigate('Detailview', { data: item._id })}>
                <View style={[Styles.SearchContentBox]}>

                    <Pressable style={Styles.favourite} onPress={()=>{ isFav? removeFromFavorites(userData._id, item._id, favorites, setFavorites) : addToFavorites(item._id,userData._id)}}>
                        <FontAwesome size={25} name={isFav ? 'heart' : 'heart-o'} color={isFav ? 'red' : 'black'} />
                    </Pressable>

                    <Image style={Styles.Searchimage} source={{ uri: item.images[0] }} />
                    <View style={Styles.rating}>
                        <FontAwesomeIcon style={{ paddingTop: 30 }} color="red" icon={faStar} size={15} />
                        <Text style={[Styles.ratingText, { top: 8, left: 2, fontSize: 12 }]}>{item.rating} ({item.reviewcount})</Text>
                    </View>
                    <Text style={[Styles.ratingText, { left: '2%', top: 5, fontSize: 15 }]}>{item.hotelname}</Text>
                    <Text style={[Styles.ratingText, { left: '2%', top: 12, fontSize: 10, color: 'grey' }]}>{item.location}</Text>

                    <View style={{ flexDirection: 'row', top: 15 }}>
                        <FontAwesomeIcon style={{ marginTop: 8, left: 5 }} size={15} icon={faIndianRupeeSign} />
                        <Text style={[Styles.pricetext, { fontSize: 15 }]}>{item.discountedrate}</Text>
                        <Text style={[Styles.pricetext, { textDecorationLine: 'line-through', fontSize: 12, top: 3, left: 10 }]}>{item.actualrate}</Text>
                        <Text style={[Styles.pricetext, { color: 'green', fontSize: 10, top: 5, left: 15 }]}>{item.discountpercentage}% Off</Text>
                    </View>
                    <Text style={[Styles.pricetext, { color: 'grey', fontSize: 10, top: 15, left: 10 }]}>+{item.taxandfee} taxes and fees</Text>
                </View>
            </Pressable>
        );
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={true}>
            <View style={[Styles.container, { justifyContent: 'flex-start',paddingBottom:20 }]}>
                <Pressable style={[Styles.search, { marginTop: 20 }]}>
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
                        <Text style={[Styles.CardText, { fontSize: 15, color: '#148EFF', marginLeft: 10,top:5 }]}>Find by Nearby</Text>
                    </Pressable>

                    {show?(<View style={{}}>
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
                                        <Text style={[Styles.CardText, { fontSize: 15, marginLeft: 10,top:5 }]}>
                                            {city}
                                        </Text>
                                    </Pressable>
                                ))
                        ) : null}
                    </View>):(null)}
                    
                </View>

                <View style={{ flex: 1, marginTop: 10, alignItems: 'center',paddingBottom:20 }}>
                    {isLoading ? <Loading /> : randomHotels.length == 0 ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>No hotels found</Text>
                        </View>
                    ) : (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ alignItems: 'center' }}
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



