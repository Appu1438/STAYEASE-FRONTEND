


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
        getdata()
        getRandomHotels();

    }, []);

    useEffect(() => {
            getUserLocation()

    },[])
    useEffect(() => {
        getUserFavorites(userId)
    }, [favorites]);


    useEffect(() => {
        handleSearch();
    }, [searchedLocation]);

    async function getdata() {
        const token = await AsyncStorage.getItem('token');
        axios.post(`${API_BASE_URL}/user-data`, { token: token })
            .then(res => {
                setUserData(res.data.data)
            });
    }

    const getRandomHotels = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-all-hotels`);
            if (response.data.status === 'ok') {
                const allHotelsData = response.data.data;
                let shuffledHotels;
                if (searchedLocation) {
                    const filteredHotels = allHotelsData.filter(hotel => hotel.location.toLowerCase().includes(searchedLocation.toLowerCase()));
                    shuffledHotels = filteredHotels;
                } else {
                    setShow(true)
                    shuffledHotels = shuffleArray(allHotelsData);
                }
                setRandomHotels(shuffledHotels);
                setAllHotels(allHotelsData);
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

    const handleSearch = async () => {
        setShow(false)
        setLoading(true);
        getRandomHotels();
        setLoading(false);
    };

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const getUserLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Toast.show({
                    type: 'error',
                    text1: 'Location Permission Denied',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            const { latitude, longitude } = location.coords;

            let address = await Location.reverseGeocodeAsync({ latitude, longitude });
            setCurrentLocation(address[0].city);

            fetchNearbyCities(latitude, longitude);
        } catch (error) {
            // console.error(error);
        }
    };

    const fetchNearbyCities = async (latitude, longitude) => {
        try {
            let cities = [];
            let offset = 0;
            let step = 0.02;
            let direction = 1;
            while (cities.length < 10) {
                const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=10&offset=${offset}&appid=c8461955d638e0ac0311c9d54b64f38f`);
                if (response.data && response.data.length > 0) {
                    cities = cities.concat(response.data.map(city => city.name));
                    offset += response.data.length;
                    latitude += step * direction;
                    longitude += step * direction;
                    direction *= -1;
                    step *= 2;
                } else {
                    break;
                }
            }
            if (cities.length > 0) {
                setnearbyCities(cities);
            } else {
                console.log('No nearby cities found.');
            }
        } catch (error) {
            console.error('Error fetching nearby cities:', error);
        }
    };

    const addToFavorites = async (hotelId) => {
        console.log('add')

        try {
            const response = await axios.post(`${API_BASE_URL}/add-to-favorites`, { userId, hotelId });
            if (response.data.status == 'ok') {
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
            }
        } catch (error) {
            console.error('Error adding hotel to favorites:', error);
        }
    };

    const getUserFavorites = async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-favorites/${userId}`);
            if (response.data.status === 'ok') {
                setFavorites(response.data.data)
            } else {
                console.error('Failed to fetch user favorites:', response.data.message);
                setFavorites([]);
            }
        } catch (error) {
            console.error('Error fetching user favorites:', error);
            return [];
        }
    };

    const removeFromFavorites = async (hotelId) => {
        console.log('remoce')
        try {
            const response = await axios.post(`${API_BASE_URL}/remove-from-favorites`, { userId: userData._id, hotelId });
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
    
    const isFavorite =  (hotelId) => {
        return favorites.includes(hotelId);
    };

    const renderHotelCard = ({ item }) =>{
        const isFav = isFavorite(item._id);

        return (
            <Pressable onPress={() => navigation.navigate('Detailview', { data: item._id })}>
                <View style={[Styles.SearchContentBox]}>

                    <Pressable style={Styles.favourite} onPress={()=>{isFav?removeFromFavorites(item._id):addToFavorites(item._id)}}>
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

                <View style={{ flex: 1, marginTop: 10, alignItems: 'center' }}>
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



