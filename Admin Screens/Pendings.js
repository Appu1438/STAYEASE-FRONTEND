import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, Image, FlatList, StatusBar } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import API_BASE_URL from "../Api";
import Toast from "react-native-toast-message";
import { Styles } from "../Common Component/Styles";

export default function PendingRequests({navigation}) {
    const [allHotels, setAllHotels] = useState([]);

    useEffect(() => {
        getAllHotels();
    }, []);

    const getAllHotels = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-pending-hotels`);
            if (response.data.status === "ok") {
                setAllHotels(response.data.data);
            } else {
                Toast.show({
                    type: "error",
                    text1: JSON.stringify(response.data.data),
                    visibilityTime: 3000,
                    position: "bottom",
                });
            }
        } catch (error) {
            console.error("Error fetching Hotels:", error);
            Toast.show({
                type: "error",
                text1: "Error fetching Hotels",
                visibilityTime: 3000,
                position: "bottom",
            });
        }
    };

    const renderHotelCard = ({ item }) => (
        <Pressable
            onPress={() => {
                console.log("Hotel Card Pressed");
                console.log(item._id);
                navigation.navigate('PendingsDetails', { data: item })
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
        <ScrollView style={{ flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <FlatList data={allHotels} keyExtractor={(item) => item._id} renderItem={renderHotelCard} />
            </View>
        </ScrollView>
    );
}
