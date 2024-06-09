

import { View, Text, Pressable, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faStar, } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faSearch, faBars, faIndianRupeeSign, faHouse, faHotel, faTag, faGift, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { Styles } from '../Common Component/Styles';
import axios from "axios";
import API_BASE_URL from "../Api";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useEffect, useState } from 'react';


export default function RecommendationsTwo({ }) {

    const navigation = useNavigation()
    const [allHotels, setAllHotels] = useState([]);
    const [randomHotels, setRandomHotels] = useState([]);

    useEffect(() => {
        getAllHotels();
    }, []);

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






    const renderHotelCard = ({ item }) => (
        <Pressable onPress={() => {
            console.log('Hotel Card Pressed')
            console.log(item._id)
            navigation.navigate('Detailview', { data: item._id })

        }}>
            <View style={Styles.recomendationContentBox}>

                <Pressable style={Styles.favourite}>
                    <FontAwesomeIcon size={25} icon={faHeart} />
                </Pressable>

                <Image style={Styles.recomendationimage} source={{ uri: item.images[0] }} />
                
                <View style={Styles.rating}>
                    <FontAwesomeIcon style={{ paddingTop: 28 }} color="red" icon={faStar} size={15} />
                    <Text style={[Styles.ratingText, { top: 5, left: 2 }]}>{item.rating} ({item.reviewcount})</Text>
                </View>

                <Text style={[Styles.ratingText, { left: '2%', top: 10 }]}>{item.hotelname}</Text>

                <View style={{ flexDirection: 'row', top: 15 }}>

                    <FontAwesomeIcon style={{ marginTop: 8, left: 5 }} size={15} icon={faIndianRupeeSign} />
                    <Text style={Styles.pricetext}>{item.discountedrate}</Text>
                    <Text style={[Styles.pricetext, { textDecorationLine: 'line-through', fontSize: 12, top: 3, left: 10 }]}>{item.actualrate}</Text>
                    <Text style={[Styles.pricetext, { color: 'green', fontSize: 12, top: 3, left: 15 }]}>{item.discountpercentage}% Off</Text>
                    
                </View>

                <Text style={[Styles.pricetext, { color: 'grey', fontSize: 12, top: 15, left: 15 }]}>+{item.taxandfee} taxes and fees</Text>

            </View>
        </Pressable>
    );

    return (
        <ScrollView style={{ maxHeight: 370 }}>
            <View style={Styles.recomendationContent}>
                <FlatList
                    horizontal
                    data={randomHotels}
                    keyExtractor={(item) => item._id}
                    renderItem={renderHotelCard}
                />
            </View>
        </ScrollView>
    );
}
